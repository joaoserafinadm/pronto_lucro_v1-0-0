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
import AccountsResultsCards from "../src/bankAccounts/AccountsResultsCards";
import { SpinnerLG } from "../src/components/loading/Spinners";
import EditAccountModal from "../src/bankAccounts/EditAccountModal";
import ViewAccountModal from "../src/bankAccounts/ViewAccountModal";


export default function BankAccounts() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const newDataStore = useSelector(state => state.newData)

    const [institutions, setInstitutions] = useState([])
    const [creditCardList, setCreditCardList] = useState([])
    const [bankAccounts, setBankAccounts] = useState([])

    const [accountSelected, setAccountSelected] = useState(null)

    const [data, setData] = useState(null)

    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const [loadingPage, setLoadingPage] = useState(true)


    useEffect(() => {
        if (newDataStore) dataFunction(token.sub)
    }, [newDataStore])


    useEffect(() => {
        if (dateSelected) dataFunction(token.sub)
        navbarHide(dispatch)
    }, [dateSelected])


    useEffect(() => {
        navbarHide(dispatch)
        dataFunction(token.sub)
    }, [])

    const dataFunction = async (user_id) => {
        setLoadingPage(true)

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
        }).then(res => {
            setBankAccounts(res.data.bankAccounts)
            setData(res.data)
            setLoadingPage(false)
        }).catch(err => {
            setLoadingPage(false)
            console.log(err)
        })
    }

    return (
        <div className="">

            <NewAccountModal
                institutions={institutions}
                creditCardList={creditCardList}
                dataFunction={() => dataFunction(token.sub)} />


            <EditAccountModal
                token={token} bankAccountsLength={bankAccounts.length}
                dataFunction={() => dataFunction(token.sub)}
                creditCardList={creditCardList}
                accountSelected={accountSelected}
                institutions={institutions}
                setAccountSelected={setAccountSelected} />

            <ViewAccountModal
                token={token}
                creditCardList={creditCardList}
                accountSelected={accountSelected}
                institutions={institutions}
                setAccountSelected={setAccountSelected} />




            <Title title={'Contas bancárias'} subtitle='Gerencie suas contas bancárias' backButton='/' />

            <div className="pagesContent shadow">


                <div className="col-12 my-2 d-flex justify-content-center">
                    <MonthSelect
                        setMonth={value => { setDateSelected(value) }}
                    />
                </div>

                {loadingPage ?
                    <SpinnerLG />
                    :
                    <div className="fadeItem">
                        <div className="row d-flex justify-content-center my-3">
                            <div className="col-12 col-lg-10">
                                <AccountsResultsCards dateSelected={dateSelected} data={data} />
                            </div>
                        </div>


                        {/* <AccountsTotalCards dateSelected={dateSelected} data={data} /> */}


                        <div className="row">

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">


                                        <div className="row d-flex">
                                            <div className="col-12 col-xl-4 col-sm-6 my-2 d-flex justify-content-center">
                                                <NewAccountCard />
                                            </div>
                                            <hr className="d-lg-none d-block mt-4" />
                                            {bankAccounts?.map((elem, index) => {
                                                if (elem?.active) return (
                                                    <div className="col-12 col-xl-4 col-sm-6 my-3 d-flex justify-content-center">
                                                        <CardTemplate editButtons accountsPage
                                                            elem={elem}
                                                            bankSelected={elem.bankSelected}
                                                            color={elem.color}
                                                            predictedValue={maskNumberMoney(elem.predictedValue)}
                                                            value={maskNumberMoney(elem.value)}
                                                            description={elem.description}
                                                            creditNetwork={elem.creditNetwork}
                                                            setAccountSelected={setAccountSelected} />
                                                    </div>
                                                )
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}



            </div>


        </div>
    )


}