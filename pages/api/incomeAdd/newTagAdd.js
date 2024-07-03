import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
import cookie from 'cookie';
import { maskMoneyNumber } from '../../../utils/mask';
import { dateObject } from '../../../utils/handleDate';

// Middleware para autenticação
const authenticated = fn => async (req, res) => {
    try {
        const token = req.cookies.auth;
        if (!token) {
            return res.status(401).json({ message: 'No authentication token found.' });
        }

        verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || !decoded) {
                return res.status(401).json({ message: 'You are not authenticated.' });
            }
            return await fn(req, res);
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Função principal para lidar com a requisição
const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { user_id, newTag } = req.body;

    if (!user_id || !newTag) {
        return res.status(400).json({ error: "Missing parameters in request body." });
    }

    try {
        const { db } = await connect();
        const user = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!user) {
            return res.status(404).json({ error: "User doesn't exist." });
        }

        const newTagData = {
            ...newTag,
            _id: new ObjectId()
        };

        await db.collection('users').updateOne(
            { _id: new ObjectId(user_id) },
            {
                $push: {
                    tags: {
                        $each: [newTagData],
                        $position: 0
                    }
                }
            }
        );

        res.status(200).json(newTagData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// Exportando a função handler com autenticação
export default authenticated(handler);
