import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import MonthSelect from "../src/incomeAdd/MonthSelect"
import { SpinnerLG } from "../src/components/loading/Spinners"


export default function Transactions() {

    const token = jwt.decode(Cookie.get('auth'));

    const [incomesArray, setIncomesArray] = useState([])
    const [date, setDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        if (date) dataFunction(token.sub)
    }, [date])





    const dataFunction = async (user_id) => {
        setLoadingData(true)

        try {
            const res = await axios.get(`${baseUrl()}/api/transactions`, {
                params: {
                    user_id,
                    month: date.month,
                    year: date.year
                }
            }).then(res => {
                setLoadingData(false)
            })

        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    }



    return (
        <div>

            <div className="row px-2">
                <div className="col-12 mt-3 ">
                    <span className="fw-bold fs-3">Transações</span>
                </div>

            </div>
            <div className="row px-2">
                <div className="col-12 my-5 d-flex justify-content-center">
                    <MonthSelect
                        setMonth={value => { setDate(value) }}
                    />
                </div>



            </div>
            <div className="row">
                <div className="col-12">
                    {loadingData ?
                        <SpinnerLG />
                        :
                        <div className="fadeItem">
                            
                        </div>
                        }
                    <table>


                    </table>

                </div>
            </div>
        </div>


    )
}