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

        const { user_id } = req.query

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request query" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const result = await db.collection('users').findOne({ _id: ObjectId(user_id) });

                if (result) {
                    res.status(200).json({ bankAccounts: result.bankAccounts });
                } else {
                    res.status(400).json({ error: "User doesn't exist." });
                }
            }
        }

    } else if (req.method === "POST") {

        const { user_id,
            bankSelected,
            color,
            value,
            description,
            valueSum } = req.body

        if (!user_id || !bankSelected || !description) {

            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {


                const bankData = {
                    bankSelected,
                    color,
                    value: maskMoneyNumber(value),
                    description,
                    valueSum,
                    date: dateObject(new Date())
                }

                const result = await db.collection('users').updateOne(
                    { _id: ObjectId(user_id) },
                    {
                        $push: {
                            bankAccounts: {
                                $each: [bankData],
                                $position: 0
                            }
                        }
                    }
                );

                if (result.modifiedCount > 0) {
                    res.status(200).json({ success: 'Account created' })
                } else {
                    res.status(400).json({ error: 'An error occurred' })
                }


            }
        }
    }









})