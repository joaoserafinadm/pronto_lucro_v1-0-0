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


    if (req.method === "PATCH") {

        const { user_id, account_id } = req.body

        if (!user_id || !account_id) {

            res.status(400).json({ error: "Missing parameters on request body" })

        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) })

            if (!userExist) {

                res.status(400).json({ error: "User doesn't exist." })

            } else {

                const account = userExist.bankAccounts?.find(account => account._id.toString() === account_id)

                if (!account) {

                    res.status(400).json({ error: "Account doesn't exist." })

                } else {

                    const response = await db.collection('users').updateOne(
                        { _id: new ObjectId(user_id), "bankAccounts._id": new ObjectId(account_id) },
                        {
                            $set: {
                                "bankAccounts.$.active": true,
                            }
                        })

                    if (response.modifiedCount === 0) {

                        res.status(400).json({ message: "Account not updated." })

                    } else {

                        res.status(200).json({ message: "Account activated." })

                    }


                }
            }
        }




    } else if (req.method === "DELETE") {

        const { user_id, account_id } = req.query

        if (!user_id || !account_id) {

            res.status(400).json({ error: "Missing parameters on request body" })

        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) })

            if (!userExist) {

                res.status(400).json({ error: "User doesn't exist." })

            } else {

                const account = userExist.bankAccounts?.find(account => account._id.toString() === account_id)

                if (!account) {

                    res.status(400).json({ error: "Account doesn't exist." })

                } else {

                    const response = await db.collection('users').updateOne(
                        { _id: new ObjectId(user_id) },
                        {
                            $pull: { bankAccounts: { _id: new ObjectId(account_id) } }
                        }
                    );

                    if (response.modifiedCount === 0) {

                        res.status(400).json({ message: "Account not updated." })

                    } else {

                        res.status(200).json({ message: "Account activated." })

                    }


                }
            }
        }

    }


})