import { useDispatch } from "react-redux";
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


export default function BankAccounts() {

    const token = jwt.decode(Cookie.get('auth'));

    const dispatch = useDispatch()

    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [institutions, setInstitutions] = useState([])



    useEffect(() => {
        navbarHide(dispatch)
        dataFunction(token.sub)
    }, [])

    const dataFunction = async (user_id) => {

        await axios.get(`/api/bankAccounts/institutions`)
            .then(res => {
                setInstitutions(res.data.institutions)
            }).catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="page">

            <NewAccountModal institutions={institutions} />

            
            <Title title={'Contas bancárias'} subtitle='Gerencie suas contas bancárias' backButton='/' />

            {/* <div className="row my-3">
                <div className="col-12 d-flex justify-content-center">


                    <MonthSelect setMonth={value => { setDateSelected(value) }} />
                </div>
            </div> */}

            <AccountsTotalCards dateSelected={dateSelected} />


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
                                <div className="col-12 col-xl-4 col-sm-6 my-2">
                                    <NewAccountCard />
                                </div>
                                <div className="col-12 col-xl-4 col-sm-6 my-2">
                                    <AccountCard dateSelected={dateSelected} />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )


}