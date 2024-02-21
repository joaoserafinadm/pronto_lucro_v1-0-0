import bcrypt from 'bcrypt'
import { connect } from '../../../utils/db'
import { ObjectID } from 'bson'
import { verify, sign } from 'jsonwebtoken'
import cookie from 'cookie'
import { ObjectId } from 'bson'
import { OAuth2Client } from 'google-auth-library';
import { getToken, decode } from 'next-auth/jwt'
import baseUrl from '../../../utils/baseUrl'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticated = fn => async (req, res) => {
    try {

        // Verifica se o token CSRF está presente nos cookies
        const csrfToken = req.cookies[baseUrl() === 'http://localhost:3000' ? 'next-auth.session-token' :  '__Secure-next-auth.session-token'];
        // const csrfToken = req.cookies['next-auth.session-token'];
        if (!csrfToken) {
            res.status(401).json({ message: 'Unauthorized: Missing CSRF token.' });
            return;
        }
        
        // Obtém o token de autenticação
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        // res.status(401).json({ message: token });

        // Verifica a autenticidade do token CSRF com o cliente do Google
        const ticket = await client.verifyIdToken({
            idToken: token.accessToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userid = payload['sub'];

        // Se o usuário estiver autenticado com sucesso, chama a função desejada
        if (userid) {
            return await fn(req, res);
        } else {
            res.status(401).json({ message: 'Unauthorized: Invalid Google CSRF token.' });
        }
    } catch (error) {
        console.error('Error verifying Google token:', error.message);
        res.status(500).json({ message: error.message });
    }
};



export default authenticated(async (req, res) => {

    if (req.method === 'POST') {

        const { name, email, image } = req.body

        console.log(name, email, image)

        if (!email) {
            res.status(400).json({ error: 'Missing body parameters.' })
        } else {

            const { db } = await connect()

            const userExists = await db.collection('users').findOne({ email: email })

            if (!userExists) {

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
                        link: `https://consultant.akvo-esg.com/tutorials`,
                        imageUrl: 'https://res.cloudinary.com/dzyycalog/image/upload/v1706015477/ICONS/tpo8pb6rj5klywt6yeyk.png',
                        user_id: '',
                        checked: false
                    },
                    {
                        _id: ObjectId(),
                        dateAdded: new Date(),
                        subject: 'star',
                        text: "Configure o seu perfil.",
                        link: `https://consultant.akvo-esg.com/profileEdit`,
                        imageUrl: 'https://res.cloudinary.com/dzyycalog/image/upload/v1706015477/ICONS/u9tgpbqujw4wcp1y39av.png',
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

                const firstName = name.split(' ')[0]
                const lastName = name.split(' ').slice(1).join(' ')


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
                    profileImageUrl: image,
                    password: 'google',
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



                const clains = {
                    sub: newUser.insertedId.toString(),
                    firstName: firstName,
                    lastName: lastName,
                    company_id: newCompany.insertedId.toString(),
                    profileImageUrl: image,
                    permissions: false,
                    userStatus: 'admGlobal',
                    dateLimit: date.addDays(8),
                    userConfig: 'basico',
                    tools: {
                        geeCalculator: true,
                        esgIndicators: false,
                        pcaf: false
                    },
                    companyLogo: '',
                    companyName: '',
                    active: true
                }

                const jwt = sign(clains, process.env.JWT_SECRET, {})

                const response = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV !== 'production', //em produção usar true
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 31536000
                }))

                await db.collection('users').updateOne({ _id: ObjectID(userExists._id) },
                    {
                        $inc: {
                            accessCount: 1
                        }
                    })
                res.status(200).json({ message: 'Ok' })


            }


            else if (userExists) {

                const companyExist = await db.collection('companies').findOne(ObjectID(userExists.company_id))


                if (userExists.active && (!userExists.dateLimit || userExists.dateLimit.toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10))) {
                    const clains = {
                        sub: userExists._id,
                        firstName: userExists.firstName,
                        lastName: userExists.lastName,
                        company_id: userExists.company_id,
                        profileImageUrl: userExists.profileImageUrl,
                        permissions: userExists.permissions,
                        userStatus: userExists.userStatus,
                        dateLimit: userExists.dateLimit,
                        userConfig: companyExist.userConfig,
                        tools: companyExist.tools ? companyExist.tools : {
                            geeCalculator: false,
                            geeAgro: false,
                            esgIndicators: false,
                            pcaf: false
                        },
                        companyLogo: companyExist.profileImageUrl ? companyExist.profileImageUrl : '',
                        companyName: companyExist.companyName ? companyExist.companyName : '',
                        active: userExists.active
                    }

                    const jwt = sign(clains, process.env.JWT_SECRET, {})

                    const response = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV !== 'production', //em produção usar true
                        sameSite: 'strict',
                        path: '/',
                        maxAge: 31536000
                    }))

                    await db.collection('users').updateOne({ _id: ObjectID(userExists._id) },
                        {
                            $inc: {
                                accessCount: 1
                            }
                        })
                    res.status(200).json({ message: 'Ok' })
                }

                else {



                    await db.collection('users').updateOne(
                        { "_id": ObjectID(userExists._id) },
                        {
                            $set: { "active": false }
                        })
                    res.status(404).json({ error: 'conta expirou.' })
                }




            }
        }





    }

})