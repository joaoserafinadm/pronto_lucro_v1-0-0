import { connect } from '../../../utils/db'
import { ObjectId } from 'bson'
import crypto from 'crypto'
import baseUrl from '../../../utils/baseUrl';
import { Resend } from 'resend';
import {RecoverPasswordEmail} from '../../../src/emails/RecoverPasswordEmail'

const resend = new Resend(process.env.RESEND_API_KEY);


export default async function (req, res) {

    if (req.method === 'POST') {

        const { email } = req.body

        if (!email) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ email: email })

            if (!userExist) {
                res.status(400).json({ error: "Usuário não cadastrado" })
            } else {

                const token = crypto.randomBytes(20).toString('hex')

                const now = new Date()
                now.setHours(now.getHours() + 1)

                await db.collection('users').updateOne({ _id: ObjectId(userExist._id) }, {
                    '$set': {
                        passwordResetToken: token,
                        passwordResetExpires: now
                    }
                })

                const link = `${baseUrl()}/passwordRecover/params?id=${userExist._id}&token=${token}`


                const data = await resend.emails.send({
                    from: 'AKVO-ESG <notification@akvo-esg.com.br>',
                    to: [email],
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


}