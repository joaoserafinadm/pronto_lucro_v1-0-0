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

        const { user_id } = req.query

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {

            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) })

            if (!userExist) {
                res.status(400).json({ error: "User doesn't exist." })
            } else {

                const bankAccounts = userExist.bankAccounts


                const currentDate = new Date();
                const month = currentDate.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
                const year = currentDate.getFullYear();

                const dfcData = userExist.dfc.find(elem => elem.year === +year && elem.month === +month)?.data || [];


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

                const monthResultIncome = dfcData.reduce((sum, elem) => {
                    if (elem.active === true && elem.type === "income") return sum + elem.value;
                    else return sum
                }, 0)
                const monthResultExpense = dfcData.reduce((sum, elem) => {
                    if (elem.active === true && elem.type === "expense") return sum + elem.value;
                    else return sum
                }, 0)

                const lastDataInputs = userExist.dfc
                    .flatMap(dfcEntry => dfcEntry.data || []) // Coletar todos os dados
                    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)) // Ordenar por dateAdded
                    .slice(0, 10); // Pegar os últimos 10 registros

                    const categories = userExist.incomeCategories?.concat(userExist.expenseCategories || [])

                res.status(200).json({ saldoValue: dfcResult, incomeValue: monthResultIncome, expenseValue: monthResultExpense, lastDataInputs , categories});


            }
        }
    }




})

function isBeforeOrEqual(a, b) {
    if (+a.year < +b.year) return true;
    if (+a.year === +b.year && +a.month <= +b.month) return true;
    return false;
}
