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

    if (req.method === "POST") {

        const { user_id, category_id, subCategoryName } = req.body

        if (!user_id || !category_id || !subCategoryName) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const incomeCategoryExist = userExist.incomeCategories.find(category => category._id.toString() === category_id)
                const expenseCategoryExist = userExist.expenseCategories.find(category => category._id.toString() === category_id)

                console.log(incomeCategoryExist, expenseCategoryExist)
                if (!incomeCategoryExist && !expenseCategoryExist) {
                    res.status(400).json({ error: "Category doesn't exist." });
                } else {

                    const newSubCategoryId = new ObjectId();

                    if (incomeCategoryExist) {
                        const response = await db.collection('users').updateOne(
                            { _id: new ObjectId(user_id), "incomeCategories._id": category_id },
                            { $push: { "incomeCategories.$.subCategories": { _id: newSubCategoryId.toString(), name: subCategoryName } } }
                        )

                        if (response.modifiedCount) {
                            res.status(200).json({ id: newSubCategoryId })
                        } else {
                            res.status(400).json({ error: "Trouble in connect to database" })
                        }

                    } else if (expenseCategoryExist) {
                        const response = await db.collection('users').updateOne(
                            { _id: new ObjectId(user_id), "expenseCategories._id": category_id },
                            { $push: { "expenseCategories.$.subCategories": { _id: newSubCategoryId.toString(), name: subCategoryName } } }
                        )

                        if (response.modifiedCount) {
                            res.status(200).json({ id: newSubCategoryId })
                        } else {
                            res.status(400).json({ error: "Trouble in connect to database" })
                        }
                    }



                }
            }
        }



    }





})