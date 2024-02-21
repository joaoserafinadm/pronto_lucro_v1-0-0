import { connect } from '../../../utils/db'
import { verify } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'

const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' })
    })
}

export default authenticated(async (req, res) => {

    if (req.method === 'GET') {
        const { user_id } = req.query

        if (!user_id) {
            return res.status(400).json({ error: 'Missing parameters on request body' })
        }

        try {
            const { db } = await connect()
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) {
                return res.status(400).json({ error: 'Company does not exist' })
            }

            const data = userExist.notifications
            return res.status(200).json({ data })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    if (req.method === "POST") {

        const { company_id, user_id, text, link, } = req.body

        if (!company_id || !user_id) {

            res.status(400).json({ error: "Missing parameters on request body" })

        } else {

            const { db } = await connect()

            const companyExists = await db.collection('companies').findOne({ _id: ObjectId(company_id) })

            if (!companyExists) {
                res.status(400).json({ error: "Company does not exist" })
            } else {

                const data = {
                    _id: ObjectId(),
                    user_id,
                    dateAdded: new Date(),
                    checked: false,
                    subject,
                    text,
                    link
                }

                const result = await db.collection('companies').updateOne(
                    { _id: ObjectId(company_id) },
                    {
                        $addToSet: {
                            "notifications": data
                        }
                    })

                console.log(result)

                if (result) {
                    res.status(400).json({ error: 'Network error' })
                } else {
                    res.status(200).json({ message: 'Notifications updated' })
                }

            }
        }

    } else if (req.method === "PATCH") {

        const { company_id, user_id } = req.body

        console.log(req.body, company_id, user_id)

        if (!company_id || !user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const companyExists = await db.collection('companies').findOne({ _id: ObjectId(company_id) })
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!companyExists || !userExist) {
                res.status(400).json({ error: "Company or user does not exist" })

            } else {

                const result = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id) },
                    { $set: { 'notifications.$[].checked': true } }
                );

                if (result.matchedCount) {
                    res.status(200).json({ message: "Notifications updated" })
                } else {
                    res.status(400).json({ error: "Cant update notifications" })
                }
            }

        }


    }


    else {
        res.status(400).json({ error: "Wrong request method" })
    }



})