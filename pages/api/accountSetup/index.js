import { connect } from '../../../utils/db'
import { verify, sign } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'
import cookie from 'cookie'


const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    })
}

export default authenticated(async (req, res) => {

    if (req.method === "GET") {

        const { user_id } = req.query

        if (!user_id) {
            res.status(400).json({ error: 'Missing parameters on request body' })
        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne(
                { _id: ObjectId(user_id) },
                {
                    projection: {
                        firstName: 1,
                        lastName: 1,
                        email: 1,
                        celular: 1,
                        companyData: 1,
                        tools: 1
                    }
                }
            )




            if (!userExist) {
                res.status(400).json({ error: 'Company or user does not exist' })
            } else {

                res.status(200).json({ user: userExist })


            }

        }

    }



})