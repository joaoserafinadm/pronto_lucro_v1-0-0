import { useEffect, useState } from "react";
import BankSetup from "./BankSetup"
import ModalBankSelect from "./modalBankSelect"
import scrollCarouselTo from "../../utils/scrollCarouselTo";
import { maskInputMoney } from "../../utils/mask";
import { SpinnerSM } from "../components/loading/Spinners";
import removeInputError from "../../utils/removeInputError";
import axios from "axios";
import scrollTo from "../../utils/scrollTo";
import { showModalBs } from "../../utils/modalControl";



export default function EditAccountModal(props) {

    const { token,
        accountSelected,
        setAccountSelected,
        institutions,
        creditCardList,
        dataFunction,
        bankAccountsLength } = props


    const [bankSelected, setBankSelected] = useState('')
    const [initialValue, setInitialValue] = useState('');
    const [description, setDescription] = useState('')
    const [valueSum, setValueSum] = useState(true)
    const [color, setColor] = useState("#4d88bb")
    const [creditCard, setCreditCard] = useState(false)
    const [creditLimit, setCreditLimit] = useState(0)
    const [creditNetwork, setCreditNetwork] = useState(null)
    const [diaFechamento, setDiaFechamento] = useState(1)
    const [diaLancamento, setDiaLancamento] = useState(5)

    const [saveError, setSaveError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [deleteError, setDeleteError] = useState('')

    const [deleteButton, setDeleteButton] = useState(false)

    const [loadingSave, setLoadingSave] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        if (!accountSelected) return
        console.log(accountSelected)
        setBankSelected(accountSelected?.bankSelected)
        setInitialValue(maskInputMoney((+accountSelected?.initialValue * 100).toString()))
        setDescription(accountSelected?.description)
        setValueSum(accountSelected?.valueSum)
        setColor(accountSelected?.color)
        setCreditCard(accountSelected?.creditCard)
        setCreditLimit(maskInputMoney((+accountSelected?.creditLimit * 100).toString()))
        setCreditNetwork(accountSelected?.creditNetwork)
        setDiaFechamento(accountSelected?.diaFechamento)
        setDiaLancamento(accountSelected?.diaLancamento)
        setDeleteButton(false)
        scrollCarouselTo('editAccountCarousel', 1)


    }, [accountSelected])

    const handleCancel = () => {
        setAccountSelected(null)
        setDeleteButton(false)
    }


    const validate = () => {

        removeInputError();

        let bankError = ''
        let valueError = ''
        let descriptionError = ''

        // if (!bankSelected) bankError = "Selecione a instituição financeira"
        // if (!initialValue) valueError = "Selecione a instituição financeira"
        if (!description) descriptionError = "*Campo obrigatório"

        if (bankError || valueError || descriptionError) {
            // if (bankError) document.getElementById('bankSelect').classList.add('inputError');
            // if (valueError) document.getElementById('valueInput').classList.add('inputError');
            if (descriptionError) document.getElementById('descriptionInput').classList.add('inputError');
            showModalBs('editAccountModal')
            return false
        } else {
            return true
        }
    }

    const handleSave = async (user_id) => {

        const isValid = validate()

        if (isValid) {

            const data = {
                user_id,
                bankAccount_id: accountSelected._id,
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
                    handleCancel();

                    setLoadingSave(false);

                })
                .catch(e => {
                    showModalBs('editAccountModal')
                    scrollTo('editAccountModal')
                    setSaveError(true)
                    setLoadingSave(false);
                });



        }
    }


    const handleDelete = async () => {

        setLoadingDelete(true);

        const data = {
            user_id: token.sub,
            bankAccount_id: accountSelected._id
        };

        await axios.delete(`/api/bankAccounts`, {
            data
        }).then(res => {
            dataFunction();

            handleCancel();

            setLoadingDelete(false);
        }).catch(e => {
            console.log(e)
            setLoadingDelete(false);
            showModalBs('editAccountModal')
            setDeleteError("Houve um problema ao deletar. Por favor, verifique a conexão etente novamente.");
        })
    }

    return (
        <div class="modal fade" id="editAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editAccountModalLabel">Editar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body">

                            <div id="editAccountCarousel" class="carousel slide" data-bs-touch="false" data-bs-interval='false'>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <ModalBankSelect institutions={institutions} setBankSelected={value => setBankSelected(value)} edit />

                                    </div>
                                    <div class="carousel-item ">
                                        <div className="row mb-3">
                                            <div className="col-12 d-flex justify-content-end mt-2">
                                                <button className="btn btn-c-outline-danger btn-sm" onClick={() => setDeleteButton(!deleteButton)}>
                                                    Arquivar conta
                                                </button>

                                            </div>
                                            {deleteButton && bankAccountsLength > 1 && (

                                                <div className="col-12 fadeItem mt-2">
                                                    <div className="alert alert-danger">
                                                        <span>Tem certeza que deseja arquivar essa conta?</span>
                                                        <div className="d-flex justify-content-start mt-2">
                                                            <button className="btn btn-secondary mx-1" onClick={() => setDeleteButton(false)}>
                                                                Cancelar
                                                            </button>
                                                            <button className="btn btn-danger" disabled={loadingDelete} data-bs-dismiss="modal" onClick={() => handleDelete()}>
                                                                {loadingDelete ? <SpinnerSM /> : "Arquivar"}
                                                            </button>
                                                        </div>
                                                        {deleteError && <span className="text-danger small mt-2">{deleteError}</span>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <BankSetup edit
                                            bankSelected={bankSelected} creditCardList={creditCardList}
                                            color={color} setColor={value => setColor(value)}
                                            setInitialValue={value => setInitialValue(value)} initialValue={initialValue}
                                            setDescription={value => setDescription(value)} description={description}
                                            setValueSum={value => setValueSum(value)} valueSum={valueSum}
                                            setCreditCard={value => setCreditCard(value)} creditCard={creditCard}
                                            setCreditLimit={value => setCreditLimit(value)} creditLimit={creditLimit}
                                            setCreditNetwork={value => setCreditNetwork(value)} creditNetwork={creditNetwork}
                                            setDiaFechamento={value => setDiaFechamento(value)} diaFechamento={diaFechamento}
                                            setDiaLancamento={value => setDiaLancamento(value)} diaLancamento={diaLancamento}
                                        />
                                        <div className="row">

                                            <div className="col-12 mt-2 mb-4 d-flex justify-content-end">
                                                <button className="btn btn-sm btn-outline-secondary mx-1" onClick={handleCancel} data-bs-dismiss="modal">
                                                    Cancelar
                                                </button>
                                                <button className="btn btn-sm btn-outline-success mx-1" disabled={loadingSave} onClick={() => handleSave(token.sub)} data-bs-dismiss="modal">
                                                    {loadingSave ? <SpinnerSM className="mx-3" /> : 'Salvar'}
                                                </button>
                                            </div>

                                        </div >
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )




}