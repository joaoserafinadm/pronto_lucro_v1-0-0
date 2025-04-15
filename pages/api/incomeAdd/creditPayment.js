
// import { connect } from '../../../utils/db';
// import { verify } from 'jsonwebtoken';
// import { ObjectId } from 'bson';
// // import cookie from 'cookie';
// import { maskMoneyNumber } from '../../../utils/mask';
// import { dateObject } from '../../../utils/handleDate';

// const authenticated = fn => async (req, res) => {
//     verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
//         if (!err && decoded) {
//             return await fn(req, res);
//         }
//         res.status(500).json({ message: 'You are not authenticated.' });
//     });
// };

// export default authenticated(async (req, res) => {
//     if (req.method === "GET") {
//         const { user_id } = req.query;

//         if (!user_id) {
//             res.status(400).json({ error: "Missing parameters on request body" });
//         } else {
//             const { db } = await connect();
//             const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
//             if (!userExist) {
//                 res.status(400).json({ error: "User doesn't exist." });
//             } else {
//                 const tags = userExist.tags;
//                 res.status(200).json({ tags });
//             }
//         }



//     } else if (req.method === "POST") {
//         const { user_id, section, ...data } = req.body;


//         if (!user_id || !data?.value) {
//             res.status(400).json({ error: "Missing parameters on request body" });
//         } else {
//             const { db } = await connect();
//             const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

//             const backAccountSelected = userExist.bankAccounts.find(account => account._id.toString() === data?.account_id)

//             if (data.creditConfig?.debitOnPaymentDay && backAccountSelected && data.type === 'expense') {
//                 data.paymentDate = data.paymentDate || {};

//                 // Obter dia da compra, dia de fechamento e dia de pagamento
//                 const diaCompra = data.paymentDate.day;
//                 const diaFechamento = backAccountSelected.diaFechamento;
//                 const diaPagamento = backAccountSelected.diaLancamento;

//                 let { month, year } = data.paymentDate;

//                 // Se a compra foi feita após o fechamento da fatura do mês atual,
//                 // o pagamento será no mês seguinte
//                 if (diaCompra > diaFechamento) {
//                     month += 1;
//                     if (month > 12) {
//                         month = 1;
//                         year += 1;
//                     }
//                 }

//                 // Definir o dia de pagamento como o dia de lançamento da conta
//                 data.paymentDate.day = diaPagamento;
//                 data.paymentDate.month = month;
//                 data.paymentDate.year = year;
//             }



//             if (!userExist) {
//                 res.status(400).json({ error: "User doesn't exist." });
//             } else {
//                 const newId = new ObjectId();
//                 const newTaxId = new ObjectId();
//                 const dateAdded = new Date();
//                 const dateAddedObj = dateObject(dateAdded);

//                 const taxData = {
//                     ...data,
//                     subCategory_id: data.creditConfig.subCategory_id,
//                     value: data.creditConfig.taxTotal,
//                     _id: new ObjectId(),
//                     taxRef_id: newTaxId,
//                     ref_id: newId,
//                     dateAdded,
//                     type: 'expense'
//                 }

//                 const dfcDataArray = handleDfcData(newId, dateAdded, dateAddedObj, data, section);
//                 const dfcTaxDataArray = handleDfcData(newId, dateAdded, dateAddedObj, taxData, 'expense');

//                 // console.log('dfcDataArray', dfcDataArray)

//                 const dreData = {
//                     ...data,
//                     value: maskMoneyNumber(data.value),
//                     _id: new ObjectId(),
//                     ref_id: newId,
//                     dateAdded,
//                     type: section,
//                     active: !data.active ? false : isDateBefore(data.competenceMonth, dateAddedObj)
//                 };
//                 const dreTaxData = {
//                     ...data,
//                     value: maskMoneyNumber(data.creditConfig?.taxTotal),
//                     _id: new ObjectId(),
//                     taxRef_id: newTaxId,
//                     ref_id: newId,
//                     dateAdded,
//                     type: 'expense',
//                     active: !data.active ? false : isDateBefore(data.competenceMonth, dateAddedObj)
//                 };

//                 try {
//                     const dreUpdateResult = await db.collection('users').updateOne(
//                         {
//                             _id: new ObjectId(user_id),
//                             'dre': {
//                                 $elemMatch: {
//                                     'year': data.competenceMonth.year,
//                                     'month': data.competenceMonth.month
//                                 }
//                             }
//                         },
//                         {
//                             $push: {
//                                 'dre.$.data': {
//                                     $each: [dreTaxData],
//                                     $position: 0,
//                                 }
//                             },
//                             $push: {
//                                 'dre.$.data': {
//                                     $each: [dreData],
//                                     $position: 1,
//                                 }
//                             },
//                             $inc: {
//                                 'dre.$.monthResult': section === 'income' ? dreData.value : -dreData.value,
//                             },
//                             $inc: {
//                                 'dre.$.monthResult': -dreTaxData.value,
//                             },
//                         }
//                     );

//                     if (dreUpdateResult.modifiedCount === 0) {
//                         const newDreItem = {
//                             year: data.competenceMonth.year,
//                             month: data.competenceMonth.month,
//                             monthResult: section === 'income' ? dreData.value : -dreData.value,
//                             data: [dreData, dreTaxData],
//                         };

//                         const newDreResult = await db.collection('users').updateOne(
//                             { _id: new ObjectId(user_id) },
//                             { $push: { dre: newDreItem } }
//                         );

//                         if (newDreResult.modifiedCount === 0) {
//                             return res.status(500).json({ message: 'Failed to insert new DRE entry' });
//                         }
//                     }

//                     for (const dfcTaxData of dfcTaxDataArray) {
//                         const dfcUpdateResult = await db.collection('users').updateOne(
//                             {
//                                 _id: new ObjectId(user_id),
//                                 'dfc': {
//                                     $elemMatch: {
//                                         'year': dfcTaxData.paymentDate.year,
//                                         'month': dfcTaxData.paymentDate.month
//                                     }
//                                 }
//                             },
//                             {
//                                 $push: {
//                                     'dfc.$.data': {
//                                         $each: [dfcTaxData],
//                                         $position: 0,
//                                     }
//                                 },
//                                 $inc: {
//                                     'dfc.$.monthResult': section === 'income' ? dfcTaxData.value : -dfcTaxData.value,
//                                 }
//                             }
//                         );

//                         if (dfcUpdateResult.modifiedCount === 0) {
//                             const newDfcItem = {
//                                 year: dfcTaxData.paymentDate.year,
//                                 month: dfcTaxData.paymentDate.month,
//                                 monthResult: section === 'income' ? dfcTaxData.value : -dfcTaxData.value,
//                                 data: [dfcTaxData],
//                             };

//                             const newDfcResult = await db.collection('users').updateOne(
//                                 { _id: new ObjectId(user_id) },
//                                 { $push: { dfc: newDfcItem } }
//                             );

//                             if (newDfcResult.modifiedCount === 0) {
//                                 return res.status(500).json({ message: 'Failed to insert new DFC entry' });
//                             }
//                         }
//                     }


//                     for (const dfcData of dfcDataArray) {
//                         const dfcUpdateResult = await db.collection('users').updateOne(
//                             {
//                                 _id: new ObjectId(user_id),
//                                 'dfc': {
//                                     $elemMatch: {
//                                         'year': dfcData.paymentDate.year,
//                                         'month': dfcData.paymentDate.month
//                                     }
//                                 }
//                             },
//                             {
//                                 $push: {
//                                     'dfc.$.data': {
//                                         $each: [dfcData],
//                                         $position: 0,
//                                     }
//                                 },
//                                 $inc: {
//                                     'dfc.$.monthResult': section === 'income' ? dfcData.value : -dfcData.value,
//                                 }
//                             }
//                         );

//                         if (dfcUpdateResult.modifiedCount === 0) {
//                             const newDfcItem = {
//                                 year: dfcData.paymentDate.year,
//                                 month: dfcData.paymentDate.month,
//                                 monthResult: section === 'income' ? dfcData.value : -dfcData.value,
//                                 data: [dfcData],
//                             };

//                             const newDfcResult = await db.collection('users').updateOne(
//                                 { _id: new ObjectId(user_id) },
//                                 { $push: { dfc: newDfcItem } }
//                             );

//                             if (newDfcResult.modifiedCount === 0) {
//                                 return res.status(500).json({ message: 'Failed to insert new DFC entry' });
//                             }
//                         }
//                     }

//                     // Ordenar os dados da DRE e DFC após a atualização
//                     await db.collection('users').updateOne(
//                         { _id: new ObjectId(user_id) },
//                         {
//                             $push: {
//                                 dre: {
//                                     $each: [],
//                                     $sort: { year: 1, month: 1 }
//                                 },
//                                 dfc: {
//                                     $each: [],
//                                     $sort: { year: 1, month: 1 }
//                                 }
//                             }
//                         }
//                     );

//                     res.status(200).json({ message: 'Data updated' });

//                 } catch (error) {
//                     console.error(error);
//                     res.status(500).json({ message: 'Internal server error' });
//                 }
//             }
//         }
//     }
// });

// function isDateBefore(paymentDate, dateAddedObj) {
//     if (paymentDate.year < dateAddedObj.year) {
//         return true;
//     } else if (paymentDate.year > dateAddedObj.year) {
//         return false;
//     }

//     if (paymentDate.month < dateAddedObj.month) {
//         return true;
//     } else if (paymentDate.month > dateAddedObj.month) {
//         return false;
//     }

//     if (paymentDate.day <= dateAddedObj.day) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function handleDfcData(newId, dateAdded, dateAddedObj, data, section) {

//     console.log("data", section, data)


//     const valueFormat = maskMoneyNumber(data.value);
//     const newValue = valueFormat

//     const newData = [];

//     let currentPaymentDate = { ...data.paymentDate };

//     for (let i = 1; i <= data.creditConfig.parcelas; i++) {
//         currentPaymentDate = adjustDate(currentPaymentDate);

//         const newCreditConfig = {
//             ...data.creditConfig,
//             parcelaAtual: i
//         };

//         const newElem = {
//             ...data,
//             paymentDate: currentPaymentDate,
//             // tag: data.tagSelected._id,
//             value: maskMoneyNumber((newValue / +data.creditConfig.parcelas).toFixed(2)),
//             _id: new ObjectId(),
//             ref_id: newId,
//             dateAdded,
//             type: section,
//             creditConfig: newCreditConfig,
//             active: !data.active ? false : isDateBefore(currentPaymentDate, dateAddedObj)
//         };

//         newData.push(newElem);
//     }

//     return newData;
// }

// function adjustDate(paymentDate) {
//     let { day, month, year } = paymentDate;

//     month += 1; // Avança um mês para cada parcela

//     if (month > 12) {
//         month = 1;
//         year += 1;
//     }

//     return { day, month, year };
// }



import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
// import cookie from 'cookie';
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
                const tags = userExist.tags;
                res.status(200).json({ tags });
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

            console.log('backAccountSelected', data.creditConfig?.debitOnPaymentDay, backAccountSelected?.diaLancamento, backAccountSelected?.diaFechamento, section)

            if (data.creditConfig?.debitOnPaymentDay &&
                backAccountSelected &&
                backAccountSelected?.diaLancamento &&
                backAccountSelected?.diaFechamento &&
                section === 'expense') {
                data.paymentDate = handleCreditData(data.paymentDate, +backAccountSelected?.diaLancamento, +backAccountSelected?.diaFechamento)
                console.log('data.paymentDate', data.paymentDate)
            }



            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {
                const newId = new ObjectId();
                const newTaxId = new ObjectId();
                const dateAdded = new Date();
                const dateAddedObj = dateObject(dateAdded);

                const taxData = {
                    ...data,
                    subCategory_id: data.creditConfig.subCategory_id,
                    value: data.creditConfig.taxTotal,
                    _id: new ObjectId(),
                    taxRef_id: newTaxId,
                    ref_id: newId,
                    dateAdded,
                    type: 'expense'
                }

                const dfcDataArray = handleDfcData(newId, dateAdded, dateAddedObj, data, section);
                const dfcTaxDataArray = handleDfcData(newId, dateAdded, dateAddedObj, taxData, 'expense');

                // console.log('dfcDataArray', dfcDataArray)

                const dreData = {
                    ...data,
                    value: maskMoneyNumber(data.value),
                    _id: new ObjectId(),
                    ref_id: newId,
                    dateAdded,
                    type: section,
                    active: !data.active ? false : isDateBefore(data.competenceMonth, dateAddedObj)
                };
                const dreTaxData = {
                    ...data,
                    value: maskMoneyNumber(data.creditConfig?.taxTotal),
                    _id: new ObjectId(),
                    taxRef_id: newTaxId,
                    ref_id: newId,
                    dateAdded,
                    type: 'expense',
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
                                    $each: [dreTaxData],
                                    $position: 0,
                                }
                            },
                            $push: {
                                'dre.$.data': {
                                    $each: [dreData],
                                    $position: 1,
                                }
                            },
                            $inc: {
                                'dre.$.monthResult': section === 'income' ? dreData.value : -dreData.value,
                            },
                            $inc: {
                                'dre.$.monthResult': -dreTaxData.value,
                            },
                        }
                    );

                    if (dreUpdateResult.modifiedCount === 0) {
                        const newDreItem = {
                            year: data.competenceMonth.year,
                            month: data.competenceMonth.month,
                            monthResult: section === 'income' ? dreData.value : -dreData.value,
                            data: [dreData, dreTaxData],
                        };

                        const newDreResult = await db.collection('users').updateOne(
                            { _id: new ObjectId(user_id) },
                            { $push: { dre: newDreItem } }
                        );

                        if (newDreResult.modifiedCount === 0) {
                            return res.status(500).json({ message: 'Failed to insert new DRE entry' });
                        }
                    }

                    for (const dfcTaxData of dfcTaxDataArray) {
                        const dfcUpdateResult = await db.collection('users').updateOne(
                            {
                                _id: new ObjectId(user_id),
                                'dfc': {
                                    $elemMatch: {
                                        'year': dfcTaxData.paymentDate.year,
                                        'month': dfcTaxData.paymentDate.month
                                    }
                                }
                            },
                            {
                                $push: {
                                    'dfc.$.data': {
                                        $each: [dfcTaxData],
                                        $position: 0,
                                    }
                                },
                                $inc: {
                                    'dfc.$.monthResult': section === 'income' ? dfcTaxData.value : -dfcTaxData.value,
                                }
                            }
                        );

                        if (dfcUpdateResult.modifiedCount === 0) {
                            const newDfcItem = {
                                year: dfcTaxData.paymentDate.year,
                                month: dfcTaxData.paymentDate.month,
                                monthResult: section === 'income' ? dfcTaxData.value : -dfcTaxData.value,
                                data: [dfcTaxData],
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

                    // Ordenar os dados da DRE e DFC após a atualização
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
    if (paymentDate.year < dateAddedObj.year) {
        return true;
    } else if (paymentDate.year > dateAddedObj.year) {
        return false;
    }

    if (paymentDate.month < dateAddedObj.month) {
        return true;
    } else if (paymentDate.month > dateAddedObj.month) {
        return false;
    }

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

    for (let i = 0; i < data.creditConfig.parcelas; i++) {
        // Calcula a data de pagamento para a parcela atual
        // Começando com a data original e ajustando conforme o número da parcela
        const currentPaymentDate = adjustDate({ ...data.paymentDate }, i);

        const newCreditConfig = {
            ...data.creditConfig,
            parcelaAtual: i + 1
        };

        const newElem = {
            ...data,
            paymentDate: currentPaymentDate,
            // tag: data.tagSelected._id,
            value: maskMoneyNumber((newValue / +data.creditConfig.parcelas).toFixed(2)),
            _id: new ObjectId(),
            ref_id: newId,
            dateAdded,
            type: section,
            creditConfig: newCreditConfig,
            active: !data.active ? false : isDateBefore(currentPaymentDate, dateAddedObj)
        };

        newData.push(newElem);
    }

    return newData;
}

function adjustDate(paymentDate, index) {
    // index é implícito no contexto da função handleDfcData
    // vamos assumir que é o número da parcela menos 1 (já que index começa em 0)

    let { day, month, year } = { ...paymentDate };

    // Não incrementamos o mês para a primeira parcela (index 0)
    // A primeira parcela usa o mesmo mês que paymentDate.month 
    const monthsToAdd = index || 0;

    // Adiciona meses conforme necessário
    if (monthsToAdd > 0) {
        month += monthsToAdd;

        // Ajusta o ano se os meses passarem de 12
        if (month > 12) {
            const yearsToAdd = Math.floor((month - 1) / 12);
            month = ((month - 1) % 12) + 1;
            year += yearsToAdd;
        }
    }

    // Ajuste para o número de dias do mês
    const diasPorMes = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDaysInMonth = diasPorMes[month - 1];

    // Limita o dia ao máximo possível no mês atual
    if (day > maxDaysInMonth) {
        day = maxDaysInMonth;
    }

    return { day, month, year };
}

// Função auxiliar para determinar o número de dias em fevereiro (considerando anos bissextos)
function getFebDays(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
}


const handleCreditData = (date, diaLancamento, diaFechamento) => {

    if (+date?.day < +diaLancamento) {
        return {
            ...date,
            day: +diaFechamento
        }
    } else {
        return {
            ...date,
            day: +diaFechamento,
            month: date.month + 1 > 11 ? 0 : date.month + 1,
            year: date.month + 1 > 11 ? date.year + 1 : date.year
        }
    }
}