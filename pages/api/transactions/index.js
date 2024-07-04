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

    if (req.method === "GET") {
        const { user_id, month, year } = req.query

        if (!user_id) {
            res.status(400).json({ error: "Missing parameters on request body" })
        } else {
            const { db } = await connect()

            const userExist = await db.collection('users').findOne({ _id: ObjectId(user_id) })

            if (!userExist) {
                res.status(400).json({ error: "User does not exist" })
            } else {

                const dreData = userExist.dre

                const dfcData = userExist.dfc.find(elem => elem.year === +year && elem.month === +month)?.data || [];
                const dfcPending = userExist.dfc.find(elem => elem.year === +year && elem.month === +month)?.data?.filter(elem => elem.active === false) || [];

                const dfcResult = userExist.dfc.reduce((acc, elem) => {
                    // Verifica se a data do elemento é anterior ou igual ao ano/mês atual
                    if (isBeforeOrEqual(elem, { year, month })) {
                        // Filtra os elementos ativos e soma os valores desejados
                        const activeElements = elem.data?.filter(dataElem => dataElem.active === true) || [];
                        acc += activeElements.reduce((sum, activeElem) => sum + activeElem.value, 0); // Ajuste 'activeElem.value' conforme necessário
                    }
                    return acc;
                }, 0);

                const dfcPendingResult = userExist.dfc.reduce((acc, elem) => {
                    // Verifica se a data do elemento é anterior ou igual ao ano/mês atual
                    if (isBeforeOrEqual(elem, { year, month })) {
                        // Filtra os elementos ativos e soma os valores desejados
                        const activeElements = elem.data?.filter(dataElem => dataElem.active === false) || [];
                        acc += activeElements.reduce((sum, activeElem) => sum + activeElem.value, 0); // Ajuste 'activeElem.value' conforme necessário
                    }
                    return acc;
                }, 0);


                res.status(200).json({ dreData, dfcData, dfcPending, dfcResult, dfcPendingResult, tags: userExist.tags })


            }
        }
    }

})




function isBeforeOrEqual(a, b) {
    if (+a.year < +b.year) return true;
    if (+a.year === +b.year && +a.month <= +b.month) return true;
    return false;
}