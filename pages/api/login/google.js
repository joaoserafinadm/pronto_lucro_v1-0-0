import bcrypt from 'bcrypt'
import { connect } from '../../../utils/db'
import { ObjectId, ObjectID } from 'bson'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import { dateObject } from '../../../utils/handleDate'


export default async (req, res) => {

    if (req.method === 'POST') {

        const { user } = req.body

        if (!user) {
            res.status(400).json({ error: 'Missing body parameters.' });
        } else {

            const { db } = await connect();

            const userExists = await db.collection('users').findOne({ email: user.email });

            if (!userExists) {


                Date.prototype.addDays = function (days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                };

                let date = new Date();

                const notifications = [
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
                        button: 'Meu perfil',
                        link: `https://app.prontolucro.com.br/editProfile`,
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





                const { insertedId: userId } = await db.collection('users').insertOne({
                    firstName: user.name.split(' ')[0],
                    lastName: user.name.split(' ')[user.name.split(' ').length - 1],
                    cpf: '',
                    email: user.email,
                    celular: '',
                    cep: '',
                    logradouro: '',
                    numero: '',
                    cidade: '',
                    estado: '',
                    userStatus: 'admGlobal',
                    profileImageUrl: {
                        id: '',
                        url: user.image
                    },
                    password: 'google',
                    permissions: {},
                    tools: {
                        dfc: true,
                        dre: false
                    },
                    dateAdd: new Date(),
                    dateLimit: date.addDays(7),
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

                // Recupera o documento do usuário recém-criado
                const newUser = await db.collection('users').findOne({ _id: userId });

                if (userId) {

                    // Constrói os claims com os dados completos
                    const clains = {
                        sub: newUser._id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        profileImageUrl: newUser.profileImageUrl?.url ? newUser.profileImageUrl?.url : newUser.profileImageUrl,
                        dateLimit: newUser.dateLimit,
                        active: newUser.active,
                        companyLogo: newUser.companyData?.companyLogo?.url ? newUser.companyData?.companyLogo?.url : '',
                        companyName: newUser.companyName,
                        tools: newUser.tools

                    }

                    const jwt = sign(clains, process.env.JWT_SECRET, {})

                    const response = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV !== 'production', //em produção usar true
                        sameSite: 'strict',
                        path: '/',
                        maxAge: 31536000
                    }))

                    res.status(200).json({ message: "User registered" });
                }




            } else {


                const clains = {
                    sub: userExists._id,
                    firstName: userExists.firstName,
                    lastName: userExists.lastName,
                    profileImageUrl: userExists?.profileImageUrl?.url ? userExists?.profileImageUrl?.url : userExists?.profileImageUrl,
                    dateLimit: userExists.dateLimit,
                    active: userExists.active,
                    companyLogo: userExists?.companyData?.companyLogo?.url ? userExists?.companyData?.companyLogo?.url : '',
                    companyName: userExists.companyName,
                    tools: userExists.tools

                }

                const jwt = sign(clains, process.env.JWT_SECRET, {})

                const response = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV !== 'production', //em produção usar true
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 31536000
                }))


                res.status(200).json({ message: "User registered" });
            }


        }




    }





}