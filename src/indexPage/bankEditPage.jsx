import { faAngleLeft, faArrowsUpToLine, faCalendarCheck, faCalendarDay, faComment, faCommentAlt, faMoneyBill, faSwatchbook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { maskInputMoney } from "../../utils/mask"
import scrollTo from "../../utils/scrollTo"
import { useEffect, useState } from "react"
import { SpinnerSM } from "../components/loading/Spinners"
import CardTemplate from "../bankAccounts/CardTemplate"
import BankColorSelect from "../bankAccounts/BankColorSelect"
import removeInputError from "../../utils/removeInputError"
import axios from "axios"




export default function BankEditPage(props) {

    const { bankAccountSelected, creditCardList, bankAccountsLength, setBankAccountSelected, token, dataFunction } = props

    const [bankSelected, setBankSelected] = useState('')
    const [initialValue, setInitialValue] = useState('');
    const [description, setDescription] = useState('')
    const [valueSum, setValueSum] = useState(true)
    const [color, setColor] = useState("")
    const [creditCard, setCreditCard] = useState(false)
    const [creditLimit, setCreditLimit] = useState(0)
    const [creditNetwork, setCreditNetwork] = useState(null)
    const [diaFechamento, setDiaFechamento] = useState(1)
    const [diaLancamento, setDiaLancamento] = useState(5)

    const [loadingAccountSave, setLoadingAccountSave] = useState('')
    const [loadingDelete, setLoadingDelete] = useState('')

    const [saveError, setSaveError] = useState('')
    const [deleteError, setDeleteError] = useState('')

    const [deleteButton, setDeleteButton] = useState(false)

    useEffect(() => {

        handleData(bankAccountSelected)

    }, [bankAccountSelected])

    const handleData = (data) => {

        if (data) {
            setBankSelected(data.bankSelected)
            setInitialValue(maskInputMoney((data.initialValue * 100).toString()))
            setDescription(data.description)
            setValueSum(data.valueSum)
            setColor(data.color)
            setCreditCard(data.creditCard)
            setCreditLimit(maskInputMoney((data.creditLimit * 100).toString()))
            setCreditNetwork(data.creditNetwork)
            setDiaFechamento(data.diaFechamento)
            setDiaLancamento(data.diaLancamento)
        }
    }

    const initialValues = () => {
        setTimeout(() => {
            setDeleteButton(false)
            setBankAccountSelected(null)
            setBankSelected('')
            setInitialValue('')
            setDescription('')
            setValueSum(true)
            setColor('')
            setCreditCard(false)
            setCreditLimit('')
            setCreditNetwork(null)
            setDiaFechamento(1)
            setDiaLancamento(5)
        }, 700)
    }


    const handleCreditNetwork = (id) => {
        console.log(id, creditCardList)
        const network = creditCardList.find(elem => elem.id.toString() === id.toString())
        console.log("network", network)

        setCreditNetwork(network)
    }

    const handleCreditCardCheck = () => {
        setCreditCard(!creditCard)
        setCreditLimit('')
        setCreditNetwork('')
        setDiaLancamento(1)
        setDiaFechamento(5)
        if (!creditCard) scrollTo('creditLimitInput');
    }

    const validate = () => {

        removeInputError();

        let bankError = ''
        let valueError = ''
        let descriptionError = ''

        // if (!bankSelected) bankError = "Selecione a instituição financeira"
        // if (!initialValue) valueError = "Selecione a instituição financeira"
        if (!description) descriptionError = "Selecione a instituição financeira"

        if (bankError || valueError || descriptionError) {
            // if (bankError) document.getElementById('bankSelect').classList.add('inputError');
            // if (valueError) document.getElementById('valueInput').classList.add('inputError');
            if (descriptionError) document.getElementById('descriptionInput').classList.add('inputError');
            return false
        } else {
            return true
        }
    }


    const handleAccountSave = async (user_id) => {

        const isValid = validate();

        if (isValid) {

            setLoadingAccountSave(true);

            const data = {
                user_id,
                bankAccount_id: bankAccountSelected._id,
                bankSelected,
                color,
                initialValue,
                description,
                valueSum,
                creditCard,
                creditLimit,
                creditNetwork,
                diaFechamento,
                diaLancamento
            };

            await axios.patch('/api/bankAccounts', data)
                .then(async res => {
                    await dataFunction();
                    initialValues();

                    var myCarousel = document.querySelector('#tutorialPages');
                    var carousel = new bootstrap.Carousel(myCarousel,);

                    // Trocar para o slide 3 (o índice começa em 0, então slide 3 é o índice 2)
                    carousel.to(3);
                    setLoadingAccountSave(false);

                })
                .catch(e => {
                    setSaveError(true)
                    setLoadingAccountSave(false);
                });


        }
    };

    const handleDelete = async () => {

        setLoadingDelete(true);

        const data = {
            user_id: token.sub,
            bankAccount_id: bankAccountSelected._id
        };

        await axios.delete(`/api/bankAccounts`, {
            data
        }).then(async res => {
            await dataFunction();

            initialValues();

            var myCarousel = document.querySelector('#tutorialPages');
            var carousel = new bootstrap.Carousel(myCarousel,);

            // Trocar para o slide 3 (o índice começa em 0, então slide 3 é o índice 2)
            carousel.to(3);
            setLoadingDelete(false);
        }).catch(e => {
            console.log(e)
            setLoadingDelete(false);
            setDeleteError("Houve um problema ao deletar. Por favor, verifique a conexão etente novamente.");
        })
    }


    return (
        <div className="row">
            <div className="col-12">
                <span className="text-secondary" type="button"
                    data-bs-target="#tutorialPages" data-bs-slide-to={3} onClick={() => initialValues()} >
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Voltar
                </span>
            </div>
            <div className="col-12 d-flex justify-content-end mt-2">
                <button className="btn btn-c-outline-danger btn-sm" onClick={() => setDeleteButton(!deleteButton)}>
                    Excluir conta
                </button>

            </div>
            {deleteButton && bankAccountsLength > 1 && (
                <div className="col-12 fadeItem mt-2">
                    <div className="alert alert-danger">
                        <span>Tem certeza que deseja excluir essa conta?</span>
                        <div className="d-flex justify-content-start mt-2">
                            <button className="btn btn-secondary mx-1" onClick={() => setDeleteButton(false)}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" disabled={loadingDelete} onClick={() => handleDelete()}>
                                {loadingDelete ? <SpinnerSM /> : "Excluir"}
                            </button>
                        </div>
                        {deleteError && <span className="text-danger small mt-2">{deleteError}</span>}
                    </div>
                </div>
            )}
            {deleteButton && bankAccountsLength === 1 && (
                <div className="col-12 fadeItem mt-2">
                    <div className="alert alert-danger alert-dismissible">
                        <span>É necessário ter no mínimo uma conta cadastrada.</span>
                        <button type="button" class="btn-close" onClick={() => setDeleteButton(false)}></button>
                    </div>
                </div>
            )}


            <div className="col-12 mb-3  mt-3">
                <div className="row d-flex justify-content-center">

                    <CardTemplate
                        bankSelected={bankSelected}
                        color={color}
                        value={initialValue}
                        description={description}
                        creditNetwork={creditNetwork} />
                </div>
            </div>
            <div className="col-12 px-3">
                <BankColorSelect color={color} setColor={value => setColor(value)} />
            </div>
            <hr />

            <div className="col-12 mt-2 mb-4">

                <FontAwesomeIcon icon={faMoneyBill} />
                <span className="small fw-bold  ms-3">Valor disponível na conta</span>

                <div className="d-flex align-items-center fs-5 mt-2">
                    <span className="me-1">R$</span>
                    <input type="text" inputMode="numeric" placeholder="0,00"
                        className="form-control  " style={{ borderColor: '#00cc99' }}
                        value={initialValue} id='valueInput'
                        onChange={e => setInitialValue(maskInputMoney(e.target.value))} />
                </div>

            </div>
            <hr />

            <div className="col-12 mt-2 mb-4">
                <FontAwesomeIcon icon={faCommentAlt} />
                <span className="small fw-bold  ms-3">Descrição</span>
                <input type="text" id="descriptionInput" className="form-control mt-2" value={description}
                    onChange={e => e.target.value.length <= 25 && setDescription(e.target.value)} />
                <span className="small text-muted">Caracteres restantes: {25 - description.length}</span>
            </div>
            <hr />


            <div className="col-12 mt-2 mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox"
                        role="switch" id="valueSumCheck" checked={valueSum}
                        onClick={e => setValueSum(!valueSum)} />
                    <label class="form-check-label" for="valueSumCheck">Incluir valor na soma da tela inicial</label>
                </div>
            </div>

            <hr />
            <div className="col-12 mt-2 mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" disabled={!bankSelected?.institutionType?.includes('credit_card')}
                        role="switch" id="creditCardCheck" checked={creditCard}
                        onClick={e => { handleCreditCardCheck() }} />
                    <label class="form-check-label" for="creditCardCheck">Incluir cartão de crédito</label>
                </div>
            </div>

            {creditCard && (
                <>
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faArrowsUpToLine} />
                        <span className="small fw-bold  ms-3">Limite</span>

                        <div className="d-flex align-items-center fs-5 mt-2">
                            <span className="me-1">R$</span>
                            <input type="text" inputMode="numeric" placeholder="0,00"
                                className="form-control  "
                                value={creditLimit} id='creditLimitInput'
                                onChange={e => setCreditLimit(maskInputMoney(e.target.value))} />
                        </div>

                    </div>

                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faSwatchbook} />
                        <span className="small fw-bold  ms-3">Bandeira</span>

                        <select class="form-select mt-2" aria-label="Default select example" value={creditNetwork?.id} onChange={e => handleCreditNetwork(e.target.value)}>
                            <option value={''} disabled selected>Escolha...</option>
                            {creditCardList.map(elem => (
                                <option value={elem.id}>{elem.descricao}</option>
                            ))}

                        </select>

                    </div>
                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faCalendarDay} />
                        <span className="small fw-bold  ms-3">Dia de fechamento</span>

                        <select class="form-select mt-2" aria-label="Default select example" value={diaFechamento} onChange={e => setDiaFechamento(e.target.value)}>
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
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={31}>31</option>
                        </select>

                    </div>
                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faCalendarCheck} />
                        <span className="small fw-bold  ms-3">Dia de lançamento</span>

                        <div className="d-flex align-items-center fs-5 mt-2">
                            <select class="form-select mt-2" aria-label="Default select example" value={diaLancamento} onChange={e => setDiaLancamento(e.target.value)}>
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
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                                <option value={21}>21</option>
                                <option value={22}>22</option>
                                <option value={23}>23</option>
                                <option value={24}>24</option>
                                <option value={25}>25</option>
                                <option value={26}>26</option>
                                <option value={27}>27</option>
                                <option value={28}>28</option>
                                <option value={29}>29</option>
                                <option value={30}>30</option>
                                <option value={31}>31</option>
                            </select>
                        </div>

                    </div>

                </>

            )
            }
            <hr />
            {saveError && (
                <div className="col-12 fadeItem mt-2">
                    <div className="alert alert-danger alert-dismissible">
                        <span>Houve um erro ao salvar, verifique a sua conexão e tente novamente.</span>
                        <button type="button" class="btn-close" onClick={() => setSaveError(false)}></button>
                    </div>
                </div>
            )}
            <div className="col-12 mt-2 mb-4 d-flex justify-content-end">
                <button className="btn btn-sm btn-c-outline-tertiary mx-1" data-bs-target="#tutorialPages" data-bs-slide-to={3} onClick={() => initialValues()}>
                    Cancelar
                </button>
                <button className="btn btn-sm btn-c-outline-success mx-1" disabled={loadingAccountSave} onClick={() => handleAccountSave(token.sub)}>
                    {loadingAccountSave ? <SpinnerSM className="mx-3" /> : 'Salvar'}
                </button>

            </div >
        </div>
    )
}