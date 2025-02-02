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

    if (req.method === "GET") {

        const { user_id } = req.query

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {
                const planoDeContasConfig = userExist.planoDeContasConfig || []
                res.status(200).json({ planoDeContasConfig });
            }
        }


    } else if (req.method === "POST") {

        const { user_id, name, categories } = req.body


        if (!user_id || !name || !categories.length) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const data = {
                    _id: new ObjectID(),
                    resultName: name,
                    selectedCategories: categories
                };

                const response = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id) },
                    {
                        $push: {
                            planoDeContasConfig: data
                        }
                    }
                );

                if (response.modifiedCount === 1) {
                    res.status(200).json({ message: "Plano de contas criado com sucesso." });
                } else {
                    res.status(400).json({ error: "Não foi possível criar o plano de contas." });
                }
            }
        }


    } else if (req.method === "DELETE") {
        const { user_id, id } = req.query

        if (!user_id || !id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const response = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id) },
                    {
                        $pull: {
                            planoDeContasConfig: { _id: new ObjectId(id) }
                        }
                    }
                );

                if (response.modifiedCount === 1) {
                    res.status(200).json({ message: "Plano de contas deletado com sucesso." });
                } else {
                    res.status(400).json({ error: "Não foi possível deletar o plano de contas." });
                }
            }
        }
    } else if (req.method === "PATCH") {

        const { user_id, id, name, categories } = req.body

        if (!user_id || !id || !name || !categories.length) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const response = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id), "planoDeContasConfig._id": new ObjectId(id) },
                    {
                        $set: {
                            "planoDeContasConfig.$.resultName": name,
                            "planoDeContasConfig.$.selectedCategories": categories
                        }
                    }
                );

                if (response.modifiedCount === 1) {
                    res.status(200).json({ message: "Plano de contas atualizado com sucesso." });
                } else {
                    res.status(400).json({ error: "Não foi possível atualizar o plano de contas." });
                }
            }
        }



    }

})

