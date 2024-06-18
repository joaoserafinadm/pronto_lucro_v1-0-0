import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../components/icons";
import { faCalendar, faCalendarDays, faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
import { faCalendarWeek, faCommentDollar, faMicrophone, faMoneyBill, faQuoteLeft, faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { maskInputMoney } from "../../utils/mask";
import { dateObject } from "../../utils/handleDate";
import Calendar from 'react-calendar';
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import removeInputError from "../../utils/removeInputError";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import scrollTo from "../../utils/scrollTo";
import { useRouter } from "next/router";
import PaymentMethodSelectModal from "../incomeAdd/PaymentMethodSelectModal";
import paymentMethodOptions from '../incomeAdd/paymentMethodOptions.json'
import PaymentMethodConfig from "../incomeAdd/PaymentMethodConfig";
import MonthSelect from "../incomeAdd/MonthSelect";
import DatePickerModal from "../components/datePicker/DatePickerModal";

const IncomeAddPage = forwardRef((props, ref) => {

    const token = jwt.decode(Cookie.get('auth'));

    const router = useRouter()

    const [value, setValue] = useState('');
    const [date, setDate] = useState(dateObject(new Date()));
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [parcels, setParcels] = useState(1);
    const [earlyValue, setEarlyValue] = useState('');
    const [earlyValueTax, setEarlyValueTax] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        console.log("date", date);
        console.log("date2", dateObject(new Date()));
    }, [date]);

    const validate = () => {

        removeInputError();

        let valueError = '';

        if (value === '') valueError = 'Campo obrigatório';

        if (valueError) {
            document.getElementById('valueInput').classList.add('inputError');
            return false;
        } else {
            return true;
        }
    };

    useImperativeHandle(ref, () => ({
        async handleSave() {
            props.setLoadingSave(true);

            const isValid = validate();

            if (isValid) {
                const data = {
                    user_id: token.sub,
                    value,
                    date,
                    paymentMethod,
                    parcels,
                    earlyValue,
                    earlyValueTax,
                    description
                };
                return
                // try {
                //     const res = await axios.post(`${baseUrl()}/api/incomeAdd`, data);
                //     props.setLoadingSave(false);
                //     router.push('/transactions')
                // } catch (e) {
                //     props.setLoadingSave(false);
                // }
            } else {
                scrollTo('pageTop');
                props.setLoadingSave(false);
            }
        }
    }));



    return (
        <div className="">



            <PaymentMethodSelectModal paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

            <DatePickerModal title="Data da receita" date={date} setDate={setDate} />


            <div id="pageTop" />

            <div className="row px-3 my-2">
                <div className="col-12 ">
                    <span className="small">Valor da receita</span>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="d-flex fs-1 pe-2 align-items-center">
                        <span className="me-1">R$</span>
                        <input type="text" inputMode="numeric" placeholder="0,00"
                            className="form-control fs-2"
                            value={value} id='valueInput'
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
                                <span className="small fw-bold mb-2 ms-5">Forma de pagamento</span>
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                </div>
                                <div className="col d-flex">
                                    {!paymentMethod ?
                                        <>
                                            <span type="button" onClick={() => setPaymentMethod(1)}
                                                class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${paymentMethod === 1 ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                                Dinheiro
                                            </span>
                                            <span type="button" onClick={() => setPaymentMethod(2)}
                                                class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${paymentMethod === 2 ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                                Cartão de crédito
                                            </span>
                                        </>
                                        :
                                        <span type="button"
                                            class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-success`}>
                                            {paymentMethodOptions.find(elem => elem.id === paymentMethod)?.description}
                                        </span>

                                    }
                                    <span type="button" data-bs-toggle="modal" data-bs-target="#paymentMethodSelectModal"
                                        // class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${paymentMethod !== 'cash' && paymentMethod !== 'credit' ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill  ctm-bg-primary`}>
                                        Outros...
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>



                            <PaymentMethodConfig paymentMethod={paymentMethod} />

                            <hr />
                            <div className="row d-flex justify-content-between">
                                <span className="small fw-bold mb-2 ms-5">Data de pagamento</span>

                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faCalendarDays} />
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
                                    <span data-bs-toggle="modal" data-bs-target="#datePickerModal"
                                        className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary`}>
                                        Outro
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>
                            <hr />
                            <div className="row d-flex justify-content-between">
                                <span className="small fw-bold mb-2 ms-5">Mês de competência</span>

                                <div className="row">

                                    <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                        <FontAwesomeIcon icon={faCalendarWeek} />
                                    </div>

                                    <MonthSelect />
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
)


export default IncomeAddPage