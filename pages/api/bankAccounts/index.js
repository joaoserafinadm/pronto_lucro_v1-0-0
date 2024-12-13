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

        const { user_id, month, year } = req.query

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request query" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {


                //CALCULO DO SALDO NAS CONTAS

                const bankAccounts = userExist.bankAccounts

                const bankAccountsArray = bankAccounts.map(elem => {

                    const value = userExist.dfc.reduce((acc, elem1) => {

                        if (isBeforeOrEqual(elem1, { year, month })) {
                            const activeElements = elem1.data?.filter(dataElem => dataElem.active === true && dataElem.account_id.toString() === elem._id.toString()) || [];
                            acc += activeElements.reduce((sum, activeElem) => sum + (activeElem.type === "income" ? activeElem.value : -activeElem.value), 0);
                        }

                        return acc;

                    }, 0);

                    const predictedValue = userExist.dfc.reduce((acc, elem1) => {

                        if (isBeforeOrEqual(elem1, { year, month })) {
                            const activeElements = elem1.data?.filter(dataElem => dataElem.active === false && dataElem.account_id.toString() === elem._id.toString()) || [];

                            acc += activeElements?.reduce((sum, activeElem) => sum + (activeElem.type === "income" ? activeElem.value : -activeElem.value), 0);
                        }

                        return acc;

                    }, 0) + value;

                    return {
                        ...elem,
                        value: value + elem.initialValue,
                        predictedValue: predictedValue + elem.initialValue
                    }
                })




                const dfcData = userExist.dfc.find(elem => elem.year === +year && elem.month === +month)?.data || [];


                const dfcResult = userExist.dfc.reduce((acc, elem) => {
                    if (isBeforeOrEqual(elem, { year, month })) {
                        const activeElements = elem.data?.filter(dataElem => dataElem.active === true) || [];
                        acc += activeElements.reduce((sum, activeElem) => sum + (activeElem.type === "income" ? activeElem.value : -activeElem.value), 0);
                    }
                    return acc;
                }, 0) + bankAccounts.reduce((acc, elem) => { if (elem.valueSum) return acc + elem.initialValue }, 0);




                const monthPendigResult = dfcData.reduce((sum, elem) => {
                    if (elem.active === false) {
                        return sum + (elem.type === "income" ? elem.value : -elem.value);
                    }
                }, 0);







                const dfcPendingResult = userExist.dfc.reduce((acc, elem) => {
                    if (isBeforeOrEqual(elem, { year, month })) {
                        const activeElements = elem.data?.filter(dataElem => dataElem.active === false) || [];
                        acc += activeElements.reduce((sum, activeElem) => sum + (activeElem.type === "income" ? activeElem.value : -activeElem.value), 0);
                    }
                    return acc;
                }, 0);


                res.status(200).json({ bankAccounts: bankAccountsArray, dfcResult, monthPendigResult, dfcPendingResult });

            }
        }

    } else if (req.method === "POST") {

        const { user_id,
            bankSelected,
            color,
            initialValue,
            description,
            valueSum,
            creditCard,
            creditLimit,
            creditNetwork,
            diaFechamento,
            diaLancamento } = req.body

        if (!user_id || !bankSelected || !description) {

            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const newId = new ObjectId();

                const bankData = {
                    _id: newId,
                    bankSelected,
                    color,
                    initialValue: maskMoneyNumber(initialValue),
                    description,
                    valueSum,
                    creditCard,
                    creditLimit: maskMoneyNumber(creditLimit),
                    creditNetwork,
                    diaFechamento,
                    diaLancamento,
                    active: true,
                    date: dateObject(new Date())
                }

                const result = await db.collection('users').updateOne(
                    { _id: ObjectId(user_id) },
                    {
                        $push: {
                            bankAccounts: {
                                $each: [bankData],
                                $position: 0
                            }
                        }
                    }
                );

                if (result.modifiedCount > 0) {
                    res.status(200).json({ success: 'Account created' })
                } else {
                    res.status(400).json({ error: 'An error occurred' })
                }


            }
        }
    } else if (req.method === "PATCH") {

        const { user_id,
            bankAccount_id,
            bankSelected,
            color,
            initialValue,
            description,
            valueSum,
            creditCard,
            creditLimit,
            creditNetwork,
            diaFechamento,
            diaLancamento } = req.body

        if (!user_id || !bankSelected || !description) {

            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const result = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id), "bankAccounts._id": new ObjectId(bankAccount_id) },
                    {
                        $set: {
                            "bankAccounts.$.bankSelected": bankSelected,
                            "bankAccounts.$.color": color,
                            "bankAccounts.$.initialValue": maskMoneyNumber(initialValue),
                            "bankAccounts.$.description": description,
                            "bankAccounts.$.valueSum": valueSum,
                            "bankAccounts.$.creditCard": creditCard,
                            "bankAccounts.$.creditLimit": maskMoneyNumber(creditLimit),
                            "bankAccounts.$.creditNetwork": creditNetwork,
                            "bankAccounts.$.diaFechamento": diaFechamento,
                            "bankAccounts.$.diaLancamento": diaLancamento
                        }
                    }
                );

                if (result.modifiedCount > 0) {
                    res.status(200).json({ success: 'Account updated' })
                } else {
                    res.status(400).json({ error: 'An error occurred' })
                }
            }
        }
    } else if (req.method === "DELETE") {

        const { user_id,
            bankAccount_id } = req.body

        if (!user_id || !bankAccount_id) {

            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect();

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." });
            } else {

                const result = await db.collection('users').updateOne(
                    { _id: new ObjectId(user_id), "bankAccounts._id": new ObjectId(bankAccount_id) },
                    {
                        $set: {
                            "bankAccounts.$.active": false,
                        }
                    }
                );

                if (result.modifiedCount > 0) {
                    res.status(200).json({ success: 'Account deleted' })
                } else {
                    res.status(400).json({ error: 'An error occurred' })
                }
            }
        }
    }

})


function isBeforeOrEqual(a, b) {
    if (+a.year < +b.year) return true;
    if (+a.year === +b.year && +a.month <= +b.month) return true;
    return false;
}