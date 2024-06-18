import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { useState } from "react"





export default function transactions() {

    const [incomesArray, setIncomesArray] = useState([])





    const dataFunction = async (user_id) => {

        await axios.get(`${baseUrl()}/api/transactions`, {
            params: {
                user_id
            }
        }).then(res => {
            setIncomesArray(res.data)
        })
    }



    return (
        <div className="row px-2">
            <div className="col-12 my-5 ">
                <span className="fw-bold fs-3">Transações</span>
            </div>
            <div className="col-12" style={{ overflowX: 'scroll' }}>
                <table>
                    

                </table>

            </div>
        </div>


    )
}