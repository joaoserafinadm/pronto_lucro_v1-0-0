import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
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

    if (req.method === "POST") {

        const { user_id, section, category_id, newTagName, subTags } = req.body;

        if (!user_id || !section || !category_id || !newTagName) {
            return res.status(400).json({ error: "Missing parameters on request body" });
        }

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            return res.status(400).json({ error: "User doesn't exist." });
        }

        const newTag = {
            _id: new ObjectId(),
            tag: newTagName,
            subTags: subTags.map(elem => ({
                _id: new ObjectId(),
                subTag: elem
            }))
        };

        console.log(section, newTag)

        let response;

        if (section === "incomeTags") {
            console.log("incomeTags");

            response = await db.collection('users').updateOne(
                {
                    _id: new ObjectId(user_id),
                    "incomeTags._id": new ObjectId(category_id)
                },
                {
                    $push: { "incomeTags.$.tags": newTag }
                }
            );
        } else if (section === "expenseTags") {
            console.log("expenseTags");

            response = await db.collection('users').updateOne(
                {
                    _id: new ObjectId(user_id),
                    "expenseTags._id": new ObjectId(category_id)
                },
                {
                    $push: { "expenseTags.$.tags": newTag }
                }
            );
        } else {
            return res.status(400).json({ error: "Invalid section provided." });
        }

        console.log(response);

        if (response && response.modifiedCount === 1) {
            res.status(200).json({ success: true, message: "Tag added successfully." });
        } else {
            res.status(500).json({ error: "Failed to add tag." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
});
