import { connect } from '../../../utils/db'
import bcrypt from 'bcrypt'
import { ObjectId } from 'bson'
import baseUrl from '../../../utils/baseUrl'
import { dateObject } from '../../../utils/handleDate'

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
                    incomeTags: incomeTags,
                    expenseTags: expenseTags,
                    passwordResetToken: '',
                    passwordResetExpires: '',
                    accessCount: 0,
                    active: true,
                    deleted: false,
                    notifications: notifications,
                    history: [],
                    dre: [],
                    dfc: [],
                    bankAccounts: bankAccounts
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



const incomeTags = [
    {
        _id: new ObjectId(),
        category: 'Vendas e Receitas',
        tag: 'Vendas na Loja Física',
        color: '#1E90FF', // DodgerBlue
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Vendas e Receitas',
        tag: 'Vendas Online',
        color: '#32CD32', // LimeGreen
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Vendas e Receitas',
        tag: 'Vendas por Redes Sociais',
        color: '#FFA500', // Orange
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Vendas e Receitas',
        tag: 'Receita de Assinaturas',
        color: '#8A2BE2', // BlueViolet
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Serviços',
        tag: 'Consultoria',
        color: '#FF4500', // OrangeRed
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Serviços',
        tag: 'Suporte Técnico',
        color: '#00CED1', // DarkTurquoise
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Serviços',
        tag: 'Design Gráfico',
        color: '#FFD700', // Gold
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Investimentos',
        tag: 'Investimentos de Sócios',
        color: '#6A5ACD', // SlateBlue
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Investimentos',
        tag: 'Venda de Ações',
        color: '#DC143C', // Crimson
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outros Recebimentos',
        tag: 'Juros de Aplicações Financeiras',
        color: '#7CFC00', // LawnGreen
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outros Recebimentos',
        tag: 'Aluguéis Recebidos',
        color: '#FF69B4', // HotPink
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Subvenções e Subsídios',
        tag: 'Subsídios Governamentais',
        color: '#20B2AA', // LightSeaGreen
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Empréstimos e Financiamentos',
        tag: 'Empréstimos Bancários',
        color: '#B22222', // FireBrick
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outros Recebimentos',
        tag: 'Reembolsos',
        color: '#00FF7F', // SpringGreen
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outros Recebimentos',
        tag: 'Royalties',
        color: '#4682B4', // SteelBlue
        textColor: 'white',
        icon: '',
    }
];



const expenseTags = [
    {
        _id: new ObjectId(),
        category: 'Custos de Operação',
        tag: 'Salários e Benefícios',
        color: '#FF6347', // Tomato
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Custos de Operação',
        tag: 'Aluguel de Imóveis',
        color: '#8B0000', // DarkRed
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Custos de Operação',
        tag: 'Energia Elétrica',
        color: '#FF4500', // OrangeRed
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Custos de Operação',
        tag: 'Água e Esgoto',
        color: '#CD5C5C', // IndianRed
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Marketing e Publicidade',
        tag: 'Publicidade Online',
        color: '#FF8C00', // DarkOrange
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Marketing e Publicidade',
        tag: 'Publicidade Offline',
        color: '#DAA520', // GoldenRod
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Marketing e Publicidade',
        tag: 'Eventos e Patrocínios',
        color: '#FFA07A', // LightSalmon
        textColor: 'black',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Investimentos em Tecnologia',
        tag: 'Software e Licenças',
        color: '#8B4513', // SaddleBrown
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Investimentos em Tecnologia',
        tag: 'Equipamentos de TI',
        color: '#A52A2A', // Brown
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outras Despesas',
        tag: 'Consultoria Externa',
        color: '#556B2F', // DarkOliveGreen
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outras Despesas',
        tag: 'Taxas Bancárias',
        color: '#6B8E23', // OliveDrab
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Tributos e Impostos',
        tag: 'Imposto de Renda',
        color: '#4682B4', // SteelBlue
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Tributos e Impostos',
        tag: 'Contribuições Sociais',
        color: '#4169E1', // RoyalBlue
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outras Despesas',
        tag: 'Reparos e Manutenção',
        color: '#696969', // DimGray
        textColor: 'white',
        icon: '',
    },
    {
        _id: new ObjectId(),
        category: 'Outras Despesas',
        tag: 'Despesas Jurídicas',
        color: '#708090', // SlateGray
        textColor: 'white',
        icon: '',
    }
];


