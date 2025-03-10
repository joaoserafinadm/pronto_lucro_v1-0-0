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

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {
                const newId = new ObjectId();
                const dateAdded = new Date();
                const dateAddedObj = dateObject(dateAdded);

                const dfcDataArray = handleDfcData(newId, dateAdded, dateAddedObj, data, section);

                const dreData = {
                    ...data,
                    // tag: data.tagSelected._id,
                    value: maskMoneyNumber(data.value),
                    taxedValue: +data.value - +data.value * +data.creditConfig.taxa / 100,
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
                                    $position: 0,
                                }
                            },
                            $inc: {
                                'dre.$.monthResult': section === 'income' ? dreData.value : -dreData.value,
                            }
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

    const valueFormat = +maskMoneyNumber(data.value);
    const newValue = valueFormat - valueFormat * +data.creditConfig.taxa / 100;

    const newData = [];

    let currentPaymentDate = { ...data.paymentDate };

    for (let i = 1; i <= data.creditConfig.parcelas; i++) {
        currentPaymentDate = adjustDate(currentPaymentDate);

        const newCreditConfig = {
            ...data.creditConfig,
            parcelaAtual: i
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

function adjustDate(paymentDate) {
    let { day, month, year } = paymentDate;

    day += 30; // Adjust by 30 days for each installment
    if (day > 30) {
        day -= 30;
        month += 1;
    }

    if (month > 12) {
        month -= 12;
        year += 1;
    }

    return { day, month, year };
}
