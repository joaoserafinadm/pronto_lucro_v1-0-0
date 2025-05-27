import { connect } from "../../../utils/db";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    // Verificar se a requisição é do próprio Vercel (opcional, mas recomendado)
    // if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {
        const { db } = await connect();

        // Data atual (Brasília timezone)
        const localdate = new Date();
        const brasiliaOffset = -3; // Brasília é UTC-3 (ou UTC-2 no horário de verão)
        const utcTime = localdate.getTime() + (localdate.getTimezoneOffset() * 60000);
        const currentDateObj = new Date(utcTime + (brasiliaOffset * 3600000));

        const currentDate = {
            day: currentDateObj.getDate(),
            month: currentDateObj.getMonth(), // 0-11
            year: currentDateObj.getFullYear()
        };

        console.log('Data atual (Brasília):', currentDate);

        const usersArray = await db.collection('users').find({}).toArray();
        let processedTransactions = 0;

        for (const user of usersArray) {
            for (const dfcItem of user.dfc) {
                const transactionsToProcess = [];
                const transactionsToUpdate = [];

                for (const transaction of dfcItem.data) {
                    // Verificar se a transação é repetida, está ativa e tem nextTransaction para hoje
                    if (transaction.periodicity === 'Repetido' &&
                        transaction.periodicityConfig &&
                        transaction.periodicityConfig.nextTransaction &&
                        isDateEqual(transaction.periodicityConfig.nextTransaction, currentDate)) {

                        console.log('Transação repetida encontrada para processar:', transaction.description);

                        // Calcular próxima transação
                        const nextTransactionDate = calculateNextTransaction(
                            transaction.periodicityConfig.nextTransaction,
                            transaction.periodicityConfig.periodicity
                        );

                        // Criar nova transação
                        const newTransaction = {
                            ...transaction,
                            _id: new ObjectId(),
                            paymentDate: { ...transaction.periodicityConfig.nextTransaction },
                            competenceMonth: {
                                month: transaction.periodicityConfig.nextTransaction.month,
                                year: transaction.periodicityConfig.nextTransaction.year
                            },
                            dateAdded: new Date(),
                            periodicityConfig: {
                                qtd: +transaction.qtd + 1,
                                ...transaction.periodicityConfig,
                                nextTransaction: nextTransactionDate
                            }
                        };

                        transactionsToProcess.push(newTransaction);

                        // // Atualizar transação original com nova nextTransaction
                        // const updatedTransaction = {
                        //     ...transaction,
                        //     periodicityConfig: {
                        //         ...transaction.periodicityConfig,
                        //         nextTransaction: nextTransactionDate
                        //     }
                        // };

                        // transactionsToUpdate.push(updatedTransaction);
                    }
                }

                // Se há transações para processar, atualizar o usuário
                if (transactionsToProcess.length > 0) {
                    // Atualizar as transações existentes
                    const updatedData = dfcItem.data.map(transaction => {
                        const updatedTransaction = transactionsToUpdate.find(t =>
                            t._id.toString() === transaction._id.toString()
                        );
                        return updatedTransaction || transaction;
                    });

                    // Adicionar as novas transações
                    updatedData.push(...transactionsToProcess);

                    // Atualizar no banco de dados
                    const dfcUpdateResult = await db.collection('users').updateOne(
                        {
                            _id: user._id,
                            'dfc.year': transactionsToProcess?.paymentDate.year,
                            'dfc.month': transactionsToProcess?.paymentDate.month
                        },
                        {
                            $push: {
                                'dfc.$.data': {
                                    $each: transactionsToProcess,
                                    $position: 0,
                                }
                            },
                            $inc: {
                                'dfc.$.monthResult': transactionsToProcess?.type === 'income' ? Number(transactionsToProcess.value) : -Number(transactionsToProcess.value),
                            }
                        }
                    );

                    if (dfcUpdateResult.modifiedCount === 0) {
                            const newDfcItem = {
                                year: transactionsToProcess.paymentDate.year,
                                month: transactionsToProcess.paymentDate.month,
                                monthResult: transactionsToProcess.type === 'income' ? Number(transactionsToProcess.value) : -Number(transactionsToProcess.value),
                                data: transactionsToProcess,
                            };

                            const newDfcResult = await db.collection('users').updateOne(
                                { _id: new ObjectId(user._id) },
                                { $push: { dfc: newDfcItem } }
                            );

                            if (newDfcResult.modifiedCount === 0) {
                                return res.status(500).json({ message: 'Failed to insert new DFC entry' });
                            }
                        }

                    processedTransactions += transactionsToProcess.length;
                    console.log(`Processadas ${transactionsToProcess.length} transações repetidas para usuário ${user._id}`);
                }
            }
        }

        return res.status(200).json({
            message: 'Cron job executado com sucesso',
            processedTransactions: processedTransactions,
            currentDate: currentDate
        });

    } catch (error) {
        console.error('Erro no cron job:', error);
        res.status(500).json({
            message: 'Erro ao executar cron job',
            error: error.message
        });
    }
}

// Função para comparar se duas datas são iguais
function isDateEqual(date1, date2) {
    return date1.day === date2.day &&
        date1.month === date2.month &&
        date1.year === date2.year;
}

// Função para calcular a próxima transação baseada na periodicidade (usando sua lógica)
function calculateNextTransaction(currentTransactionDate, periodicityValue) {
    // Criar objeto Date a partir da data da transação
    const date = new Date(currentTransactionDate.year, currentTransactionDate.month, currentTransactionDate.day);
    const day = date.getDate();
    const month = date.getMonth(); // 0-11
    const year = date.getFullYear();

    let nextDate = new Date(date);

    switch (periodicityValue) {
        case 'Diariamente':
            nextDate.setDate(day + 1);
            break;

        case 'Semanalmente':
            nextDate.setDate(day + 7);
            break;

        case 'Mensalmente':
            // Avança para o próximo mês
            nextDate.setMonth(month + 1);

            // Verifica quantos dias tem o próximo mês
            const daysInNextMonth = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();

            // Se o dia atual for maior que os dias do próximo mês, 
            // define para o último dia do próximo mês
            if (day > daysInNextMonth) {
                nextDate.setDate(daysInNextMonth);
            } else {
                nextDate.setDate(day);
            }
            break;

        case 'Anualmente':
            nextDate.setFullYear(year + 1);

            // Tratamento especial para ano bissexto (29 de fevereiro)
            if (month === 1 && day === 29) { // Fevereiro (mês 1), dia 29
                const nextYear = year + 1;
                const isNextYearLeap = (nextYear % 4 === 0 && nextYear % 100 !== 0) || (nextYear % 400 === 0);

                if (!isNextYearLeap) {
                    // Se o próximo ano não for bissexto, define para 28 de fevereiro
                    nextDate.setDate(28);
                }
            }
            break;

        default:
            // Se não for nenhuma das opções, retorna a data atual
            return {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            };
    }

    // Retorna a data no formato {day: number, month: number, year: number}
    return {
        day: nextDate.getDate(),
        month: nextDate.getMonth(), // 0-11
        year: nextDate.getFullYear()
    };
}

// Função para recalcular o resultado do mês
function calculateMonthResult(transactions) {
    return transactions.reduce((total, transaction) => {
        if (transaction.type === 'income') {
            return total + transaction.value;
        } else if (transaction.type === 'expense') {
            return total - transaction.value;
        }
        return total;
    }, 0);
}