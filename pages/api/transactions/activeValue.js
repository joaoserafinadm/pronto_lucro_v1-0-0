import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';

const authenticated = (fn) => async (req, res) => {
    const token = req.cookies?.auth;

    if (!token) {
        return res.status(401).json({ message: 'You are not authenticated.' });
    }

    verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({ message: 'Invalid authentication token.' });
        }
        return await fn(req, res);
    });
};

export default authenticated(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user_id, income_id, value, dateSelected } = req.body;

    if (!user_id || !income_id || !dateSelected?.year || !dateSelected?.month) {
        return res.status(400).json({ error: 'Missing parameters on request body' });
    }

    const { db } = await connect();

    try {
        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            return res.status(400).json({ error: "User doesn't exist." });
        }

        // Atualizar SOMENTE o item correto dentro do dfc.data
        const result = await db.collection('users').updateOne(
            {
                _id: new ObjectId(user_id),
                "dfc.year": dateSelected.year,
                "dfc.month": dateSelected.month,
                "dfc.data._id": new ObjectId(income_id) // Filtra o item exato dentro de "data"
            },
            {
                $set: {
                    "dfc.$[dfcElem].data.$[dataElem].active": true,
                    "dfc.$[dfcElem].data.$[dataElem].value": value
                }
            },
            {
                arrayFilters: [
                    { "dfcElem.year": dateSelected.year, "dfcElem.month": dateSelected.month },
                    { "dataElem._id": new ObjectId(income_id) }
                ]
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Income record not found' });
        }

        return res.status(200).json({ message: 'Data updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
