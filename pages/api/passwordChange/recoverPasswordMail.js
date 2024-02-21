import { ObjectId } from "bson"
import { connect } from "../../../utils/db"
import {RecoverPasswordEmail} from '../../../src/emails/RecoverPasswordEmail'
import { verify } from 'jsonwebtoken'
import crypto from 'crypto'
import baseUrl from '../../../utils/baseUrl'
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);


const authenticated = fn => async (req, res) => {

    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }

        res.status(500).json({ message: 'You are not authenticated.' })
    })
}


export default authenticated(async (req, res) => {


    if (req.method === "POST") {

        const { user_id } = req.body

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) {

                res.status(400).json({ error: "User dont exists." })
            } else {


                const token = crypto.randomBytes(20).toString('hex')

                const now = new Date()
                now.setHours(now.getHours() + 1)

                const response = await db.collection('users').updateOne({ _id: ObjectId(userExist._id) }, {
                    '$set': {
                        passwordResetToken: token,
                        passwordResetExpires: now
                    }
                })

                console.log(response)

                const link = `${baseUrl()}/passwordRecover/params?id=${userExist._id}&token=${token}`



                const data = await resend.emails.send({
                    from: 'AKVO-ESG <notification@akvo-esg.com.br>',
                    to: [userExist.email],
                    subject: 'Recuperação de senha',
                    react: RecoverPasswordEmail({ firstName: userExist.firstName, link: link }),
                });

                console.log(data)

                if (!data) {
                    res.status(400).json({ error: "Não foi possível redefinir a senha" })
                } else {
                    res.status(200).json({ message: "Token email sent" })
                }

            }

        }



    }




})