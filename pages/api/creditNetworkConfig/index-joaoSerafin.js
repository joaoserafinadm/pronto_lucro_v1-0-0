import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
import cookie from 'cookie';
import { maskMoneyNumber } from '../../../utils/mask';
import { dateObject } from '../../../utils/handleDate';

const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    });
};

export default authenticated(async (req, res) => {


    if (req.method === 'GET') {

        const { user_id } = req.query

        if (!user_id) return res.status(400).json({ error: 'Missing parameters on request body' })

        try {
            const { db } = await connect()
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) return res.status(400).json({ error: 'User does not exist' })

            const { creditNetworkTaxes } = userExist

            if (!creditNetworkTaxes) {
                await db.collection('users').updateOne(
                    { _id: ObjectId(user_id) },
                    { $set: { creditNetworkTaxes: config } }
                )
                return res.status(200).json(config)
            }

            return res.status(200).json(creditNetworkTaxes)

        } catch (e) {
            console.error(e)
            return res.status(500).json({ error: 'Internal server error' })
        }
    } else if (req.method === 'PATCH') {

        const { user_id, creditNetworkTaxes } = req.body

        if (!user_id || !creditNetworkTaxes) return res.status(400).json({ error: 'Missing parameters on request body' })

        try {
            const { db } = await connect()
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) return res.status(400).json({ error: 'User does not exist' })

            const result = await db.collection('users').updateOne(
                { _id: ObjectId(user_id) },
                { $set: { creditNetworkTaxes } }
            )

            if (result.modifiedCount) {
                return res.status(200).json({ message: 'Success' })
            } else {
                return res.status(400).json({ error: 'Server Error' })
            }

        } catch (e) {
            console.error(e)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}
)



const config = [
    {
        "_id": new ObjectId(0).toString(),
        "descricao": "Visa",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/megk0zm6kn0ilccoe3xw.png"
    },
    {
        "_id": new ObjectId(1).toString(),
        "descricao": "MasterCard",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687671/PRONTO%20LUCRO/CREDIT_CARD/gongf7wv7ej4njbs3qyn.png"
    },
    {
        "_id": new ObjectId(2).toString(),
        "descricao": "HiperCard",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/nobqv7ka3hnqmq9m7abh.png"
    },
    {
        "_id": new ObjectId(3).toString(),
        "descricao": "American Express",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/s8srkuo3ezkaw7nquzub.png"
    },
    {
        "_id": new ObjectId(4).toString(),
        "descricao": "SoroCard",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/urbmrwvcr4cyxolrj6a6.png"
    },
    {
        "_id": new ObjectId(5).toString(),
        "descricao": "BNDES",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/kbl98war8yobykeynmtk.png"
    },
    {
        "_id": new ObjectId(6).toString(),
        "descricao": "Dinners",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/qrqpd18oqzvlddrrzcqy.png"
    },
    {
        "_id": new ObjectId(8).toString(),
        "descricao": "Elo",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/dm4gyjf5jkkmmtkhjsyr.png"
    },
    {
        "_id": new ObjectId(999).toString(),
        "descricao": "Outra Bandeira",
        "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1723687672/PRONTO%20LUCRO/CREDIT_CARD/kayirhjq7pzpaaxgtswp.png"
    }
]



