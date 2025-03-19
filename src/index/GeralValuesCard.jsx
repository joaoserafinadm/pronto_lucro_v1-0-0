import { faArrowDown, faArrowUp, faEye, faEyeSlash, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import HideValue from "../components/hideElemet/hideValue";
import isMobile from "../../utils/isMobile";
import EntriesHistoric from "../indexPage/entriesHistoric";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from "axios";
import { maskNumberMoney } from "../../utils/mask";
import InputsHistoric from "./InputsHistoric";
import InputsHistoricModal from "./InputsHistoricModal";


export default function GeralValuesCard(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const [saldoValue, setSaldoValue] = useState('')
    const [incomeValue, setIncomeValue] = useState('')
    const [expenseValue, setExpenseValue] = useState('')
    const [lastDataInputs, setLastDataInputs] = useState([])

    const [categories, setCategories] = useState([])


    const [valueView, setValueView] = useState(true)

    useEffect(() => {
        dataFunction()
    }, [])





    const dataFunction = async () => {

        await axios.get(`/api/indexPage/geralValues`, {
            params: { user_id: token.sub }
        }).then(res => {
            setSaldoValue(res.data.saldoValue)
            setIncomeValue(res.data.incomeValue)
            setExpenseValue(res.data.expenseValue)
            setLastDataInputs(res.data.lastDataInputs)
            setCategories(res.data.categories)
        })

    }



    return (
        <>
            <InputsHistoricModal  lastDataInputs={lastDataInputs} categories={categories} />
            <div className="col">

                <div className="row pt-4 pb-3">
                    <div className="col-12 d-flex justify-content-center">
                        <span className=" small fw-bold text-secondary">
                            Saldo em conta
                        </span>

                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
                        {valueView ?
                            <span className="fs-2 bold">
                                R$ {maskNumberMoney(saldoValue)}
                            </span>
                            :
                            <span className="fs-2 bold d-flex justify-content-center align-items-center">
                                <HideValue />
                            </span>
                        }

                    </div>
                    <div className="col-12 d-flex justify-content-center my-2">
                        {valueView ?
                            <span className="text-secondary" type="button" onClick={() => setValueView(false)}>
                                <FontAwesomeIcon icon={faEyeSlash} />

                            </span>
                            :
                            <span className="text-secondary" type="button" onClick={() => setValueView(true)}>
                                <FontAwesomeIcon icon={faEye} />

                            </span>
                        }
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 d-flex">
                        <div className="col-6 d-flex justify-content-center">
                            <div className="cardAnimation">

                                <div className="row ">
                                    <div className="col-12 d-flex align-items-center">

                                        <FontAwesomeIcon icon={faArrowUp} className="text-c-success me-2" />
                                        <span className="small fw-bold text-secondary">Receitas</span>
                                        <span className="bold text-secondary ms-1" style={{ fontSize: "8px" }}>(Março)</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12" style={{ height: "50px" }}>
                                        {valueView ?
                                            <span className="fs-5 bold text-c-success">
                                                <span className="text-c-success" style={{ fontSize: "15px" }}>R$</span> {maskNumberMoney(incomeValue)}
                                            </span>
                                            :
                                            <span className="fs-5 bold text-c-success">
                                                <HideValue />
                                            </span>

                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-6 d-flex justify-content-center">
                            <div>

                                <div className="row ">
                                    <div className="col-12 d-flex align-items-center">

                                        <FontAwesomeIcon icon={faArrowDown} className="text-c-danger me-2" />
                                        <span className="small fw-bold text-secondary">Despesas</span>
                                        <span className="bold text-secondary ms-1" style={{ fontSize: "8px" }}>(Março)</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12" style={{ height: "50px" }}>
                                        {valueView ?
                                            <span className="fs-5 bold text-c-danger">
                                                R$ {maskNumberMoney(expenseValue)}
                                            </span>
                                            :
                                            <span className="fs-5 bold text-c-danger">
                                                <HideValue />
                                            </span>

                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div >


                <div className="row d-lg-none d-block">
                    <div className="col-12 d-flex justify-content-center">
                        <span className='badge rounded-pill bg-secondary cardAnimation '
                            type="button" data-bs-toggle="modal"
                            data-bs-target="#inputsHistoricModal">
                            <FontAwesomeIcon icon={faList} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-5 d-lg-block d-none" >
                <InputsHistoric lastDataInputs={lastDataInputs} categories={categories} />
            </div>


        </>

    )
}