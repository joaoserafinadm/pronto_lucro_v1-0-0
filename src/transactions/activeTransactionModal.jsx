import { useEffect, useState } from "react"
import { useStateContext } from "./context/transactionsContext"
import TagSelected from "./tagSelected"
import axios from "axios"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux"
import { newData } from "../../store/NewData/NewData.action"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { maskInputMoney, maskMoneyNumber } from "../../utils/mask"



export default function ActiveTransactionModal(props) {

    const token = jwt.decode(Cookie.get('auth'));

    const dispatch = useDispatch()


    const {setIncomeSelected ,incomeSelected, categories, data, dateSelected } = useStateContext()

    const [accountSelected, setAccountSelected] = useState(null)
    const [newValue, setNewValue] = useState(incomeSelected?.value)
    const [editValueCheck, setEditValueCheck] = useState(false)

    useEffect(() => {

        const value = data?.accounts?.find(elem1 => elem1._id === incomeSelected?.account_id);
        setAccountSelected(value)

        setNewValue(incomeSelected?.value.toString())

    }, [incomeSelected])


    const brlMoney = {
        format: (value) => value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const handleActive = async () => {

        const data = {
            user_id: token.sub,
            income_id: incomeSelected?._id,
            value:  maskMoneyNumber(newValue),
            dateSelected
        }

        await axios.post(`/api/transactions/activeValue`, data)
            .then(res => {
                dispatch(newData(true))
            })

    }

    return (
        <div class="modal fade" id={"activeTransactionModal"} tabindex="-1" aria-labelledby="activeTransactionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="activeTransactionModalLabel">Confirmar transação</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <span>A transação abaixo foi efetivada?</span>

                            </div>
                            <div className=" my-2 col-12 col-md-6 text-center">
                                <span className="small">Descrição:</span><br />
                                <span className=" bold">{incomeSelected?.description}</span>

                            </div>
                            <div className=" my-2 col-12 col-md-6 d-flex justify-content-center align-items-center">

                                <div className="text-center">

                                    <span className="small">Conta:</span><br />
                                    {!incomeSelected?.account_id ?
                                        <span class=" px-2 py-1  small rounded-pill border">
                                            Sem conta
                                        </span>
                                        :
                                        <>
                                            <span
                                                className={`cardAnimation px-2 py-1 small rounded-pill text-white fw-bold`}

                                                style={{ backgroundColor: accountSelected?.color }}>
                                                <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={20} height={20} />
                                                {accountSelected?.description}
                                            </span>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className=" my-2 col-12 col-md-6 d-flex justify-content-center">

                                <div className="text-center">
                                    <span className="small text-center">Subcategoria:</span><br />

                                    <TagSelected subCategory_id={incomeSelected?.subCategory_id} categories={categories} />
                                </div>

                            </div>
                            {!editValueCheck ?
                                <div className={` text-center   my-2 col-12 col-md-6`}>
                                    <span className="small">Valor:</span><br />
                                    <span className={`fs-5  ${incomeSelected?.type === 'expense' ? 'text-c-danger' : 'text-c-success'}`}>
                                        {incomeSelected?.type === 'expense' && '-'}{incomeSelected?.type === 'income' && '+'}R$ {maskInputMoney(newValue)} <br />
                                    </span>
                                    <button className="btn btn-sm btn-c-outline-tertiary"
                                        onClick={() => { setEditValueCheck(true); setNewValue(incomeSelected?.value) }}>
                                        Editar valor
                                    </button>
                                </div>
                                :
                                <div className={` text-center   my-2 col-12 col-md-6`}>
                                    <span className="small">Novo Valor:</span><br />
                                    <div className="input-group">
                                        <span className="input-group-text">R$</span>

                                        <input inputMode="numeric"
                                            type="text" placeholder="0,00"
                                            className="form-control"
                                            value={maskInputMoney((newValue).toString())}
                                            onChange={(e) => setNewValue(e.target.value)}
                                        />

                                    </div>
                                    <div className="btn-group mt-2">

                                        <button class="btn btn-outline-secondary" type="button"
                                            onClick={() => {setEditValueCheck(false); setNewValue(incomeSelected?.value.toString())}}>
                                            <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                        </button>
                                        <button class="btn btn-outline-secondary" type="button" onClick={() => setEditValueCheck(false)}>
                                            <FontAwesomeIcon icon={faCheck} className="pulse text-c-success" />
                                        </button>
                                    </div>
                                </div>
                            }


                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-c-tertiary" data-bs-dismiss="modal" onClick={()=> setIncomeSelected(null)}>Cancelar</button>
                        <button type="button" className="btn btn-sm btn-c-success" data-bs-dismiss="modal" onClick={handleActive}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )





}