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
        const { method } = req;

        if (method === 'GET') {
            const { user_id } = req.query;

            if (!user_id) {
                res.status(400).json({ error: 'Missing parameters in the request body.' });
                return;
            }

            const { db } = await connect();
            const userExist = await db.collection('users').findOne(
                { _id: ObjectId(user_id) },
                {
                    projection: {
                        firstName: 1,
                        lastName: 1,
                        cpf: 1,
                        cidade: 1,
                        estado: 1,
                        email: 1,
                        celular: 1,
                        profileImageUrl: 1,
                    },
                });

            if (!userExist) {
                res.status(400).json({ error: 'User does not exist.' });
            } else {
                res.status(200).json(userExist);
            }
        } else if (method === 'PATCH') {
            const updateObject = req.body;
            const { token, user_id, ...profileInfos } = updateObject;
            const { db } = await connect();
            await db.collection('users').updateOne({ _id: ObjectId(user_id) }, { $set: profileInfos });

            const clains = {
                ...token,
                firstName: profileInfos.firstName,
                lastName: profileInfos.lastName,
                profileImageUrl: profileInfos.profileImageUrl,
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
            res.status(200).json({ message: 'Profile Updated.' });
        } else {
            res.status(400).json({ error: 'Wrong request method.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
