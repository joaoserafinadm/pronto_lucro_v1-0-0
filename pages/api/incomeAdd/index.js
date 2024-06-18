import { connect } from '../../../utils/db'
import { verify, sign } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'
import cookie from 'cookie'
import { maskMoneyNumber } from '../../../utils/mask'
import { dateVerify } from '../../../utils/dateVerify'


const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    })
}

export default authenticated(async (req, res) => {

    if (req.method === "POST") {

        const {
            user_id,
            value,
            date,
            paymentMethod,
            parcels,
            earlyValue,
            earlyValueTax,
            description
        } = req.body




        if (!user_id || !value) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) {
                res.status(400).json({ error: "User dont exists." })
            } else {

                const newId = new ObjectID()

                const dateAdded = new Date()

                const data = {
                    _id: newId,
                    totalValue: value,
                    value: maskMoneyNumber(value),
                    paymentMethod,
                    date,
                    dateAdded: dateAdded,
                    dateUpdated: '',
                    parcels: {
                        total: parcels,
                        actual: 1
                    }
                }

                let paymentData = [data]

                // if (paymentMethod === 'cash') {
                //     paymentData = [
                //         {
                //             value: maskMoneyNumber(value),
                //             date,
                //             status: "paid"
                //         }

                //     ]
                // }

                // if (paymentMethod === 'credit') {

                //     for (let i = 1; i <= parcels; i++) {
                //         paymentData.push({
                //             value: maskMoneyNumber(value) / parcels,
                //             date: dateVerify({
                //                 ...date,
                //                 month: date.month + i
                //             }),
                //             status: "pending"
                //         })
                //     }


                // }

                // const data = {
                //     value: maskMoneyNumber(value),
                //     date,
                //     paymentMethod,
                //     parcels: +parcels,
                //     earlyValue,
                //     earlyValueTax,
                //     description,
                //     paymentData
                // }

                // const result = await db.collection('users').updateOne(
                //     { _id: ObjectId(user_id) },
                //     {
                //         $push: {
                //             incomes: {
                //                 $each: [data],
                //                 $position: 0
                //             }
                //         }
                //     })



                // if (result.modifiedCount > 0) {
                //     res.status(200).json({ message: 'Income added' })
                // } else {
                //     res.status(400).json({ error: "Cant add income." })
                // }
            }


        }
    }






})