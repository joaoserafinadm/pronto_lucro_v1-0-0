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

    const { user_id, section, category_id, categoryName, newTag } = req.body;

    if (!user_id || !newTag) {
        return res.status(400).json({ error: "Missing parameters in request body." });
    }

    try {
        const { db } = await connect();
        const user = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!user) {
            return res.status(404).json({ error: "User doesn't exist." });
        }


        const field = section === 'income' ? 'incomeTags' : 'expenseTags';

        if (category_id === 'new') {

            const newCategoryId = new ObjectId();
            const newTagId = new ObjectId();

            const newTagData = {
                _id: newCategoryId,
                category: categoryName,
                tags: [{
                    _id: newTagId,
                    ...newTag,
                }]
            };


            const responseNewTag = await db.collection('users').updateOne({
                _id: new ObjectId(user_id)
            }, {
                $push: {
                    [field]: {
                        $each: [newTagData],
                        $position: 0
                    }
                }
            })

            console.log("responseNewTag", responseNewTag)

            const tagSelected = {
                category_id: newCategoryId,
                category: categoryName,
                _id: newTagId,
                ...newTag
            }

            res.status(200).json(tagSelected);


        } else {

            const newTagId = new ObjectId();


            const newTagData = {
                _id: newTagId,
                ...newTag
            }

            console.log("newTagData", newTagData, category_id)

            const seachField = `${field}._id`

            const response = await db.collection('users').updateOne(
                {
                    _id: new ObjectId(user_id),
                    [seachField]: new ObjectId(category_id)
                },
                {
                    $push: {
                        [`${field}.$.tags`]: {
                            $each: [newTagData],
                            $position: 0
                        }
                    }
                }
            );

            console.log("response", response)

            const tagSelected = {
                category_id: category_id,
                category: categoryName,
                ...newTagData
            }

            res.status(200).json(tagSelected);


        }






        res.status(200).json(newTagData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// Exportando a função handler com autenticação
export default authenticated(handler);
