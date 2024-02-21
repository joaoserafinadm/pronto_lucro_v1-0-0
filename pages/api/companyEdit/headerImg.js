import { connect } from '../../../utils/db'
import { verify, sign } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'
import cookie from 'cookie'


const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' })
    })
}

export default authenticated(async (req, res) => {


    if (req.method === "GET") {

        const { company_id } = req.query

        if (!company_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(company_id) })

            if (!companyExist) {

                res.status(400).json({ error: "Company do not exists" })

            } else {

                res.status(200).json({ data: companyExist.backgroundImages })

            }
        }


    }

    if (req.method === "POST") {

        const { company_id, user_id, imageUrl } = req.body

        if (!company_id || !user_id || !imageUrl) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(company_id) })

            if (!companyExist) {

                res.status(400).json({ error: "Company do not exists" })
            } else {

                const newId = ObjectId()

                const response = await db.collection("companies").updateOne({ _id: ObjectId(company_id) },
                    {
                        $addToSet: {
                            "backgroundImages": {
                                _id: newId,
                                imageUrl: imageUrl,
                                user_id: user_id
                            }
                        }
                    })


                if (!response.matchedCount) {
                    res.status(400).json({ error: "Cant upload image" })
                } else {
                    res.status(200).json({ newId: newId })
                }
            }

        }


    }


    if (req.method === "DELETE") {


        const { company_id, backgroundImg_id } = req.query

        if (!company_id || !backgroundImg_id) {

            res.status(200).json({ error: "Missing parameters on request body" })

        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(company_id) })

            if (!companyExist) {

                res.status(400).json({ error: "Company do not exists" })
            } else {

                const response = await db.collection("companies").updateOne({ _id: ObjectId(company_id) },
                    {
                        $pull: {
                            "backgroundImages": {
                                _id: ObjectId(backgroundImg_id),
                            }
                        }
                    })

                if (!response.matchedCount) {
                    res.status(400).json({ error: "Cant upload image" })
                } else {
                    res.status(200).json({ message: "Background images updated"})
                }



            }

        } 


    }

})