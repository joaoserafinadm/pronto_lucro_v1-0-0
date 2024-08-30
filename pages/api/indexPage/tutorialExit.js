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

    if (req.method === "POST") {

        const { user_id } = req.body

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        }

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            res.status(400).json({ error: "User doesn't exist." });
        }

        const response = await db.collection('users').updateOne({ _id: new ObjectId(user_id) }, {
            $set: {
                initialTutorial: false
            }
        })

        if (response.modifiedCount === 0) {
            res.status(400).json({ message: "Tutorial not updated." })
        }

        res.status(200).json({ message: "Tutorial updated successfully." })

    }




})