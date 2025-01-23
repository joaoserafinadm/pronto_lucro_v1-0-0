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

    if (req.method === "GET") {

        const { user_id, month, year } = req.query;

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" });
        } else {
            const { db } = await connect();
            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) });

            if (!userExist) {
                res.status(400).json({ error: "User does not exist" });
            } else {


                const bankAccounts = userExist.bankAccounts

                const bankAccountsArray = bankAccounts.map(elem => {
                    return {
                        _id: elem._id,
                        bankSelected: elem.bankSelected,
                        color: elem.color,
                        description: elem.description
                    }
                })

                const incomeCategories = userExist.incomeCategories
                const expenseCategories = userExist.expenseCategories



                const dreData = userExist.dre;
                const dfcData = userExist.dfc.find(elem => elem.year === +year && elem.month === +month)?.data || [];
                const dfcPending = userExist.dfc.find(elem => elem.year === +year && elem.month === +month)?.data?.filter(elem => elem.active === false) || [];



                // Classificar os dados por 'value' em ordem crescente
                const incomeData = dfcData.filter(item => item.type === 'income');
                const expenseData = dfcData.filter(item => item.type === 'expense');

                // Ordenar os dados por 'value' de forma decrescente para o tipo 'income'
                const top3Incomes = incomeData.sort((a, b) => b.value - a.value).slice(0, 3);

                // Ordenar os dados por 'value' de forma crescente para o tipo 'expense'
                const top3Expenses = expenseData.sort((a, b) => a.value - b.value).slice(0, 3);




                const monthResult = dfcData.reduce((sum, elem) => {
                    if (elem.active === true) return sum + (elem.type === "income" ? elem.value : -elem.value);
                    else return sum
                }, 0)
                // + bankAccounts.reduce((acc, elem) => { if (elem.valueSum) return acc + elem.initialValue }, 0);


                const monthPendingResult = dfcData.reduce((sum, elem) => {
                    if (elem.active === false) return sum + (elem.type === "income" ? elem.value : -elem.value);
                    else return sum
                }, 0)

                console.log("monthPendingResult", monthPendingResult)


                const dfcResult = userExist.dfc.reduce((acc, elem) => {
                    if (isBeforeOrEqual(elem, { year, month })) {
                        const activeElements = elem.data?.filter(dataElem => dataElem.active === true) || [];
                        acc += activeElements.reduce((sum, activeElem) => sum + (activeElem.type === "income" ? activeElem.value : -activeElem.value), 0);
                    }
                    return acc;
                }, 0) + bankAccounts.reduce((acc, elem) => {
                    if (elem.active) return acc + elem.initialValue
                    else return acc
                }, 0);
                // }, 0) + bankAccounts.reduce((acc, elem) => { if (elem.valueSum && elem.active) return acc + elem.initialValue }, 0);

                console.log("dfcResult", dfcResult)

                const dfcPendingResult = userExist.dfc.reduce((acc, elem) => {
                    if (isBeforeOrEqual(elem, { year, month })) {
                        const activeElements = elem.data?.filter(dataElem => dataElem.active === false) || [];
                        acc += activeElements.reduce((sum, activeElem) => sum + (activeElem.type === "income" ? activeElem.value : -activeElem.value), 0);
                    }
                    return acc;
                }, 0);

                res.status(200).json({ bankAccountsArray, incomeCategories, expenseCategories, dfcData, dreData })


                // res.status(200).json({ dreData, dfcData, dfcPending, monthResult, dfcResult, monthPendingResult, dfcPendingResult, categories: userExist.incomeCategories?.concat(userExist.expenseCategories || []), accounts: userExist.bankAccounts, top3Incomes, top3Expenses });
            }
        }
    }
});

function isBeforeOrEqual(a, b) {
    if (+a.year < +b.year) return true;
    if (+a.year === +b.year && +a.month <= +b.month) return true;
    return false;
}
