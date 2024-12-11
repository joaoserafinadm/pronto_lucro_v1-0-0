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

    if (req.method === 'POST') {

        const { user_id, category_id, type, _id, name } = req.body

        if (!user_id || !category_id || !type || !name || !_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                let response

                if (type === 'incomeCategories') {

                    response = await db.collection('users').updateOne(
                        {
                            _id: new ObjectId(user_id),
                            "incomeCategories._id": category_id // Verifica se a categoria existe na seção
                        },
                        {
                            $push: {
                                "incomeCategories.$.subCategories": {
                                    _id: _id,
                                    name: name,
                                    active: true
                                }
                            }
                        }
                    );
                }
                if (type === 'expenseCategories') {

                    response = await db.collection('users').updateOne(
                        {
                            _id: new ObjectId(user_id),
                            "expenseCategories._id": category_id // Verifica se a categoria existe na seção
                        },
                        {
                            $push: {
                                "expenseCategories.$.subCategories": {
                                    _id: _id,
                                    name: name,
                                    active: true
                                }
                            }
                        }
                    );
                }

                if (response.modifiedCount > 0) {
                    res.status(200).json({ message: "Category created successfully." });
                } else {
                    res.status(400).json({ error: "Error creating category." });
                }
            }

        }





    }





})