import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../components/icons";
import { faCalendar, faCalendarDays, faClipboard, faFilePdf, faImage } from "@fortawesome/free-regular-svg-icons";
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
import { showModal } from "../components/Modal";
import { showModalBs } from "../../utils/modalControl";
import StyledDropzone from "../components/styledDropzone/StyledDropzone";
import { createImageUrl } from "../../utils/createImageUrl";
import { useDispatch } from "react-redux";
import { newData } from "../../store/NewData/NewData.action";
import BankAccountsModal from "./BankAccountsModal";
import TagSelectedComponent from "./TagSelectedComponent";



export default function ExpenseAddModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const router = useRouter()

    const [value, setValue] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentDate, setPaymentDate] = useState(dateObject(new Date()));
    const [competenceMonth, setCompetenceMonth] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [creditConfig, setCreditConfig] = useState('')
    const [description, setDescription] = useState('');
    const [tagSelected, setTagSelected] = useState(null);
    const [files, setFiles] = useState(null)
    const [bankAccounts, setBankAccounts] = useState([])
    const [accountSelected, setAccountSelected] = useState(null)


    const [tags, setTags] = useState([])
    const [loadingSave, setLoadingSave] = useState(false)

    const [valueError, setValueError] = useState('')


    useEffect(() => {
        dataFunction(token.sub)
    }, [])

    const dataFunction = async (user_id) => {

        await axios.get(`${baseUrl()}/api/incomeAdd`, {
            params: {
                user_id
            }
        }).then(res => {
            setTags(res.data.expenseTags)
            setBankAccounts(res.data.bankAccounts)

        }).catch(e => {
            console.log(e)
        })
    }



    useEffect(() => {

        (paymentDate === dateObject(new Date()) || paymentDate === dateObject(new Date(), -1))

    }, [paymentDate.day])




    const validate = () => {

        removeInputError();
        setValueError('')

        let valueError = '';

        if (value === '') valueError = 'Campo obrigatório';

        if (valueError) {
            setValueError(valueError)
            document.getElementById('valueInput').classList.add('inputError');
            return false;
        } else {
            return true;
        }
    };


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

    const handleSave = async () => {


        setLoadingSave(true);

        const isValid = validate();

        if (isValid) {
            try {

                let attachment = ''

                if (files) attachment = await createImageUrl([files], 'ATTACHMENTS')

                const data = {
                    user_id: token.sub,
                    section: 'expense',
                    value,
                    paymentDate,
                    paymentMethod,
                    competenceMonth,
                    description,
                    tag_id: tagSelected ? tagSelected._id : '',
                    account_id: accountSelected ? accountSelected._id : '',
                    files: attachment,
                    creditConfig
                };

                if (paymentMethod === 2) {
                    const res = await axios.post(`${baseUrl()}/api/incomeAdd/creditPayment`, data)
                        .then(res => {
                            dispatch(newData(true))
                            initialValues()
                            router.push('/transactions')
                        }).catch(e => {
                            showModalBs("expenseAddModal")
                            scrollTo('expenseAddModal');
                            setLoadingSave(false);
                        });
                } else {
                    const res = await axios.post(`${baseUrl()}/api/incomeAdd`, data)
                        .then(res => {
                            dispatch(newData(true))
                            console.log('vai')
                            initialValues()
                            router.push('/transactions')
                        }).catch(e => {
                            showModalBs("expenseAddModal")
                            scrollTo('expenseAddModal');
                            setLoadingSave(false);
                        });
                }
                setLoadingSave(false);

            } catch (e) {
                showModalBs("expenseAddModal")
                setLoadingSave(false);
            }
        } else {

            showModalBs("expenseAddModal")
            scrollTo('expenseAddModal');
            setLoadingSave(false);
        }
    }


    const initialValues = () => {

        setValue('')
        setPaymentMethod(null)
        setPaymentDate(dateObject(new Date()))
        setCompetenceMonth({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        })
        setCreditConfig('')
        setDescription('')
        setTagSelected(null)
        setFiles(null)
        setValueError('')
        removeInputError()

        return
    }



    return (
        <div class="modal fade" id="expenseAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div className="modal-body px-0" style={{ overflowX: 'hidden' }}>

                        <div id="pageTop" />

                        <div className="row px-3 my-2">
                            <div className="col-12 ">
                                <span className=" text-white bold rounded-pill px-2 py-1 ctm-bg-danger">Valor da despesa</span>
                            </div>
                            <div className="col-12 mt-2 d-flex justify-content-between">
                                <div className="d-flex fs-1 pe-2 align-items-center">
                                    <span className="me-1">R$</span>
                                    <input type="text" inputMode="numeric" placeholder="0,00"
                                        className="form-control fs-2 " style={{ borderColor: '#f2545b' }}
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
                                            <li className="dropdown-item">BRL</li>
                                            <li className="dropdown-item">USD</li>
                                            <li className="dropdown-item">EUR</li>
                                            <hr />
                                            <li className="dropdown-item">Outras...</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <span className="text-danger small">{valueError}</span>

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
                                                            class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${paymentMethod === 1 ? 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                                                            Dinheiro
                                                        </span>
                                                        <span type="button" onClick={() => setPaymentMethod(2)}
                                                            class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${paymentMethod === 2 ? 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                                                            Cartão de crédito
                                                        </span>
                                                    </>
                                                    :
                                                    <span type="button"
                                                        class={`cardAnimation bold px-2 py-1 m-2 text-white small mx-1 rounded-pill ctm-bg-danger`}>
                                                        {paymentMethodOptions.find(elem => elem.id === paymentMethod)?.description}
                                                    </span>

                                                }
                                                <span type="button" onClick={() => showModal('paymentMethodSelectModalExpense')}
                                                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill  ctm-bg-primary`}>
                                                    Outros...
                                                </span>


                                                <PaymentMethodSelectModal paymentMethod={paymentMethod}
                                                    setPaymentMethod={setPaymentMethod}
                                                    id="paymentMethodSelectModalExpense"
                                                    section="expense" />



                                            </div>
                                        </div>



                                        <PaymentMethodConfig paymentMethod={paymentMethod}
                                            setCreditConfig={setCreditConfig}
                                            section="expense" />

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
                                                            class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) == JSON.stringify(dateObject(new Date())) ? 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                                                            Hoje
                                                        </span>
                                                        <span onClick={() => setPaymentDate(dateObject(new Date(), -1))}
                                                            class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) == JSON.stringify(dateObject(new Date(), -1)) ? 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                                                            Ontem
                                                        </span>
                                                    </>
                                                    :
                                                    <span onClick={() => showModal('datePickerModalExpense')}
                                                        className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill bold ctm-bg-danger`}>
                                                        {dateFormat(paymentDate)}
                                                    </span>
                                                }
                                                <span onClick={() => showModal('datePickerModalExpense')}
                                                    className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary`}>
                                                    Outro
                                                </span>
                                            </div>


                                            <DatePickerModal
                                                title="Data da receita"
                                                date={paymentDate}
                                                setDate={setPaymentDate}
                                                id="datePickerModalExpense"
                                                section="expense" />

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
                                                </div>

                                            </div>
                                        </div>

                                        <hr />

                                        <div className="row d-flex justify-content-between" >
                                            <div className="col-12">
                                                <FontAwesomeIcon icon={faTag} />
                                                <span className="small fw-bold mb-2 ms-3">Marcador</span>
                                            </div>
                                            <TagSelectedComponent tagSelected={tagSelected} type="Expense"/>


                                            <TagSelectModal
                                                tags={tags}
                                                setTagSelected={setTagSelected}
                                                dataFunction={() => dataFunction(token.sub)}
                                                id="tagSelectModalExpense"
                                                section="expenseTags" />
                                        </div>

                                        <hr />

                                        <div className="row d-flex justify-content-between">
                                            <div className="col-12">

                                                <FontAwesomeIcon icon={faWallet} />
                                                <span className="small fw-bold mb-2 ms-3">Conta</span>
                                            </div>
                                            <div className="col-12 mt-2 d-flex justify-content-between" onClick={() => showModal('bankAccountsExpenseModal')}>
                                                {!accountSelected ?
                                                    <span type="button"
                                                        class=" px-2 py-1  small mx-1 rounded-pill border pulse shadow">
                                                        Selecionar Conta
                                                    </span>
                                                    :
                                                    <>
                                                        <div className="row">
                                                            <div>
                                                                <span type="button" onClick={() => showModal('bankAccountsExpenseModal')}
                                                                    className={`cardAnimation px-2 py-1  text-white small mx-1 rounded-pill fw-bold `}
                                                                    style={{ backgroundColor: accountSelected.color }}>
                                                                    <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={20} height={20} />
                                                                    {accountSelected.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </div>
                                            </div>

                                            <BankAccountsModal
                                                bankAccounts={bankAccounts}
                                                setAccountSelected={setAccountSelected}
                                                id="bankAccountsExpenseModal" />
                                        </div>

                                        <hr />
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-12">

                                                <FontAwesomeIcon icon={faImage} />
                                                <span className="small fw-bold mb-2 ms-3">Anexo</span>
                                            </div>

                                            <div className="col-12 mt-2 d-flex justify-content-between">

                                                <StyledDropzone setFiles={array => { setFiles(array[0]); console.log(array) }} >
                                                    <div className="px-2 text-center fadeItem bg-light  py-5 text-secondary rounded " style={{ border: '1px dashed #ccc', width: "100%" }}>
                                                        <span>
                                                            Clique aqui ou arraste o arquivo
                                                        </span> <br />
                                                        <span className="small">
                                                            Permitido apenas um arquivo. Formato: .PNG, .JPG, .PDF.
                                                        </span><br />

                                                    </div>
                                                </StyledDropzone>


                                                {/* <div className="text-center text-secondary" style={{ width: "40px" }}>
                                                    <FontAwesomeIcon icon={faChevronRight} />

                                                </div> */}
                                            </div>
                                            {files && (
                                                <div className="col-12 mt-2 fadeItem">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-12 d-flex">
                                                                    <div className="d-flex align-items-center justify-content-center" style={{ width: "40px" }}>
                                                                        {files?.type?.startsWith('image/') ?
                                                                            <div>
                                                                                <img src={URL.createObjectURL(files)} className="border border-rounded " height={40} alt="" />
                                                                            </div>
                                                                            :

                                                                            <FontAwesomeIcon icon={faFilePdf} className="fs-3 text-secondary" />
                                                                        }

                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="row">
                                                                            <span className="small ms-3 bold">{files.name}</span>
                                                                            <span className="small ms-3 text-secondary">{(files.size / 1000000).toFixed(2)}Mb</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center justify-content-center" style={{ width: "40px" }}>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            onClick={() => setFiles(null)}
                                                                            aria-label="Close"
                                                                        ></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>

                                        <hr />

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row mt-3 d-flex justify-content-between">

                            <div className="col-12 d-flex justify-content-center">
                                <span className="span bold text-secondary">Mais detalhes</span>
                            </div>

                        </div> */}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-custom-tertiary"
                            data-bs-dismiss="modal"
                            onClick={() => initialValues()}>
                            Cancelar
                        </button>
                        <button className="btn btn-custom-danger"
                            data-bs-dismiss="modal"
                            onClick={() => handleSave()}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}