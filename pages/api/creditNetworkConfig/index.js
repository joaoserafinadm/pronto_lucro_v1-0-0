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


    if (req.method === 'GET') {

        const { user_id } = req.query

        if (!user_id) return res.status(400).json({ error: 'Missing parameters on request body' })

        try {
            const { db } = await connect()
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) return res.status(400).json({ error: 'User does not exist' })

            const { creditNetworkTaxes } = userExist

            return res.status(200).json( creditNetworkTaxes )

        } catch (e) {
            console.error(e)
            return res.status(500).json({ error: 'Internal server error' })
        }
    } else if (req.method === 'PATCH') {

        const { user_id, creditNetworkTaxes } = req.body

        if (!user_id || !creditNetworkTaxes) return res.status(400).json({ error: 'Missing parameters on request body' })

        try {
            const { db } = await connect()
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) return res.status(400).json({ error: 'User does not exist' })

            const result = await db.collection('users').updateOne(
                { _id: ObjectId(user_id) },
                { $set: { creditNetworkTaxes } }
            )

            if (result.modifiedCount) {
                return res.status(200).json({ message: 'Success' })
            } else {
                return res.status(400).json({ error: 'Server Error' })
            }

        } catch (e) {
            console.error(e)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}
)





