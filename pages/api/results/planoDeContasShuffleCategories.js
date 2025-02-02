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

        const { user_id, id, selectedCategories } = req.body

        if (!user_id || !id || !selectedCategories.length) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {
            const { db } = await connect();
            const userExist = await db.collection("users").findOne({ _id: new ObjectId(user_id) })

            if (!userExist) {
                res.status(400).json({ error: "User not found" })
            } else {

                const response = await db.collection("users").updateOne(
                    { _id: new ObjectId(user_id), "planoDeContasConfig._id": id },
                    {
                        $set: {
                            "planoDeContasConfig.$.selectedCategories": selectedCategories
                        }
                    })

                if (response.modifiedCount === 1) {
                    res.status(200).json({ message: "Plano de contas atualizado com sucesso." })
                } else {
                    res.status(400).json({ error: "Não foi possível atualizar o plano de contas." })
                }
            }
        }



    }


})