import { connect } from '../../../utils/db'
import { verify, sign } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'
import cookie from 'cookie'


const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    })
}

export default authenticated(async (req, res) => {

    if (req.method === 'GET') {

        const { company_id } = req.query

        if (!company_id) {
            res.status(400).json({ error: 'Missing parameters on request body' })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne(
                { _id: ObjectId(company_id) },
                {
                    projection: {
                        companyName: 1,
                        cnpjPrincipal: 1,
                        blocoProdutorRural: 1,
                        cep: 1,
                        logradouro: 1,
                        numero: 1,
                        cidade: 1,
                        estado: 1,
                        responsavel: 1,
                        email: 1,
                        profileImageUrl: 1
                    }
                }
            );


            if (!companyExist) {
                res.status(400).json({ error: 'Company does not exist' })
            } else {
                res.status(200).json(companyExist)
            }
        }


    } if (req.method === "PATCH") {

        const {
            token,
            company_id,
            companyName,
            profileImageUrl,
            user_id,
            cnpjPrincipal,
            blocoProdutorRural,
            cep,
            logradouro,
            numero,
            cidade,
            estado,
            responsavel,
            email
        } = req.body

        if (!company_id || !user_id || !companyName || (!cnpjPrincipal && !blocoProdutorRural) || !responsavel || !email || !cidade || !estado) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(company_id) })
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!companyExist || !userExist) {

                res.status(400).json({ error: "Company or user do not exist" })

            } else {

                const updateData = {
                    company_id,
                    companyName,
                    profileImageUrl,
                    user_id,
                    cnpjPrincipal,
                    blocoProdutorRural,
                    cep,
                    logradouro,
                    numero,
                    cidade,
                    estado,
                    responsavel,
                    email
                };

                const response = await db.collection("companies").updateOne(
                    { _id: ObjectId(company_id) },
                    { $set: updateData }
                )

                if (!response.matchedCount) {

                    res.status(400).json({ error: "Cant update company" })

                } else {

                    const clains = {
                        ...token,
                        companyName: companyName,
                        companyLogo: profileImageUrl,
                    }

                    const jwt = sign(clains, process.env.JWT_SECRET, {})

                    const response2 = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV !== "production", //em produção usar true
                        sameSite: 'strict',
                        maxAge: 31536000,
                        path: '/'
                    }))


                    res.status(200).json({ message: "Company updated" })
                }

            }



        }
    }



})