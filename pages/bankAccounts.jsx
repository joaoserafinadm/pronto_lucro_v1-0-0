import { useDispatch, useSelector } from "react-redux";
import Title from "../src/components/title/Title2";
import navbarHide from "../utils/navbarHide";
import { useEffect, useState } from "react";
import AccountsTotalCards from "../src/bankAccounts/AccountsTotalCards";
import MonthSelect from "../src/incomeAdd/MonthSelect";
import AccountCard from "../src/bankAccounts/AccountCard";
import NewAccountCard from "../src/bankAccounts/NewAccountCard";
import NewAccountModal from "../src/bankAccounts/NewAccountModal";
import axios from "axios";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import CardTemplate from "../src/bankAccounts/CardTemplate";
import { maskNumberMoney } from "../utils/mask";


export default function BankAccounts() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const newDataStore = useSelector(state => state.newData)

    useEffect(() => {
        if (newDataStore) dataFunction(token.sub)
    }, [newDataStore])

    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    useEffect(() => {
        if (dateSelected) dataFunction(token.sub)
        navbarHide(dispatch)

    }, [dateSelected])


    const [institutions, setInstitutions] = useState([])
    const [creditCardList, setCreditCardList] = useState([])
    const [bankAccounts, setBankAccounts] = useState([])

    const [data, setData] = useState(null)




    useEffect(() => {
        navbarHide(dispatch)
        dataFunction(token.sub)
    }, [])

    const dataFunction = async (user_id) => {

        await axios.get(`/api/bankAccounts/institutions`)
            .then(res => {
                setInstitutions(res.data.institutions)
                setCreditCardList(res.data.creditCardList)
            }).catch(err => {
                console.log(err)
            })

        await axios.get(`/api/bankAccounts`, {
            params: {
                user_id,
                month: dateSelected.month,
                year: dateSelected.year
            }
        })
            .then(res => {
                setBankAccounts(res.data.bankAccounts)
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="">

            <NewAccountModal
                institutions={institutions}
                creditCardList={creditCardList}
                dataFunction={() => dataFunction(token.sub)} />


            <Title title={'Contas bancárias'} subtitle='Gerencie suas contas bancárias' backButton='/' />

            <div className="col-12 my-2 d-flex justify-content-center">
                <MonthSelect
                    setMonth={value => { setDateSelected(value) }}
                />
            </div>


            <AccountsTotalCards dateSelected={dateSelected} data={data}/>


            <div className="row">


                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {/* <div className="row">
                                <div className="col-12 d-flex justify-content-end">
                                    <button className="btn btn-custom-success">
                                        + Adicionar conta
                                    </button>
                                </div>
                            </div>
                            <hr /> */}


                            <div className="row d-flex">
                                <div className="col-12 col-xl-4 col-sm-6 my-2 d-flex justify-content-center">
                                    <NewAccountCard />
                                </div>
                                {bankAccounts?.map((elem, index) => {
                                    return (
                                        <div className="col-12 col-xl-4 col-sm-6 my-2 d-flex justify-content-center">
                                            <CardTemplate editButtons
                                                bankSelected={elem.bankSelected}
                                                color={elem.color}
                                                value={maskNumberMoney(elem.value + elem.initialValue)}
                                                description={elem.description}
                                                creditNetwork={elem.creditNetwork} />
                                        </div>
                                    )
                                })}


                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )


}