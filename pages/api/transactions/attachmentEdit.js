
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

        const { user_id, income_id, files } = req.body

        if (!user_id || !income_id || !files) {
            res.status(400).json({ error: "Missing parameters on request body" });
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) });

            if (!userExist) {

                res.status(400).json({ error: "User does not exist" });

            } else {

                const result = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id), "dfc.data._id": new ObjectId(income_id) },
                    { $set: { "dfc.$[outer].data.$[inner].files": files } },
                    {
                        arrayFilters: [
                            { "outer.data._id": new ObjectId(income_id) },
                            { "inner._id": new ObjectId(income_id) }
                        ]
                    }
                );

                console.log("result", result)

                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: "Success" });
                } else {
                    res.status(400).json({ error: "Server Error" });

                }



            }
        }


    }




})