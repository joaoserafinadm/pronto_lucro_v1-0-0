import bcrypt from 'bcrypt'
import { connect } from '../../../utils/db'
import { Code } from 'bson'
import randomPassword from '../../../utils/randomPassword'
import { Resend } from 'resend';
import { AuthEmail } from '../../../src/emails/AuthEmail';


const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {


    if (req.method === "POST") {

        const { email, firstName } = req.body

        console.log( email, firstName)

        if (!email || !firstName) {

            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const emailExists = await db.collection('users').findOne({ email })

            if (emailExists) {

                res.status(400).json({ error: "User already exists" })
            } else {

                const code = randomPassword(5)

                const saltCode = await bcrypt.genSalt(10)
                const secureCode = await bcrypt.hash(code, saltCode)

                const data = await resend.emails.send({
                    from: 'Autenticação <autenticacao@akvo-esg.com.br>',
                    to: [email],
                    subject: 'AKVO-ESG',
                    react: AuthEmail({ firstName: firstName, code }),
                });

                res.status(200).json({ secureCode })


            }

        }


    } else {
        res.status(400).json({ error: 'Wrong request method' })
    }
  

}