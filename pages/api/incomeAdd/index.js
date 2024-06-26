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
                const tags = userExist.tags

                res.status(200).json({ tags });
            }
        }




    } else if (req.method === "POST") {
        const { user_id, ...data } = req.body;

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

                const dreData = {
                    ...data,
                    value: maskMoneyNumber(data.value),
                    _id: newId,
                    dateAdded,
                    type: 'income',
                    active: data.competenceMonth.month <= dateAddedObj.month && data.competenceMonth.year <= dateAddedObj.year,
                };

                const dfcData = {
                    ...data,
                    value: maskMoneyNumber(data.value),
                    _id: newId,
                    dateAdded,
                    type: 'income',
                    active: data.paymentDate.day <= dateAddedObj.day && data.paymentDate.month <= dateAddedObj.month && data.paymentDate.year <= dateAddedObj.year,
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
                                'dre.$.monthResult': dreData.value,
                            }
                        }
                    );

                    if (dreUpdateResult.modifiedCount === 0) {
                        const newDreItem = {
                            year: data.competenceMonth.year,
                            month: data.competenceMonth.month,
                            monthResult: dreData.value,
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

                    const dfcUpdateResult = await db.collection('users').updateOne(
                        {
                            _id: new ObjectId(user_id),
                            'dfc': {
                                $elemMatch: {
                                    'year': data.paymentDate.year,
                                    'month': data.paymentDate.month
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
                                'dfc.$.monthResult': dfcData.value,
                                // 'dfc.$.monthTotal': dfcData.value,
                            }
                        }
                    );

                    if (dfcUpdateResult.modifiedCount === 0) {
                        const newDfcItem = {
                            year: data.paymentDate.year,
                            month: data.paymentDate.month,
                            // lastMonthResult: 0,
                            monthResult: dfcData.value,
                            // monthTotal: dfcData.value,
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
