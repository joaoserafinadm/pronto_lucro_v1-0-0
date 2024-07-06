import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import MonthSelect from "../src/incomeAdd/MonthSelect"
import { SpinnerLG } from "../src/components/loading/Spinners"
import TransactionsCard from "../src/transactions/TransactionsCard"
import Title from "../src/components/title/Title2"
import { useDispatch, useSelector } from "react-redux"
import navbarHide from "../utils/navbarHide";
import DesktopPage from "../src/transactions/DesktopPage"
import {newData} from "../store/NewData/NewData.action"

export default function Transactions() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const newDataStore = useSelector(state => state.newData)

    useEffect(() => {
        if (newDataStore) dataFunction(token.sub)
    }, [newDataStore])


    const [data, setData] = useState(null)
    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [tags, setTags] = useState([])

    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        if (dateSelected) dataFunction(token.sub)
        navbarHide(dispatch)

    }, [dateSelected])





    const dataFunction = async (user_id) => {
        setLoadingData(true)
        dispatch(newData(false))

        try {
            const res = await axios.get(`${baseUrl()}/api/transactions`, {
                params: {
                    user_id,
                    month: dateSelected.month,
                    year: dateSelected.year
                }
            }).then(res => {
                setLoadingData(false)
                setTags(res.data.tags)
                setData(res.data)
                dispatch(newData(false))
            })

        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    }



    return (
        <div>
            <Title title={'Transações'} subtitle='Controle seu histório de transações' backButton='/' />


            <div className="row px-2">
                <div className="col-12 my-3 d-flex justify-content-center">
                    <MonthSelect
                        setMonth={value => { setDateSelected(value) }}
                    />
                </div>



            </div>
            <div className="row " style={{ marginBottom: '100px' }}>
                <div className="col-12">
                    {loadingData ?
                        <SpinnerLG />
                        :
                        <div className="fadeItem">
                            <DesktopPage data={data} dateSelected={dateSelected} />
                            {/* <TransactionsCard data={data} /> */}
                        </div>
                    }
                    <table>


                    </table>

                </div>
            </div>
        </div>


    )
}