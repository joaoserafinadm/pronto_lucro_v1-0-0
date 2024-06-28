import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../components/icons";
import { faCalendar, faCalendarDays, faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
import { faArrowDown, faCalendarWeek, faChevronDown, faChevronRight, faCommentDollar, faMicrophone, faMoneyBill, faQuoteLeft, faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { maskInputMoney } from "../../utils/mask";
import { dateFormat, dateObject } from "../../utils/handleDate";
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
import TagSelectModal from "../incomeAdd/TagSelectModal";
import Modal, { showModal } from "../components/Modal";

const IncomeAddPage = forwardRef((props, ref) => {

    const token = jwt.decode(Cookie.get('auth'));

    const router = useRouter()

    const [value, setValue] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentDate, setPaymentDate] = useState(dateObject(new Date()));
    const [competenceMonth, setCompetenceMonth] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [parcels, setParcels] = useState(1);
    const [earlyValue, setEarlyValue] = useState('');
    const [earlyValueTax, setEarlyValueTax] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([])

    useEffect(() => {
        dataFunction(token.sub)
    }, [])

    const dataFunction = async (user_id) => {

        await axios.get(`${baseUrl()}/api/incomeAdd`, {
            params: {
                user_id
            }
        }).then(res => {
            setTags(res.data.tags)
        }).catch(e => {
            console.log(e)
        })
    }



    useEffect(() => {

        (paymentDate === dateObject(new Date()) || paymentDate === dateObject(new Date(), -1))

        console.log('paymentDate', paymentDate, dateObject(new Date()), paymentDate === dateObject(new Date()))

    }, [paymentDate.day])




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
                    paymentDate,
                    paymentMethod,
                    competenceMonth,
                    parcels,
                    earlyValue,
                    earlyValueTax,
                    description
                };

                console.log("data", data)
                // return
                try {
                    const res = await axios.post(`${baseUrl()}/api/incomeAdd`, data);
                    props.setLoadingSave(false);
                    router.push('/transactions')
                } catch (e) {
                    props.setLoadingSave(false);
                }
            } else {
                scrollTo('pageTop');
                props.setLoadingSave(false);
            }
        }
    }));

    const isToday = (date) => {

        const today = dateObject(new Date());
        const aDaysAgo = dateObject(new Date(), -1);

        if (date.day === today.day && date.month === today.month && date.year === today.year) {
            return true
        } else if (date.day === aDaysAgo.day && date.month === aDaysAgo.month && date.year === aDaysAgo.year) {
            return true
        } else {
            return false
        }
    }



    return (
        // <Modal id='addIncomeModal' size="modal-xl">


        <div class="modal fade" id="addIncomeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div id="pageTop" />

                    <div className="row px-3 my-2">
                        <div className="col-12 ">
                            <span className="small text-white bold rounded-pill px-2 py-1 ctm-bg-success">Valor da receita</span>
                        </div>
                        <div className="col-12 mt-2 d-flex justify-content-between">
                            <div className="d-flex fs-1 pe-2 align-items-center">
                                <span className="me-1">R$</span>
                                <input type="text" inputMode="numeric" placeholder="0,00"
                                    className="form-control fs-2 " style={{ borderColor: '#00cc99' }}
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
                                        <div className="col-12">

                                            <FontAwesomeIcon icon={faMoneyBill} />
                                            <span className="small fw-bold mb-2 ms-3">Forma de pagamento</span>
                                        </div>

                                        <div className="col-12 d-flex flex-wrap">
                                            {!paymentMethod ?
                                                <>
                                                    <span type="button" onClick={() => setPaymentMethod(1)}
                                                        class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${paymentMethod === 1 ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                                        Dinheiro
                                                    </span>
                                                    <span type="button" onClick={() => setPaymentMethod(2)}
                                                        class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${paymentMethod === 2 ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                                        Cartão de crédito
                                                    </span>
                                                </>
                                                :
                                                <span type="button"
                                                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ctm-bg-success`}>
                                                    {paymentMethodOptions.find(elem => elem.id === paymentMethod)?.description}
                                                </span>

                                            }
                                            <span type="button" onClick={() => showModal('paymentMethodSelectModal')}
                                                class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill  ctm-bg-primary`}>
                                                Outros...
                                            </span>


                                            <PaymentMethodSelectModal paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />



                                        </div>
                                        {/* <div className="text-center" style={{ width: "40px" }}>

                                </div> */}
                                    </div>



                                    <PaymentMethodConfig paymentMethod={paymentMethod} />

                                    <hr />
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12">
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            <span className="small fw-bold mb-2 ms-3">Data de pagamento</span>

                                        </div>

                                        <div className="col-12 mt-2 d-flex">
                                            {isToday(paymentDate) ?
                                                <>
                                                    <span type="button" onClick={() => setPaymentDate(dateObject(new Date()))}
                                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) == JSON.stringify(dateObject(new Date())) ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                                        Hoje
                                                    </span>
                                                    <span onClick={() => setPaymentDate(dateObject(new Date(), -1))}
                                                        class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) == JSON.stringify(dateObject(new Date(), -1)) ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                                        Ontem
                                                    </span>
                                                </>
                                                :
                                                <span data-bs-toggle="modal" data-bs-target="#datePickerModal"
                                                    className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-success`}>
                                                    {dateFormat(paymentDate)}
                                                </span>
                                            }
                                            <span data-bs-toggle="modal" data-bs-target="#datePickerModal"
                                                className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary`}>
                                                Outro
                                            </span>
                                        </div>


                                        <DatePickerModal title="Data da receita" date={paymentDate} setDate={setPaymentDate} />

                                    </div>
                                    <hr />
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12">
                                            <FontAwesomeIcon icon={faCalendarWeek} />
                                            <span className="small fw-bold mb-2 ms-3">Mês de competência</span>
                                        </div>

                                        <div className="col-12 d-flex justify-content-center mt-2">

                                            <MonthSelect
                                                setMonth={value => { setCompetenceMonth(value) }}
                                            />
                                        </div>


                                    </div>



                                    <hr />

                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12">

                                            <FontAwesomeIcon icon={faQuoteLeft} />
                                            <span className="small fw-bold mb-2 ms-3">Descrição</span>

                                        </div>
                                        <div className="col-12 mt-2 d-flex">
                                            <div className="input-group">

                                                <input type="text" class="form-control" placeholder="Descrição"
                                                    value={description} onChange={(e) => setDescription(e.target.value)} />
                                                <span className="input-group-text"><FontAwesomeIcon icon={faChevronDown} /></span>
                                            </div>
                                            {/* <div className="text-center d-flex align-items-center justify-content-center" style={{ width: "40px" }}>
                                        <FontAwesomeIcon icon={faMicrophone} />

                                    </div> */}
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12">
                                            <FontAwesomeIcon icon={faTag} />
                                            <span className="small fw-bold mb-2 ms-3">Marcador</span>
                                        </div>
                                        <div className="col-12 mt-2 d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#tagSelectModal">
                                            <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-warning">
                                                Vendas online
                                            </span>
                                            <div className="text-center text-secondary" style={{ width: "40px" }}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </div>
                                        </div>

                                        <TagSelectModal tags={tags} />
                                    </div>

                                    <hr />

                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12">

                                            <FontAwesomeIcon icon={faWallet} />
                                            <span className="small fw-bold mb-2 ms-3">Carteira</span>
                                        </div>
                                        <div className="col-12 mt-2 d-flex justify-content-between">
                                            <span class=" px-3 py-1 border border-rounded   small mx-1 rounded-pill ">
                                                <img src="/logo-sicredi.png" className="rounded-circle me-1" height={15} alt="" /> Sicredi
                                            </span>
                                            <div className="text-center text-secondary" style={{ width: "40px" }}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12">

                                            <FontAwesomeIcon icon={faImage} />
                                            <span className="small fw-bold mb-2 ms-3">Anexo</span>
                                        </div>

                                        <div className="col-12 mt-2 d-flex justify-content-between">
                                            <span class=" px-2 py-1  small mx-1 rounded-pill ">
                                                Arquivo
                                            </span>
                                            <div className="text-center text-secondary" style={{ width: "40px" }}>
                                                <FontAwesomeIcon icon={faChevronRight} />

                                            </div>
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
            </div>
        </div>

        // </Modal >
    )
}
)


export default IncomeAddPage