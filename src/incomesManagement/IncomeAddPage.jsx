import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../components/icons";
import { faCalendar, faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
import { faCommentDollar, faMicrophone, faMoneyBill, faQuoteLeft, faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { maskInputMoney } from "../../utils/mask";
import { dateObject } from "../../utils/handleDate";
import Calendar from 'react-calendar';


export default function IncomeAddPage() {

    const [value, setValue] = useState('')
    const [date, setDate] = useState(dateObject(new Date()))
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [parcels, setParcels] = useState(1)
    const [earlyValue, setEarlyValue] = useState('')
    const [earlyValueTax, setEarlyValueTax] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
        console.log("date", date)
        console.log("date2", dateObject(new Date()))
    }, [date])

    return (
        <div>



            <div className="row px-3 my-2">
                <div className="col-12 ">
                    <span className="small">Valor da receita</span>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="d-flex fs-1 pe-2 align-items-center">
                        <span className="me-1">R$</span>
                        <input type="text" inputMode="numeric" placeholder="0,00"
                            className="form-control fs-2"
                            value={value}
                            onChange={e => setValue(maskInputMoney(e.target.value))} />
                    </div>
                    <div className="d-flex fs-3 align-items-center">
                        <div class="dropdown">
                            <span class=" dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                BRL
                            </span>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><span className="ms-2 small text-secondary">Favoritas</span></li>
                                <li><a class="dropdown-item" href="#">BRL</a></li>
                                <li><a class="dropdown-item" href="#">USD</a></li>
                                <li><a class="dropdown-item" href="#">EUR</a></li>
                                <hr />
                                <li><a class="dropdown-item" href="#">Outras...</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-12">

                    <div className="card shadow">
                        <div className="card-body">

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                </div>
                                <div className="col d-flex">
                                    <span type="button" onClick={() => setPaymentMethod('cash')}
                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${paymentMethod === 'cash' ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        À Vista
                                    </span>
                                    <span type="button" onClick={() => setPaymentMethod('credit')}
                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${paymentMethod === 'credit' ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        À Prazo
                                    </span>
                                    <span type="button"
                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${paymentMethod !== 'cash' && paymentMethod !== 'credit' ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        Outros...
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>
                            {paymentMethod === 'credit' && (
                                <div className="row mt-3 d-flex justify-content-between fadeItem">
                                    <div className="input-group input-group-sm">

                                        <span htmlFor="" className="input-group-text">nº de parcelas</span>
                                        <select name="" id="" className="form-select text-center" value={parcels} onChange={(e) => setParcels(e.target.value)}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                            <option value={11}>11</option>
                                            <option value={12}>12</option>
                                        </select>
                                    </div>
                                    <div className="input-group input-group-sm mt-3">

                                        <span htmlFor="" className="input-group-text">Valor antecipado</span>
                                        <span htmlFor="" className="input-group-text">R$</span>
                                        <input type="text" className="form-control text-end" placeholder="0,00"
                                            value={earlyValue} onChange={(e) => setEarlyValue(maskInputMoney(e.target.value))} />
                                    </div>
                                    {earlyValue && (

                                        <div className="input-group input-group-sm mt-3 fadeItem">

                                            <span htmlFor="" className="input-group-text">Taxa</span>
                                            <span htmlFor="" className="input-group-text">R$</span>

                                            <input type="text" className="form-control text-end" placeholder="0,00"
                                                value={earlyValueTax} onChange={(e) => setEarlyValueTax(maskInputMoney(e.target.value))} />
                                        </div>
                                    )}

                                </div>

                            )}

                            <hr />
                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                </div>
                                <div className="col d-flex">
                                    <span type="button" onClick={() => setDate(dateObject(new Date()))}
                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(date) == JSON.stringify(dateObject(new Date())) ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        Hoje
                                    </span>
                                    <span onClick={() => setDate(dateObject(new Date(), -1))}
                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(date) == JSON.stringify(dateObject(new Date(), -1)) ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        Ontem
                                    </span>
                                    <span className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(date) != JSON.stringify(dateObject(new Date(), -1)) && JSON.stringify(date) != JSON.stringify(dateObject(new Date())) ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        Outros...
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>



                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faQuoteLeft} />
                                </div>
                                <div className="col d-flex">
                                    <input type="text" class="form-control" placeholder="Descrição"
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faMicrophone} />

                                </div>
                            </div>

                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faTag} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-warning">
                                        Vendas online
                                    </span>
                                </div>
                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                    <Icons icon='a-r' />
                                </div>
                            </div>

                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faWallet} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1  small mx-1 rounded-pill ">
                                        <img src="/logo-sicredi.png" className="rounded-circle me-1" height={15} alt="" /> Sicredi
                                    </span>
                                </div>
                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                    <Icons icon='a-r' />
                                </div>
                            </div>

                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1  small mx-1 rounded-pill ">
                                        Anexo
                                    </span>
                                </div>
                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                    <Icons icon='a-r' />
                                </div>
                            </div>

                            <hr />

                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3 d-flex justify-content-between">

                <div className="col-12 d-flex justify-content-center">
                    <span className="span bold text-secondary">Mais detalhes</span>
                </div>

            </div>
        </div>
    )
}