import { ObjectId } from "bson"
import { connect } from "../../../utils/db"
import cookie from 'cookie'
import { sign } from 'jsonwebtoken'


export default async (req, res) => {

    if (req.method === 'POST') {

        const { consToken, consId, companyId } = req.body


        if (!consToken && !consId && !companyId) {

            res.status(400).json({ error: 'Missing body parameter' })

        } else {

            const { db } = await connect()

            const companyExist = await db.collection('companies').findOne({ _id: ObjectId(companyId) })

            if (!companyExist) {
                res.status(400).json({ error: 'Company doesnt exist' })
            } else {

                const consultantIncluded = companyExist.consultores.includes(consId)


                const consultantExist = await db.collection('consultants').findOne({ _id: ObjectId(consId) })


                if (!consultantIncluded) {
                    res.status(400).json({ error: 'Consultant doesnt exist' })
                } else {

                    if (companyExist.consultantAuthToken && companyExist.consultantAuthToken !== consToken) {
                        return res.status(400).json({ error: 'Invalid token' })
                    } else {


                        const response = await db.collection('companies').updateOne(
                            { _id: ObjectId(companyId) },
                            { $set: { consultantAuthToken: '' } }
                        )

                        const clains = {
                            sub: consultantExist._id,
                            firstName: consultantExist.firstName,
                            lastName: consultantExist.lastName,
                            company_id: companyId,
                            profileImageUrl: consultantExist.profileImageUrl,
                            permissions: false,
                            userStatus: 'consultant',
                            dateLimit: false,
                            userConfig: companyExist.userConfig,
                            tools: companyExist.tools ? companyExist.tools : {
                                geeCalculator: false,
                                geeAgro: false,
                                esgIndicators: false,
                                pcaf: false
                            },
                            companyLogo: companyExist.profileImageUrl ? companyExist.profileImageUrl : '',
                            active: consultantExist.active
                        }


                        const jwt = sign(clains, process.env.JWT_SECRET, {})

                        const authResponse = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                            httpOnly: false,
                            secure: process.env.NODE_ENV !== true, //em produção usar true
                            sameSite: 'strict',
                            path: '/',
                        }))

                        res.status(200).json({ message: 'redirecting' })


                    }

                }
            }




        }


    }

}