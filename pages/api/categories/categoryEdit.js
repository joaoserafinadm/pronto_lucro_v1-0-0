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


    if (req.method === "PATCH") {

        const { user_id, section, category } = req.body

        console.log(user_id, section, category)

        if (!user_id || !section || !category) {
            res.status(400).json({ error: "Missing parameters on request body" })
        }


        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {

            res.status(400).json({ error: "User doesn't exist." });
        }

        console.log(category._id)

        let response

        if (section === 'incomeTags') {

            response = await db.collection('users').updateOne(
                {
                    _id: new ObjectId(user_id),
                    "incomeTags._id": category._id // Verifica se a categoria existe na seção
                },
                {
                    $set: {
                        "incomeTags.$": category  // Substitui a categoria inteira
                    }
                }
            );
        }
        if (section === 'expenseTags') {

            response = await db.collection('users').updateOne(
                {
                    _id: new ObjectId(user_id),
                    "expenseTags._id": category._id  // Verifica se a categoria existe na seção
                },
                {
                    $set: {
                        "expenseTags.$": category  // Substitui a categoria inteira
                    }
                }
            );
        }





        console.log(response)

        if (response.modifiedCount === 1) {
            res.status(200).json({ message: "Categorie updated" })
        } else {
            res.status(400).json({ error: "Trouble in connect to database" })
        }
    }



})