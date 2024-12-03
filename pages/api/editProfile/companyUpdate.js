import { connect } from '../../../utils/db';
import { verify, sign } from 'jsonwebtoken';
import { ObjectId } from 'bson';
import cookie from 'cookie';

const authenticated = (fn) => async (req, res) => {
    try {
        verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
            if (err || !decoded) {
                throw new Error('You are not authenticated.');
            }
            await fn(req, res);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default authenticated(async (req, res) => {

    try {

        if (req.method === "PATCH") {

            const { token, user_id, ...companyData } = req.body


            if (!token || !user_id || !companyData) {

                res.status(400).json({ error: "Missing parameters on request body" })

            } else {

                const { db } = await connect()

                const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

                if (!userExist) {
                    res.status(400).json({ error: "Company or user does not exist" })

                } else {

                    const result = await db.collection('users').updateOne(
                        { _id: new ObjectId(user_id) },
                        { $set: companyData }
                    );

                    if (result.matchedCount) {
                        const clains = {
                            ...token,
                            companyName: companyData.companyName,
                            companyLogo: companyData.companyLogo.url ? companyData.companyLogo.url : companyData.companyLogo,
                        };

                        const jwt = sign(clains, process.env.JWT_SECRET, {});
                        const cookieOptions = {
                            httpOnly: false,
                            secure: process.env.NODE_ENV !== 'production', // Use true in production
                            sameSite: 'strict',
                            path: '/',
                            maxAge: 31536000,
                        };
                        const response2 = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, cookieOptions));


                        res.status(200).json({ message: "Company updated" })
                    } else {
                        res.status(400).json({ error: "Cant update company" })
                    }
                }
            }


        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }





})