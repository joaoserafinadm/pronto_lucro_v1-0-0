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
import { showModal } from "../components/Modal";
import { showModalBs } from "../../utils/modalControl";
import StyledDropzone from "../components/styledDropzone/StyledDropzone";
import { createImageUrl } from "../../utils/createImageUrl";
import { useDispatch } from "react-redux";
import { newData } from "../../store/NewData/NewData.action";
import BankAccountsModal from "../incomeAdd/BankAccountsModal";
import CurrencySelect from "../incomeAdd/currencySelect";
import currencies from "../../utils/currencies.json"
import DescriptionInput from "../incomeAdd/descriptionInput";
import CategorySelectedComponent from "../incomeAdd/categorySelectedComponent";
import CategorySelectModal from "../incomeAdd/categorySelectModal";
import { useStateContext } from "./context/transactionsContext";



export default function EditExpenseModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const { setIncomeSelected, incomeSelected } = useStateContext()

    const router = useRouter()

    const [value, setValue] = useState('');
    const [currencyId, setCurrencyId] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(null);
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

    const [editConfig, setEditConfig] = useState('1')

    const [active, setActive] = useState(true)


    const [categories, setCategories] = useState([])
    const [loadingSave, setLoadingSave] = useState(false)

    const [valueError, setValueError] = useState('')

    const brlNumber = {
        format: (value) => value.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }



    useEffect(() => {
        dataFunction(token.sub)
    }, [])

    useEffect(() => {
        if (incomeSelected) {

            setEditConfig('1')

            const valueIn = brlNumber.format(incomeSelected.value)

            const categorySelected = categories.find(elem => elem.subCategories.find(elem1 => elem1._id === incomeSelected.subCategory_id))
            const subCategory = categorySelected?.subCategories.find(elem => elem._id === incomeSelected.subCategory_id)

            const subCategoryData = {
                name: subCategory?.name,
                color: categorySelected?.color,
                category_id: categorySelected?._id,
                tag_id: subCategory?._id
            }

            console.log("subCategoryData", subCategoryData)




            if (subCategory) {
                setSubCategorySelected(subCategoryData)
            }

            const account = bankAccounts.find(elem => elem._id === incomeSelected.account_id)
            if (account) {
                setAccountSelected(account)
            }

            setValue(maskInputMoney(valueIn))
            setPaymentMethod(incomeSelected.paymentMethod)
            setPaymentDate(incomeSelected.paymentDate)
            setCompetenceMonth(incomeSelected.competenceMonth)
            // setCreditConfig(incomeSelected.credit_config)
            setDescription(incomeSelected.description)

            setFiles(incomeSelected.files)
            setActive(incomeSelected.active)
        }

    }, [incomeSelected])

    const dataFunction = async (user_id) => {

        await axios.get(`/api/incomeAdd`, {
            params: {
                user_id
            }
        }).then(res => {
            setCategories(res.data.expenseCategories)
            setBankAccounts(res.data.bankAccounts)
        }).catch(e => {
            console.log(e)
        })
    }



    useEffect(() => {

        (paymentDate === dateObject(new Date()) || paymentDate === dateObject(new Date(), -1))

    }, [paymentDate?.day])




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

        if (date?.day === today.day && date?.month === today.month && date?.year === today.year) {
            return true
        } else if (date?.day === aDaysAgo.day && date?.month === aDaysAgo.month && date?.year === aDaysAgo.year) {
            return true
        } else {
            return false
        }
    }

    const handleSave = async () => {


        setLoadingSave(true);

        const isValid = validate();

        if (isValid) {
            let attachment = ''

            if (!files.length && files) {
                if (files) attachment = await createImageUrl([files], 'ATTACHMENTS')
            }
            console.log('subCategorySelected', subCategorySelected)


            const data = {
                user_id: token.sub,
                income_id: incomeSelected._id,
                ref_id: incomeSelected.ref_id,
                editConfig,
                section: 'expense',
                value,
                currencyId,
                paymentDate,
                paymentMethod,
                competenceMonth,
                description,
                subCategory_id: subCategorySelected ? subCategorySelected.tag_id : '',
                account_id: accountSelected ? accountSelected._id : '',
                files: attachment ? attachment : files,
                active
            };


            await axios.patch(`/api/transactions/incomeEdit`, data)
                .then(res => {
                    dispatch(newData(true))
                    initialValues()
                }).catch(e => {
                    showModalBs("editExpenseModal")
                    scrollTo('editExpenseModal');
                    setLoadingSave(false);
                });
            setLoadingSave(false);


        } else {

            showModalBs("editExpenseModal")
            scrollTo('editExpenseModal');
            setLoadingSave(false);
        }
    }


    const initialValues = () => {

        setValue('')
        setActive(true)
        setPaymentMethod(null)
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

    useEffect(() => {
        handleEditOptions()

    }, [editConfig])

    const handleEditOptions = () => {


        if (editConfig === '3') {
            const valueIn = brlNumber.format(incomeSelected.value)
            setValue(maskInputMoney(valueIn))
            setActive(incomeSelected.active)
            setPaymentDate(incomeSelected.paymentDate)
            setCompetenceMonth(incomeSelected.competenceMonth)
        } else if (editConfig === '2') {
            setActive(incomeSelected.active)
            setPaymentDate(incomeSelected.paymentDate)
            setCompetenceMonth(incomeSelected.competenceMonth)
        }
    }



    return (
        <div class="modal fade" id="editExpenseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    {/* <span className="me-1">{currency.symbol}</span> */}
                                    <span className="me-1">R$</span>
                                    <input type="text" inputMode="numeric" placeholder="0,00"
                                        className="form-control fs-2 " disabled={editConfig === "3"} style={{ borderColor: '#f2545b' }}
                                        value={value} id='valueInput'
                                        onChange={e => setValue(maskInputMoney(e.target.value))} />
                                </div>
                                {/* <CurrencySelect setCurrencyId={setCurrencyId} currencyId={currencyId} /> */}
                            </div>
                            <span className="text-danger small">{valueError}</span>

                            <div className="col-12 mt-3 d-flex">
                                <div class="form-check form-switch">
                                    <input class="form-check-input form-check-input-expense" type="checkbox" disabled={editConfig === "2" || editConfig === "3"} role="switch" id="activeInput" checked={active} onClick={() => setActive(!active)} />
                                    <label type="button" class={`form-check-label ${active ? 'bold' : ''}`} for="activeInput" >Foi paga</label>
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
                                                <span className="small fw-bold mb-2 ms-3">Configuração de pagamento</span>
                                            </div>

                                            <div className="col-12 d-flex flex-wrap"
                                                style={{
                                                    opacity: 0.5,
                                                    pointerEvents: "none",
                                                }}>

                                                <span className={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ctm-bg-danger`}>
                                                    {paymentMethodOptions.find(elem => elem.id === paymentMethod)?.description}
                                                </span>






                                            </div>

                                            {+paymentMethod === (2 || 6 || 7) && (
                                                <div className="col-12 d-flex flex-wrap flex-column">

                                                    <div class="form-check my-2">
                                                        <input class="form-check-input form-check-input-expense" type="radio" name="editConfigCheckExpense" id="editConfigExpense1" onClick={() => setEditConfig('1')} checked={editConfig === '1'} />
                                                        <label class="form-check-label" for="editConfigExpense1">
                                                            Editar somente esta
                                                        </label>
                                                    </div>
                                                    <div class="form-check my-2">
                                                        <input class="form-check-input form-check-input-expense" type="radio" name="editConfigCheckExpense" id="editConfigExpense2" onClick={() => setEditConfig('2')} checked={editConfig === '2'} />
                                                        <label class="form-check-label" for="editConfigExpense2">
                                                            Editar essa e todas as pendentes
                                                        </label>
                                                    </div>
                                                    <div class="form-check my-2">
                                                        <input class="form-check-input form-check-input-expense" type="radio" name="editConfigCheckExpense" id="editConfigExpense3" onClick={() => setEditConfig('3')} checked={editConfig === '3'} />
                                                        <label class="form-check-label" for="editConfigExpense3">
                                                            Editar todas (incluindo efetivadas)
                                                        </label>
                                                    </div>

                                                </div>
                                            )}
                                            <span className="small text-secondary">
                                                {editConfig === '1' && 'Não é possível alterar o método de pagamento'}
                                                {editConfig === '2' && 'Não é possível alterar o método de pagamento, a data ou confirmar transação'}
                                                {editConfig === '3' && 'Não é possível alterar o método de pagamento, o valor, data, conta ou confirmar transação'}
                                            </span>

                                        </div>



                                        <hr />
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-12">
                                                <FontAwesomeIcon icon={faCalendarDays} />
                                                <span className="small fw-bold mb-2 ms-3">Data de pagamento</span>

                                            </div>

                                            <div
                                                className="col-12 mt-2 d-flex"
                                                style={{
                                                    opacity: editConfig === "2" || editConfig === "3" ? 0.5 : 1,
                                                    pointerEvents: editConfig === "2" || editConfig === "3" ? "none" : "auto",
                                                }}
                                            >
                                                {isToday(paymentDate) ? (
                                                    <>
                                                        <span
                                                            type="button"
                                                            onClick={() => setPaymentDate(dateObject(new Date()))}
                                                            className={`${editConfig !== "2" && editConfig !== "3" ? "cardAnimation" : ""
                                                                } px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) === JSON.stringify(dateObject(new Date()))
                                                                    ? "ctm-bg-danger"
                                                                    : "ctm-bg-primary"
                                                                }`}
                                                        >
                                                            Hoje
                                                        </span>
                                                        <span
                                                            type="button"
                                                            onClick={() => setPaymentDate(dateObject(new Date(), -1))}
                                                            className={`${editConfig !== "2" && editConfig !== "3" ? "cardAnimation" : ""
                                                                } px-2 py-1 text-white small mx-1 rounded-pill ${JSON.stringify(paymentDate) === JSON.stringify(
                                                                    dateObject(new Date(), -1)
                                                                )
                                                                    ? "ctm-bg-danger"
                                                                    : "ctm-bg-primary"
                                                                }`}
                                                        >
                                                            Ontem
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span
                                                        type="button"
                                                        onClick={() => showModal("datePickerModalExpenseEdit")}
                                                        className={`${editConfig !== "2" && editConfig !== "3" ? "cardAnimation" : ""
                                                            } px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-danger`}
                                                    >
                                                        {dateFormat(paymentDate)}
                                                    </span>
                                                )}
                                                <span
                                                    type="button"
                                                    onClick={() => showModal("datePickerModalExpenseEdit")}
                                                    className={`${editConfig !== "2" && editConfig !== "3" ? "cardAnimation" : ""
                                                        } px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary`}
                                                >
                                                    Outro
                                                </span>
                                            </div>


                                            <DatePickerModal
                                                title="Data da receita"
                                                date={paymentDate}
                                                setDate={setPaymentDate}
                                                id="datePickerModalExpenseEdit"
                                                section="expense" />

                                        </div>
                                        <hr />
                                        <div className="row d-flex justify-content-between"  >
                                            <div className="col-12">
                                                <FontAwesomeIcon icon={faCalendarWeek} />
                                                <span className="small fw-bold mb-2 ms-3">Mês de competência</span>
                                            </div>
                                            {incomeSelected?.creditConfig?.parcelaAtual && incomeSelected?.creditConfig?.parcelaAtual > 1 ?
                                                <div className="col-12  mt-2">
                                                    <span className="small text-secondary">
                                                        Só é possível editar o mês de competência da primeira parcela
                                                    </span>
                                                </div>
                                                :
                                                <div className="col-12 d-flex justify-content-center mt-2"
                                                    style={{
                                                        opacity: editConfig === "2" || editConfig === "3" ? 0.5 : 1,
                                                        pointerEvents: editConfig === "2" || editConfig === "3" ? "none" : "auto",
                                                    }}>

                                                    <MonthSelect
                                                        setMonth={value => { setCompetenceMonth(value) }}
                                                        competenceMonth={competenceMonth}
                                                    />
                                                </div>
                                            }


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

                                            <CategorySelectedComponent subCategorySelected={subCategorySelected} categories={categories} type="Expense" edit/>

                                            <CategorySelectModal edit
                                                categories={categories}
                                                setSubCategorySelected={setSubCategorySelected}
                                                dataFunction={() => dataFunction(token.sub)}
                                                id="tagSelectModalExpenseEdit"
                                                section="expense" />

                                        </div>

                                        <hr />

                                        <div className="row d-flex justify-content-between">
                                            <div className="col-12">

                                                <FontAwesomeIcon icon={faWallet} />
                                                <span className="small fw-bold mb-2 ms-3">Conta</span>
                                            </div>
                                            <div className="col-12 mt-2 d-flex justify-content-between" onClick={() => showModal('bankAccountsExpenseEditModal')}>
                                                {!accountSelected ?
                                                    <span type="button"
                                                        class=" px-2 py-1  small mx-1 rounded-pill border pulse shadow">
                                                        Selecionar Conta
                                                    </span>
                                                    :
                                                    <>
                                                        <div className="row">
                                                            <div>
                                                                <span type="button" onClick={() => showModal('bankAccountsExpenseEditModal')}
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
                                                id="bankAccountsExpenseEditModal" />
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