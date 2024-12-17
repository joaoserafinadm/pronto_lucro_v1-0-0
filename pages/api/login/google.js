import bcrypt from 'bcrypt'
import { connect } from '../../../utils/db'
import { ObjectId, ObjectID } from 'bson'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import { dateObject } from '../../../utils/handleDate'
import notifications from './notifications'
import bankAccounts from './bankAccounts'


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
                    permissions: {
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
                    notifications: notifications(),
                    history: [],
                    dre: [],
                    dfc: [],
                    bankAccounts: bankAccounts(),
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
                        profileImageUrl: newUser.profileImageUrl.url ? newUser.profileImageUrl.url : newUser.profileImageUrl,
                        dateLimit: newUser.dateLimit,
                        active: newUser.active,
                        companyLogo: newUser.companyData?.companyLogo?.url ? newUser.companyData?.companyLogo?.url : '',
                        companyName: newUser.companyName
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
                    companyName: userExists.companyName
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