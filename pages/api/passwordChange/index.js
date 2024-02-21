import { verify } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { connect } from '../../../utils/db'
import { ObjectId } from 'bson'



const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    })
}


export default authenticated(async (req, res) => {

    if (req.method === "PATCH") {

        const { user_id, newPassword, oldPassword } = req.body

        if (!user_id || !newPassword || !oldPassword) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const userExists = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExists) {

                res.status(400).json({ error: "User dont exists." })

            } else {

                bcrypt.compare(oldPassword, userExists.password, async function (err, result) {
                    if (!err && result) {

                        const saltPassword = await bcrypt.genSalt(10)
                        const securePassword = await bcrypt.hash(newPassword, saltPassword)

                        await db.collection('users').updateOne({ _id: ObjectId(user_id) },
                            {
                                $set: { "password": securePassword }
                            }
                        )

                        res.status(200).json({ message: "Password changed" })

                    } else {
                        res.status(400).json({ error: 'Wrong password' })
                    }
                })

            }


        }











}




})