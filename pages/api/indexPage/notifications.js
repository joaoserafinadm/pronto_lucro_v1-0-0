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
                const notifications = userExist.notifications || []
                res.status(200).json({ notifications });
            }
        }
    } else if (req.method === "PATCH") {

        const { user_id, notification_id } = req.body

        if (!user_id || !notification_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) })

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." })
            } else {
                const response = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id), "notifications._id": new ObjectId(notification_id) },
                    {
                        $set: {
                            "notifications.$.checked": true
                        }
                    }
                )

                if (response.matchedCount) {
                    res.status(200).json({ message: "Notifications updated" })
                } else {
                    res.status(400).json({ error: "Cant update notifications" })
                }

            }
        }
    }
});





