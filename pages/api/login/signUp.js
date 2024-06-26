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
                        text: "Bem vindo à Pronto Lucro! Clique aqui para conhecer a plataforma!",
                        link: `${baseUrl()}/tutorials`,
                        imageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1693963692/PUBLIC/TEMPLATE_IMG_shcaor.png',
                        user_id: '',
                        checked: false
                    },
                    {
                        _id: ObjectId(),
                        dateAdded: new Date(),
                        subject: 'star',
                        text: "Configure o seu perfil.",
                        link: `${baseUrl()}/profileEdit`,
                        imageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1692760589/PUBLIC/user_template_ocrbrg.png',
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
                    userStatus: 'admGlobal',
                    profileImageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1713399957/PRONTO%20LUCRO/PUBLIC/sl5olrvacnox9u1c1z39.png',
                    password: securePassword,
                    permissions: {
                        dfc: true,
                        dre: false
                    },
                    dateAdd: new Date(),
                    dateLimit: date.addDays(8),
                    tags: tags,
                    passwordResetToken: '',
                    passwordResetExpires: '',
                    accessCount: 0,
                    active: true,
                    deleted: false,
                    notifications: notifications,
                    history: [],
                    dre: [],
                    dfc: []
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



const tags = [
    {
        _id: new ObjectId(),
        type: 'Vendas e Receitas',
        description: 'Vendas na Loja Física',
        color: '#1E90FF', // DodgerBlue
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Vendas e Receitas',
        description: 'Vendas Online',
        color: '#32CD32', // LimeGreen
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Vendas e Receitas',
        description: 'Vendas por Redes Sociais',
        color: '#FFA500', // Orange
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Vendas e Receitas',
        description: 'Receita de Assinaturas',
        color: '#8A2BE2', // BlueViolet
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Serviços',
        description: 'Consultoria',
        color: '#FF4500', // OrangeRed
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Serviços',
        description: 'Suporte Técnico',
        color: '#00CED1', // DarkTurquoise
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Serviços',
        description: 'Design Gráfico',
        color: '#FFD700', // Gold
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Investimentos',
        description: 'Investimentos de Sócios',
        color: '#6A5ACD', // SlateBlue
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Investimentos',
        description: 'Venda de Ações',
        color: '#DC143C', // Crimson
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Outros Recebimentos',
        description: 'Juros de Aplicações Financeiras',
        color: '#7CFC00', // LawnGreen
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Outros Recebimentos',
        description: 'Aluguéis Recebidos',
        color: '#FF69B4', // HotPink
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Subvenções e Subsídios',
        description: 'Subsídios Governamentais',
        color: '#20B2AA', // LightSeaGreen
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Empréstimos e Financiamentos',
        description: 'Empréstimos Bancários',
        color: '#B22222', // FireBrick
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Outros Recebimentos',
        description: 'Reembolsos',
        color: '#00FF7F', // SpringGreen
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        type: 'Outros Recebimentos',
        description: 'Royalties',
        color: '#4682B4', // SteelBlue
        textColor: 'white',
        icon: '',
    }
];


