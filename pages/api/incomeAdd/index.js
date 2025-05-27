import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
import cookie from 'cookie';
import { maskMoneyNumber } from '../../../utils/mask';
import { dateObject } from '../../../utils/handleDate';

const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    });
};

export default authenticated(async (req, res) => {

    if (req.method === "GET") {

        const { user_id } = req.query;

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" });
        } else {
            const { db } = await connect();
            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {
                const incomeCategories = userExist.incomeCategories
                const expenseCategories = userExist.expenseCategories
                const bankAccounts = userExist.bankAccounts.map(elem => {
                    return {
                        _id: elem._id,
                        bankSelected: elem.bankSelected,
                        color: elem.color,
                        description: elem.description

                    }
                })

                const creditNetworkTaxes = userExist.creditNetworkTaxes

                res.status(200).json({ incomeCategories, expenseCategories, bankAccounts, creditNetworkTaxes });
            }
        }




    } else if (req.method === "POST") {

        const { user_id, section, ...data } = req.body;


        if (!user_id || !data?.value) {
            res.status(400).json({ error: "Missing parameters on request body" });
        } else {

            const { db } = await connect();
            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            const backAccountSelected = userExist.bankAccounts.find(account => account._id.toString() === data?.account_id)

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {
                const newId = new ObjectId();
                const dateAdded = new Date();
                const dateAddedObj = dateObject(dateAdded);

                const dfcDataArray = data.periodicity === "Único" || data.periodicity === "Repetido" ? [{
                    ...data,
                    value: maskMoneyNumber(data.value),
                    _id: newId,
                    ref_id: newId,
                    dateAdded,
                    type: section,
                    active: !data.active ? false : isDateBefore(data.paymentDate, dateAddedObj)
                }] : handleDfcData(newId, dateAdded, dateAddedObj, data, section);

                console.log("dfcDataArray", dfcDataArray)

                const dreData = {
                    ...data,
                    value: maskMoneyNumber(data.value),
                    _id: new ObjectId(),
                    ref_id: newId,
                    dateAdded,
                    type: section,
                    active: !data.active ? false : isDateBefore(data.competenceMonth, dateAddedObj)
                };

                try {

                    const dreUpdateResult = await db.collection('users').updateOne(
                        {
                            _id: new ObjectId(user_id),
                            'dre': {
                                $elemMatch: {
                                    'year': data.competenceMonth.year,
                                    'month': data.competenceMonth.month
                                }
                            }
                        },
                        {
                            $push: {
                                'dre.$.data': {
                                    $each: [dreData],
                                    $position: 1,
                                }
                            },
                            $inc: {
                                'dre.$.monthResult': section === 'income' ? dreData.value : -dreData.value,
                            },
                        }
                    );

                    if (dreUpdateResult.modifiedCount === 0) {
                        const newDreItem = {
                            year: data.competenceMonth.year,
                            month: data.competenceMonth.month,
                            monthResult: section === 'income' ? dreData.value : -dreData.value,
                            data: [dreData],
                        };

                        const newDreResult = await db.collection('users').updateOne(
                            { _id: new ObjectId(user_id) },
                            { $push: { dre: newDreItem } }
                        );

                        if (newDreResult.modifiedCount === 0) {
                            return res.status(500).json({ message: 'Failed to insert new DRE entry' });
                        }
                    }

                    for (const dfcData of dfcDataArray) {
                        const dfcUpdateResult = await db.collection('users').updateOne(
                            {
                                _id: new ObjectId(user_id),
                                'dfc': {
                                    $elemMatch: {
                                        'year': dfcData.paymentDate.year,
                                        'month': dfcData.paymentDate.month
                                    }
                                }
                            },
                            {
                                $push: {
                                    'dfc.$.data': {
                                        $each: [dfcData],
                                        $position: 0,
                                    }
                                },
                                $inc: {
                                    'dfc.$.monthResult': section === 'income' ? dfcData.value : -dfcData.value,
                                }
                            }
                        );

                        if (dfcUpdateResult.modifiedCount === 0) {
                            const newDfcItem = {
                                year: dfcData.paymentDate.year,
                                month: dfcData.paymentDate.month,
                                monthResult: section === 'income' ? dfcData.value : -dfcData.value,
                                data: [dfcData],
                            };

                            const newDfcResult = await db.collection('users').updateOne(
                                { _id: new ObjectId(user_id) },
                                { $push: { dfc: newDfcItem } }
                            );

                            if (newDfcResult.modifiedCount === 0) {
                                return res.status(500).json({ message: 'Failed to insert new DFC entry' });
                            }
                        }
                    }

                    await db.collection('users').updateOne(
                        { _id: new ObjectId(user_id) },
                        {
                            $push: {
                                dre: {
                                    $each: [],
                                    $sort: { year: 1, month: 1 }
                                },
                                dfc: {
                                    $each: [],
                                    $sort: { year: 1, month: 1 }
                                }
                            }
                        }
                    );

                    res.status(200).json({ message: 'Data updated' });

                } catch (error) {

                    console.error(error);
                    res.status(500).json({ message: 'Internal server error' });

                }

            }

        }

    }
});



function isDateBefore(paymentDate, dateAddedObj) {
    // Comparar anos
    if (paymentDate.year < dateAddedObj.year) {
        return true;
    } else if (paymentDate.year > dateAddedObj.year) {
        return false;
    }

    // Anos são iguais, comparar meses
    if (paymentDate.month < dateAddedObj.month) {
        return true;
    } else if (paymentDate.month > dateAddedObj.month) {
        return false;
    }

    // Meses são iguais, comparar dias
    if (paymentDate.day <= dateAddedObj.day) {
        return true;
    } else {
        return false;
    }
}

function handleDfcData(newId, dateAdded, dateAddedObj, data, section) {
    const valueFormat = maskMoneyNumber(data.value);
    const newValue = valueFormat;

    const newData = [];

    for (let i = 0; i < data.periodicityConfig.qtd ? data.periodicityConfig.qtd : 0; i++) {
        // Calcula a data de pagamento para a parcela atual
        // considerando a periodicidade selecionada
        const currentPaymentDate = adjustDateByPeriodicity(
            { ...data.paymentDate }, 
            i, 
            data.periodicityConfig.periodicity
        );

        const newperiodicityConfig = {
            ...data.periodicityConfig,
            qtd: +data.periodicityConfig.qtd,
            parcelaAtual: i + 1
        };

        const newElem = {
            ...data,
            paymentDate: currentPaymentDate,
            // tag: data.tagSelected._id,
            value: maskMoneyNumber((newValue / (+data.periodicityConfig?.qtd || 1)).toFixed(2)),
            _id: new ObjectId(),
            ref_id: newId,
            dateAdded,
            type: section,
            periodicityConfig: newperiodicityConfig,
            active: !data.active ? false : isDateBefore(currentPaymentDate, dateAddedObj)
        };

        newData.push(newElem);
    }

    return newData;
}

function adjustDateByPeriodicity(paymentDate, index, periodicity) {
    if (index === 0) {
        // Primeira parcela mantém a data original
        return paymentDate;
    }

    let { day, month, year } = { ...paymentDate };
    
    switch (periodicity) {
        case "Dias":
            // Adiciona dias
            return addDays({ day, month, year }, index);
        
        case "Semanas":
            // Adiciona semanas (7 dias por semana)
            return addDays({ day, month, year }, index * 7);
        
        case "Meses":
            // Adiciona meses
            month += index;
            
            // Ajusta o ano se os meses passarem de 12
            if (month > 12) {
                const yearsToAdd = Math.floor((month - 1) / 12);
                month = ((month - 1) % 12) + 1;
                year += yearsToAdd;
            }
            
            // Ajuste para o número de dias do mês
            const diasPorMes = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const maxDaysInMonth = diasPorMes[month - 1];
            
            // Limita o dia ao máximo possível no mês atual
            if (day > maxDaysInMonth) {
                day = maxDaysInMonth;
            }
            
            return { day, month, year };
        
        case "Anos":
            // Adiciona anos, mantendo o mesmo dia e mês
            // Mas verificando o dia 29/02 em anos bissextos
            year += index;
            
            if (month === 2 && day === 29 && !isLeapYear(year)) {
                day = 28;
            }
            
            return { day, month, year };
        
        default:
            // Se não for especificado, mantém o comportamento original (mensal)
            return adjustDate(paymentDate, index);
    }
}

function addDays({ day, month, year }, daysToAdd) {
    // Algoritmo para adicionar um número específico de dias à data
    let totalDays = day + daysToAdd;
    
    while (true) {
        const diasNoMes = month === 2 ? getFebDays(year) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
        
        if (totalDays <= diasNoMes) {
            // Se o número de dias está dentro do mês atual, terminamos
            break;
        }
        
        // Subtrai os dias do mês atual e avança para o próximo mês
        totalDays -= diasNoMes;
        month++;
        
        // Se passamos de dezembro, incrementa o ano
        if (month > 12) {
            month = 1;
            year++;
        }
    }
    
    day = totalDays;
    return { day, month, year };
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getFebDays(year) {
    return isLeapYear(year) ? 29 : 28;
}