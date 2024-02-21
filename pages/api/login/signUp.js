import { connect } from '../../../utils/db'
import bcrypt from 'bcrypt'
import { ObjectId } from 'bson'
import baseUrl from '../../../utils/baseUrl'

export default async function (req, res) {

    if (req.method === 'POST') {

        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ error: 'Missing body parameters.' })
        } else {

            const { db } = await connect()

            const userExists = await db.collection('users').findOne({ email: email })

            if (userExists) {
                res.status(400).json({ error: 'User already exists.' })
            } else {

                const saltPassword = await bcrypt.genSalt(10)
                const securePassword = await bcrypt.hash(password, saltPassword)

                Date.prototype.addDays = function (days) {

                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }

                let date = new Date()


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
                        link: `${baseUrl()}/profileEdit`,
                        imageUrl: 'https://res.cloudinary.com/akvoesg/image/upload/v1706015477/ICONS/u9tgpbqujw4wcp1y39av.png',
                        user_id: '',
                        checked: false
                    }
                ]



                const newCompany = await db.collection('companies').insertOne({
                    companyName: '',
                    cnpjPrincipal: '',
                    blocoProdutorRural: '',
                    cep: '',
                    logradouro: '',
                    numero: '',
                    cidade: '',
                    estado: '',
                    responsavel: '',
                    email: '',
                    unidades: [],
                    userConfig: 'basico',
                    active: true,
                    profileImageUrl: '',
                    dateAdded: new Date(),
                    dateUpdate: '',
                    notifications: [],
                    inventories: [],
                    metas: [],
                    groups: [],
                    esgForms: [],
                    esgMetas: [],
                    tools: {
                        geeCalculator: true,
                        esgIndicators: false,
                        pcaf: false
                    },
                    consultores: [],
                    consultantAuthToken: ''
                })


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
                    company_id: newCompany.insertedId.toString(),
                    userStatus: 'admGlobal',
                    profileImageUrl: 'https://res.cloudinary.com/co2blue/image/upload/v1618519160/co2blue_profile_images/user_template_d4xng3.png',
                    password: securePassword,
                    permissions: false,
                    dateAdd: new Date(),
                    dateLimit: date.addDays(8),
                    dateUpdated: '',
                    passwordResetToken: '',
                    passwordResetExpires: '',
                    accessCount: 0,
                    active: true,
                    deleted: false,
                    notifications: notifications,
                    history: []

                })

                if (newCompany.insertedId && newUser.insertedId) {
                    res.status(200).json({ message: "User registered" })
                } else {
                    res.status(400).json({ error: "Trouble in connect to database" })

                }



            }

        }



    }

}


