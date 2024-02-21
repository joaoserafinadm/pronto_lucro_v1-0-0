import { connect } from '../../../utils/db'
import { verify, sign } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'
import cookie from 'cookie'
import baseUrl from '../../../utils/baseUrl'
import bcrypt from 'bcrypt'
import randomPassword from '../../../utils/randomPassword'
import { Resend } from 'resend';
import { newUserEmail } from '../../../src/emails/newUserEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

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

        const { company_id } = req.query

        if (!company_id) {
            res.status(400).json({ message: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(company_id) })

            if (!companyExist) {

                res.status(400).json({ error: "Company does not exist" })

            } else {

                const users = await db.collection('users').find({ company_id })
                    .project({
                        firstName: 1,
                        lastName: 1,
                        profileImageUrl: 1
                    }).toArray()

                const groups = companyExist.groups

                const unidades = companyExist.unidades
                    .filter(elem => elem.active)
                    .map(elem => ({
                        unidName: elem.unidName,
                        group: elem.group,
                        cidade: elem.cidade,
                        estado: elem.estado,
                        group: elem.group,
                        responsavel: elem.responsavel_id,
                        active: elem.active,
                        deleted: elem.deleted
                    }))



                res.status(200).json({ users, unidades, groups })

            }
        }

    }




    else if (req.method === "POST") {

        const { company_id, user_id, firstName, lastName, email, userStatus } = req.body

        if (!company_id || !user_id || !firstName || !email || !userStatus) {
            res.status(400).json({ message: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(company_id) })
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })
            const newUserExist = await db.collection('users').findOne({ email })

            if (!companyExist || !userExist) {

                res.status(400).json({ error: "Company or user does not exist" })

            } else {

                if (newUserExist) {
                    res.status(400).json({ error: "User already exists" })
                } else {


                    const password = randomPassword()

                    const saltPassword = await bcrypt.genSalt(10)
                    const securePassword = await bcrypt.hash(password, saltPassword)

                    const notifications = [
                        {
                            _id: ObjectId(),
                            dateAdded: new Date(),
                            subject: 'star',
                            text: "Bem vindo à plataforma AKVO-ESG! Clique aqui para conhecer a plataforma!",
                            link: `${baseUrl()}/tutorials`,
                            imageUrl: 'https://res.cloudinary.com/akvoesg/image/upload/v1706015477/ICONS/tpo8pb6rj5klywt6yeyk.png',
                            user_id: '',
                            checked: false
                        },
                        {
                            _id: ObjectId(),
                            dateAdded: new Date(),
                            subject: 'star',
                            text: "Configure o seu perfil.",
                            link: `${baseUrl()}/editProfile`,
                            imageUrl: 'https://res.cloudinary.com/akvoesg/image/upload/v1706015477/ICONS/u9tgpbqujw4wcp1y39av.png',
                            user_id: '',
                            checked: false
                        }
                    ]

                    const newUser = await db.collection('users').insertOne({
                        firstName: firstName,
                        lastName: lastName,
                        cpf: '',
                        email: email,
                        celular: '',
                        cep: '',
                        logradouro: '',
                        numero: '',
                        cidade: '',
                        estado: '',
                        company_id: company_id,
                        userStatus: userStatus,
                        profileImageUrl: 'https://res.cloudinary.com/co2blue/image/upload/v1618519160/co2blue_profile_images/user_template_d4xng3.png',
                        password: securePassword,
                        permissions: false,
                        dateAdd: new Date(),
                        dateLimit: false,
                        dateUpdated: '',
                        passwordResetToken: '',
                        passwordResetExpires: '',
                        accessCount: 0,
                        active: true,
                        deleted: false,
                        notifications: notifications,
                        history: []
                    })

                    // const statusName = userStatus === 'admGlobal' ? 'Administrador' : userStatus === 'user' ? 'Usuário' : userStatus === 'consultor' ? 'Consultor' : userStatus === 'auditor' ? 'Auditor' : 'Administrador'


                    if (newUser.insertedId) {

                        const data = await resend.emails.send({
                            from: 'Bem vindo à Plataforma AKVO-ESG! 🎉 <notificacao@akvo-esg.com.br>',
                            to: [email],
                            subject: 'AKVO-ESG',
                            react: newUserEmail({ firstName: firstName, email: email, password: password, companyName: companyExist.companyName, userName: userExist.firstName, userEmail: userExist.email }),
                        });


                        res.status(200).json({ message: "User registered" })

                    } else {
                        res.status(400).json({ error: "Trouble in connect to database" })

                    }

                }
            }
        }


    } else {

        res.status(400).json({ error: 'Wrong request method' })

    }



})