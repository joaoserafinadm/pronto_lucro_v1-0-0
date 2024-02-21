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

        const { user_id, company_id } = req.query

        if (!user_id || !company_id) {
            res.status(400).json({ error: 'Missing parameters on request body' })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne(
                { _id: ObjectId(company_id) },
                {
                    projection: {
                        companyName: 1,
                        cep: 1,
                        logradouro: 1,
                        numero: 1,
                        cidade: 1,
                        estado: 1,
                        responsavel: 1,
                        email: 1,
                        tools: 1
                    }
                }
            )


            const userExist = await db.collection('users').findOne(
                { _id: ObjectId(user_id) },
                {
                    projection: {
                        firstName: 1,
                        lastName: 1,
                        email: 1,
                        userStatus: 1
                    }
                }
            )

            if (!companyExist || !userExist) {
                res.status(400).json({ error: 'Company or user does not exist' })
            } else {

                res.status(200).json({ company: companyExist, user: userExist })


            }

        }

    }



})