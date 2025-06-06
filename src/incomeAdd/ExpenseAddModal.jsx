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
import { useDispatch, useSelector } from "react-redux";
import { newData } from "../../store/NewData/NewData.action";
import BankAccountsModal from "./BankAccountsModal";
import TagSelectedComponent from "./TagSelectedComponent";
import CurrencySelect from "./currencySelect";
import currencies from "../../utils/currencies.json"
import DescriptionInput from "./descriptionInput";
import CategorySelectedComponent from "./categorySelectedComponent";
import CategorySelectModal from "./categorySelectModal";
import Periodicity from "./Periodicity";



export default function ExpenseAddModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const newDataStore = useSelector(state => state.newData)

    useEffect(() => {
        if (newDataStore) dataFunction(token.sub)
        dispatch(newData(false))

    }, [newDataStore])

    const router = useRouter()

    const [value, setValue] = useState('');
    const [currencyId, setCurrencyId] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [paymentDate, setPaymentDate] = useState(dateObject(new Date()));
    const [competenceMonth, setCompetenceMonth] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [creditConfig, setCreditConfig] = useState('')
    const [description, setDescription] = useState('');
    const [subCategorySelected, setSubCategorySelected] = useState(null);
    const [files, setFiles] = useState(null)
    const [bankAccounts, setBankAccounts] = useState([])
    const [accountSelected, setAccountSelected] = useState(null)
    const [creditNetworkTaxes, setCreditNetworkTaxes] = useState([])

    const [periodicity, setPeriodicity] = useState('Único');
    const [periodicityConfig, setPeriodicityConfig] = useState(null);

    const [active, setActive] = useState(true)

    const [categories, setCategories] = useState([])
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
            setCategories(res.data.expenseCategories)
            setBankAccounts(res.data.bankAccounts)
            setCreditNetworkTaxes(res.data.creditNetworkTaxes)

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
                    subCategory_id: subCategorySelected ? subCategorySelected.tag_id : '',
                    account_id: accountSelected ? accountSelected._id : '',
                    files: attachment,
                    periodicity,
                    periodicityConfig,
                    // creditConfig,
                    active
                };

                if (paymentMethod === 2) {
                    const res = await axios.post(`${baseUrl()}/api/incomeAdd/creditPayment`, data)
                        .then(res => {
                            dispatch(newData(true))
                            initialValues()
                            // router.push('/transactions')
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
                            // router.push('/transactions')
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
        setActive(true)
        setPaymentMethod(1)
        setPaymentDate(dateObject(new Date()))
        setCompetenceMonth({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        })
        setCreditConfig('')
        setDescription('')
        setSubCategorySelected(null)
        setFiles(null)
        setValueError('')
        removeInputError()

        return
    }

    const currency = currencies.find(elem => elem.id === currencyId)


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
                                <div className="d-flex w-100 fs-1 pe-2 align-items-center">
                                    <span className="me-1">{currency.symbol}</span>

                                    <input type="text" inputMode="numeric" placeholder="0,00"
                                        className="form-control fs-2 " style={{ borderColor: '#f2545b' }}
                                        value={value} id='valueInput'
                                        onChange={e => setValue(maskInputMoney(e.target.value))} />
                                </div>
                                {/* <CurrencySelect setCurrencyId={setCurrencyId} currencyId={currencyId} /> */}

                            </div>
                            <span className="text-danger small">{valueError}</span>

                            <div className="col-12 mt-3 d-flex">
                                <div class="form-check form-switch">
                                    <input class="form-check-input form-check-input-expense" type="checkbox" role="switch" id="activeExpenseInput" checked={active} onClick={() => setActive(!active)} />
                                    <label type="button" class={`form-check-label ${active ? 'bold' : ''}`} for="activeExpenseInput" >Foi paga</label>
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



                                        {/* <PaymentMethodConfig
                                            value={value}
                                            paymentMethod={paymentMethod}
                                            setCreditConfig={setCreditConfig}
                                            categories={categories}
                                            creditNetworkTaxes={creditNetworkTaxes}
                                            section="expense" /> */}

                                        <hr />


                                        <Periodicity
                                            value={value}
                                            type="expense"
                                            periodicity={periodicity}
                                            setPeriodicity={setPeriodicity}
                                            periodicityConfig={periodicityConfig}
                                            setPeriodicityConfig={setPeriodicityConfig}
                                        />


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
                                                        <span type="button" onClick={() => setPaymentDate(dateObject(new Date(), -1))}
                                                            class={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) == JSON.stringify(dateObject(new Date(), -1)) ? 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                                                            Ontem
                                                        </span>
                                                    </>
                                                    :
                                                    <span type="button" onClick={() => showModal('datePickerModalExpense')}
                                                        className={`cardAnimation px-2 py-1 text-white small mx-1 rounded-pill bold ctm-bg-danger`}>
                                                        {dateFormat(paymentDate)}
                                                    </span>
                                                }
                                                <span type="button" onClick={() => showModal('datePickerModalExpense')}
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
                                                <DescriptionInput setDescription={setDescription} description={description} />


                                            </div>
                                        </div>

                                        <hr />

                                        <div className="row d-flex justify-content-between" >
                                            <div className="col-12">
                                                <FontAwesomeIcon icon={faTag} />
                                                <span className="small fw-bold mb-2 ms-3">Categoria</span>
                                            </div>

                                            <CategorySelectedComponent subCategorySelected={subCategorySelected} categories={categories} type="Expense" />

                                            <CategorySelectModal
                                                categories={categories}
                                                setSubCategorySelected={setSubCategorySelected}
                                                dataFunction={() => dataFunction(token.sub)}
                                                id="tagSelectModalExpense"
                                                section="expense" />

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
                        <button className="btn btn-c-tertiary"
                            data-bs-dismiss="modal"
                            onClick={() => initialValues()}>
                            Cancelar
                        </button>
                        <button className="btn btn-c-danger"
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