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

    if (req.method === "GET") {

        const { user_id, type } = req.query

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {
                const categories = type === "income" ? (userExist.incomeCategories || []) : (userExist.expenseCategories || [])

                res.status(200).json({ categories });

            }

        }
    } else if (req.method === "POST") {

        const { user_id, type, categoryName, color, subCategories } = req.body


        if (!user_id || !type || !categoryName || !color || !subCategories.length) {
            res.status(400).json({ error: "Missing parameters on request body" })
        }


        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            res.status(400).json({ error: "User doesn't exist." });
        }

        const newCategorie = {
            _id: new ObjectId().toString(),
            categoryName: categoryName,
            color: color,
            active: true,
            // textColor: getTextColorBasedOnBackground(color), // Função opcional para definir a cor do texto com base no fundo
            // textColor: '#fff', // Função opcional para definir a cor do texto com base no fundo
            subCategories: subCategories.map(elem => ({
                _id: new ObjectId().toString(),
                name: elem.name,
                active: true
            }))
        };

        const response = await db.collection('users').updateOne(
            { _id: ObjectId(user_id) },
            { $push: { [type]: { $each: [newCategorie], $position: 0 } } }
        )

        console.log("response", response)

        if (response.modifiedCount) {
            res.status(200).json({ message: "Categorie created" })
        } else {
            res.status(400).json({ error: "Trouble in connect to database" })
        }





    } else if (req.method === "DELETE") {

        const { user_id, type, category_id } = req.query

        if (!user_id || !type || !category_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const response = await db.collection('users').updateOne(
                    { _id: ObjectId(user_id) },
                    { $pull: { [type]: { _id: category_id } } }
                )

                if (response.modifiedCount) {
                    res.status(200).json({ message: "Categorie deleted" })
                } else {
                    res.status(400).json({ error: "Trouble in connect to database" })
                }
            }
        }



    }

})