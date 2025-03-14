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

        const { user_id, setorSelected, newSetorName, incomeTags, expenseTags } = req.body

        if (!user_id || !setorSelected || !incomeTags || !expenseTags) {
            res.status(400).json({ error: "Missing parameters on request body" })
        }

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            res.status(400).json({ error: "User doesn't exist." });
        }

        const newIncomeTags = incomeTags.map(elem => {
            return {
                _id: new ObjectId(),
                ...elem
            }
        })
        const newExpenseTags = expenseTags.map(elem => {
            return {
                _id: new ObjectId(),
                ...elem
            }
        })

        const response = await db.collection('users').updateOne({ _id: new ObjectId(user_id) }, {
            $set: {
                setorSelected: setorSelected,
                newSetorName: newSetorName,
                incomeTags: newIncomeTags,
                expenseTags: newExpenseTags
            }
        })

        if (response.modifiedCount === 0) {
            res.status(200).json({ message: "Tags updated successfully." })
        }


        res.status(400).json({ error: "Tags not updated." })

    }
})