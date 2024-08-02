import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import bankList from '../../utils/bankList.json'
import { maskInputMoney } from "../../utils/mask";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import removeInputError from "../../utils/removeInputError";
import axios from "axios";
import { showModalBs } from "../../utils/modalControl";


export default function NewAccountModal(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const [bank, setBank] = useState('')
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('')
    const [valueSum, setValueSum] = useState(true)

    const [loadingSave, setLoadingSave] = useState('')


    const handleBankChange = (bankCode) => {

        const bankSelected = bankList.find(elem => elem.code.toString() === bankCode.toString())

        setBank(bankSelected)

    }


    const handleSearchBank = (value) => {

        const searchValue = value.toUpperCase();

        if (!value) {
            setBank('')
            // setBankValid(true); // Reset bank valid state if input is empty
            return;
        }

        const bankExist = bankList.find(elem => elem.bankName.toUpperCase().includes(searchValue));

        // setBankValid(bankExist);

        if (bankExist) {

            const bankSelected = bankList.find(elem => elem.code.toString() === bankExist?.code.toString())

            setBank(bankSelected)
        }

    }

    const validate = () => {

        removeInputError();

        let bankError = ''
        let valueError = ''
        let descriptionError = ''

        if (!bank) bankError = "Selecione a instituição financeira"
        // if (!value) valueError = "Selecione a instituição financeira"
        if (!description) descriptionError = "Selecione a instituição financeira"

        if (bankError || valueError || descriptionError) {
            if (bankError) document.getElementById('bankSelect').classList.add('inputError');
            // if (valueError) document.getElementById('valueInput').classList.add('inputError');
            if (descriptionError) document.getElementById('descriptionInput').classList.add('inputError');
            return false
        } else {
            return true
        }
    }

    const handleSave = async (user_id) => {

        const isValid = validate()

        if (isValid) {

            setLoadingSave(true)

            const data = {
                user_id,
                bank,
                value,
                description,
                valueSum
            }

            await axios.post('/api/bankAccounts', data)
                .then(res => {
                    handleCancel()
                }).catch(e => {
                    showModalBs("newAccountModal")
                })

            setLoadingSave(false)
        }



    }

    const handleCancel = () => {
        setBank('')
        setValue('')
        setDescription('')
        setValueSum('')
    }




    return (
        <div class="modal fade" id="newAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Adicionar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="row ">
                            <div className="col-12">
                                <label >Escolha a instituição financeira da conta</label>
                                <div className="input-group">
                                    <input type="text" className="form-control"
                                        placeholder="Procure pelo nome" id="bankInput"
                                        onChange={e => handleSearchBank(e.target.value)} />
                                    <span className="input-group-text" htmlFor="bankInput"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                                </div>
                            </div>


                            <div className="col-12 mt-3">

                                <label htmlFor="bankSelect">Nome da Instituição Financeira</label>

                                <select
                                    name="bankSelect"
                                    id="bankSelect"
                                    className="form-select"
                                    value={bank.code}
                                    onChange={e => handleBankChange(e.target.value)}>
                                    <option value="" selected disabled>Selecione</option>
                                    {bankList.map((bank) => (
                                        <option key={bank.code} value={bank.code}>{bank.bankName}</option>
                                    ))}

                                </select>
                            </div>


                            <div className="col-12 mt-3">

                                <label htmlFor="valueInput">Valor disponível na conta</label>
                                <div className="d-flex align-items-center fs-5">
                                    <span className="me-1">R$</span>
                                    <input type="text" inputMode="numeric" placeholder="0,00"
                                        className="form-control  " style={{ borderColor: '#00cc99' }}
                                        value={value} id='valueInput'
                                        onChange={e => setValue(maskInputMoney(e.target.value))} />
                                </div>

                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="descriptionInput">Descrição</label>
                                <input type="text" id="descriptionInput" className="form-control" value={description}
                                    onChange={e => setDescription(e.target.value)} />
                            </div>


                            <div className="col-12 mt-4">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox"
                                        role="switch" id="valueSumCheck" checked={valueSum}
                                        onClick={e => setValueSum(!valueSum)} />
                                    <label class="form-check-label" for="valueSumCheck">Incluir valor no saldo total</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-custom-tertiary" data-bs-dismiss="modal" onClick={() => handleCancel(token.sub)}>
                            Cancelar
                        </button>
                        <button className="btn btn-custom-success" data-bs-dismiss="modal" onClick={() => handleSave(token.sub)}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}