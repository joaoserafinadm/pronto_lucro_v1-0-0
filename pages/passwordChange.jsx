import { useEffect, useState } from "react"
import axios from "axios"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import Title from "../src/components/title/Title2"
import Link from "next/link"
import { FixedTopicsBottom } from "../src/components/fixedTopics"
import navbarHide from "../utils/navbarHide"
import { useDispatch, useSelector } from "react-redux"
import RecoveryPasswordModal from "../src/passwordChange/RecoveryPasswordModal"
import removeInputError from "../utils/removeInputError"
import baseUrl from "../utils/baseUrl"
import { SpinnerSM } from "../src/components/loading/Spinners"
import { useRouter } from "next/router"
import { addAlert } from "../store/Alerts/Alerts.actions";





export default function passwordChange() {

    const token = jwt.decode(Cookie.get('auth'))

    const router = useRouter()

    const dispatch = useDispatch()

    const alertsArray = useSelector(state => state.alerts)


    //Form variables
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassaword, setConfirmPassword] = useState('')

    //validate Errors
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    //Render Elements
    const [loadingSave, setLoadingSave] = useState(false)


    useEffect(() => {

        navbarHide(dispatch)

    }, [])


    const validate = () => {

        removeInputError();

        let oldPasswordError = ''
        let newPasswordError = ''

        if (!oldPassword) oldPasswordError = 'Senha inválida'
        if (newPassword.length < 6) newPasswordError = 'A senha deve ter no mínimo 6 caracteres'
        if (newPassword !== confirmPassaword) newPasswordError = "Confirmação de senha incorreta"
        if (!newPassword) newPasswordError = 'Digite uma senha'

        if (oldPasswordError || newPasswordError) {
            if (oldPasswordError) {
                document.getElementById("oldPasswordInput").classList.add("inputError");
                setOldPasswordError(oldPasswordError)
            }
            if (newPasswordError) {
                document.getElementById("newPasswordInput").classList.add("inputError");
                document.getElementById("confirmPasswordInput").classList.add("inputError");
                setNewPasswordError(newPasswordError)
            }

            setOldPasswordError(oldPasswordError)
            setNewPasswordError(newPasswordError)
            return false
        } else {
            return true
        }
    }


    const handleSave = (company_id) => {

        const isValid = validate()

        if (isValid) {
            setLoadingSave(true)
            const data = {
                user_id: token.sub,
                oldPassword,
                newPassword
            }
            axios.patch(`${baseUrl()}/api/passwordChange`, data)
                .then(res => {

                    const alert = {
                        type: 'alert',
                        message: 'Senha alterada com sucesso.',
                    }

                    dispatch(addAlert(alertsArray, [alert]))

                    setLoadingSave(false)

                    router.push('/')


                })
                .catch(e => {
                    setLoadingSave(false)
                    setOldPasswordError('Senha inválida')
                })
        }
    }





    return (
        <div>
            <Title title={`Alterar senha`} subtitle={''} backButton='/' />
            <div className="pagesContent-sm shadow fadeItem">


                <div className="form-group row mb-2">
                    <div className="col-12 col-lg-6 ">
                        <label className=" ">Senha atual</label>
                        <input type="password" className="form-control "
                            required id="oldPasswordInput"
                            name="email" value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)} />
                        <small className="text-danger ">{oldPasswordError}</small>

                    </div>
                </div>
                <div className="form-group row mb-2">
                    <div className="col-12 col-lg-6 ">
                        <label className="">Nova senha</label>
                        <input type="password" className="form-control"
                            required id="newPasswordInput"
                            name="email" value={newPassword}
                            onChange={e => setNewPassword(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <div className="col-12 col-lg-6 ">
                        <label className="">Confirmar nova senha</label>
                        <input type="password" className="form-control"
                            required id="confirmPasswordInput"
                            name="email" value={confirmPassaword}
                            onChange={e => setConfirmPassword(e.target.value)} />
                        <small className="text-danger ">{newPasswordError}</small>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <span type="button" className="span"
                            data-bs-toggle="modal"
                            data-bs-target="#forgotPasswordModal"
                        >Esqueceu a senha?
                        </span>
                    </div>
                </div>


                <hr />

                <FixedTopicsBottom >

                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <Link href="/">
                                <button className="btn btn-sm btn-secondary">Cancelar</button>
                            </Link>
                            {loadingSave ?
                                <button className="ms-2 btn btn-sm btn-success px-4" disabled><SpinnerSM /></button>
                                :
                                <button className="ms-2 btn btn-sm btn-success" onClick={() => handleSave(token.company_id)}>Salvar</button>
                            }
                        </div>
                    </div>
                </FixedTopicsBottom>


                {/* Modal */}
                <RecoveryPasswordModal />

            </div>
        </div>
    )
}