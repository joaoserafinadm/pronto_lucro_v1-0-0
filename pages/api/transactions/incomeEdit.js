import { connect } from '../../../utils/db';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
import cookie from 'cookie';
import { maskMoneyNumber } from '../../../utils/mask';

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
        const {
            user_id,
            income_id,
            ref_id,
            editConfig,
            section,
            value,
            currencyId,
            paymentDate,
            paymentMethod,
            competenceMonth,
            description,
            subCategory_id,
            account_id,
            files,
            active
        } = req.body;

        if (!user_id || !editConfig || !section || !value)
            return res.status(400).json({ error: "Missing parameters on request body" });

        const { db } = await connect();
        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            return res.status(400).json({ error: "User does not exist" });
        }

        let filter = {};
        let arrayFilters = [];

        if (editConfig === "1") {
            filter = { _id: new ObjectId(user_id), "dfc.data._id": new ObjectId(income_id) };
            arrayFilters = [{ "elem._id": new ObjectId(income_id) }];
        } else if (editConfig === "2") {
            filter = { _id: new ObjectId(user_id), "dfc.data.ref_id": new ObjectId(ref_id), "dfc.data.active": false };
            arrayFilters = [{ "elem.ref_id": new ObjectId(ref_id), "elem.active": false }];
        } else if (editConfig === "3") {
            filter = { _id: new ObjectId(user_id), "dfc.data.ref_id": new ObjectId(ref_id) };
            arrayFilters = [{ "elem.ref_id": new ObjectId(ref_id) }];
        } else {
            return res.status(400).json({ error: "Invalid editConfig value" });
        }

        const update = {
            $set: {
                "dfc.$[].data.$[elem].section": section,
                "dfc.$[].data.$[elem].value": maskMoneyNumber(value),
                "dfc.$[].data.$[elem].currencyId": currencyId,
                "dfc.$[].data.$[elem].paymentDate": paymentDate,
                "dfc.$[].data.$[elem].paymentMethod": paymentMethod,
                "dfc.$[].data.$[elem].competenceMonth": competenceMonth,
                "dfc.$[].data.$[elem].description": description,
                "dfc.$[].data.$[elem].subCategory_id": subCategory_id,
                "dfc.$[].data.$[elem].account_id": account_id,
                "dfc.$[].data.$[elem].files": files,
                "dfc.$[].data.$[elem].active": active
            }
        };
        const options = { arrayFilters };

        const result = await db.collection('users').updateMany(filter, update, options);

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Success" });
        } else {
            res.status(400).json({ error: "No records updated" });
        }
    }

    else if (req.method === "DELETE") {
        const { user_id, income_id } = req.query;

        if (!user_id || !income_id) {
            return res.status(400).json({ error: "Missing parameters on request body" });
        }

        const { db } = await connect();
        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

        if (!userExist) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(user_id) },
            { $pull: { "dfc.$[].data": { _id: new ObjectId(income_id) } } }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Success" });
        } else {
            res.status(400).json({ error: "Server Error" });
        }
    }
});