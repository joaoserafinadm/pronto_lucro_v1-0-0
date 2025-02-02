import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectID, ObjectId } from 'bson';
import cookie from 'cookie';

const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    });
};

export default authenticated(async (req, res) => {



    if (req.method === "PATCH") {

        const { user_id, planoDeContasConfig } = req.body

        if (!user_id || !planoDeContasConfig.length) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {
            const { db } = await connect();


            const response = await db.collection('users').updateOne(
                { _id: new ObjectId(user_id) },
                {
                    $set: {
                        planoDeContasConfig: planoDeContasConfig
                    }
                }
            )

            if (response.modifiedCount > 0) {
                res.status(200).json({ message: "Plano de contas atualizado com sucesso." });
            } else {
                res.status(400).json({ error: "Plano de contas não foi atualizado." });

            }
        }




    }


})