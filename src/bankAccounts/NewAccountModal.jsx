import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { maskInputMoney } from "../../utils/mask";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import removeInputError from "../../utils/removeInputError";
import axios from "axios";
import { showModalBs } from "../../utils/modalControl";
import ModalBankSelect from "./modalBankSelect";
import BankSetup from "./BankSetup";


export default function NewAccountModal(props) {

    const { institutions } = props

    const token = jwt.decode(Cookie.get('auth'));


    const [bankSelected, setBankSelected] = useState('')
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('')
    const [valueSum, setValueSum] = useState(true)
    const [color, setColor] = useState("#4d88bb")

    const [loadingSave, setLoadingSave] = useState('')


    const validate = () => {

        removeInputError();

        let bankError = ''
        let valueError = ''
        let descriptionError = ''

        if (!bankSelected) bankError = "Selecione a instituição financeira"
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
                bankSelected,
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
        setBankSelected('')
        setValue('')
        setDescription('')
        setValueSum(true)
    }




    return (
        <div class="modal fade" id="newAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Nova conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div id="bankSetupCarousel" class="carousel slide" data-bs-touch="false" data-bs-interval='false'>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <ModalBankSelect institutions={institutions} setBankSelected={value => setBankSelected(value)} />
                                </div>
                                <div class="carousel-item">

                                    <BankSetup bankSelected={bankSelected}
                                        color={color} setColor={value => setColor(value)}
                                        setValue={value => setValue(value)} value={value}
                                        setDescription={value => setDescription(value)} description={description}
                                        setValueSum={value => setValueSum(value)} valueSum={valueSum} />
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






