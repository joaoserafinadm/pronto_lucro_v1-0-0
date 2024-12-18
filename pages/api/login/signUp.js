import { connect } from '../../../utils/db'
import bcrypt from 'bcrypt'
import { ObjectId } from 'bson'
import baseUrl from '../../../utils/baseUrl'
import { dateObject } from '../../../utils/handleDate'
import { exempleTags } from '../../../src/tags/tags'

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

                const notifications =
                    [
                        {
                            _id: ObjectId(),
                            dateAdded: new Date(),
                            subject: 'star',
                            title: "Aprenda a usar a plataforma!",
                            message: "Clique no botão abaixo para acessar a página de tutoriais.",
                            link: `https://app.prontolucro.com.br/tutorials`,
                            button: 'Tutoriais',
                            imageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1693963692/PUBLIC/TEMPLATE_IMG_shcaor.png',
                            user_id: '',
                            checked: false
                        },
                        {
                            _id: ObjectId(),
                            dateAdded: new Date(),
                            subject: 'star',
                            title: "Configure o seu perfil!",
                            message: "Mantenha seu perfil sempre atualizado para análises mais acertivas.",
                            link: `https://app.prontolucro.com.br/profileEdit`,
                            imageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1692760589/PUBLIC/user_template_ocrbrg.png',
                            user_id: '',
                            checked: false
                        }
                    ]


                const bankAccounts = [
                    {
                        "_id": new ObjectId(),
                        "bankSelected": {
                            "id": "1",
                            "name": "Carteira",
                            "legalName": "Carteira",
                            "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723513994/PRONTO%20LUCRO/PUBLIC/rvfp6bsncja0my1mkynp.png",
                            "keyWord": "intermedium",
                            "active": true,
                            "dataCriacao": "2020-05-20T16:29:20.473",
                            "dataModificacao": "2020-05-20T16:29:20.473",
                            "countries": [
                                "BR"
                            ],
                            "institutionType": [
                                "checking_account",
                                "savings_account"
                            ],
                            "ranking": 1
                        },
                        "color": "#333333",
                        "initialValue": 0,
                        "description": "Carteira",
                        "valueSum": true,
                        "creditCard": false,
                        "creditLimit": 0,
                        "creditNetwork": null,
                        "diaFechamento": 1,
                        "diaLancamento": 5,
                        "active": true,
                        "date": dateObject(new Date())
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
                    userStatus: 'admGlobal',
                    profileImageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1713399957/PRONTO%20LUCRO/PUBLIC/sl5olrvacnox9u1c1z39.png',
                    password: securePassword,
                    permissions: {
                        dfc: true,
                        dre: false
                    },
                    dateAdd: new Date(),
                    dateLimit: date.addDays(8),
                    incomeCategories: [],
                    expenseCategories: [],
                    passwordResetToken: '',
                    passwordResetExpires: '',
                    accessCount: 0,
                    active: true,
                    deleted: false,
                    notifications: notifications,
                    history: [],
                    dre: [],
                    dfc: [],
                    bankAccounts: bankAccounts,
                    initialTutorial: true
                })

                if (newUser.insertedId) {
                    res.status(200).json({ message: "User registered" })
                } else {
                    res.status(400).json({ error: "Trouble in connect to database" })

                }



            }

        }



    }

}
