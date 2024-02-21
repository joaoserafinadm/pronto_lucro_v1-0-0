import { useState } from "react";
import { SpinnerSM } from "../../components/loading/Spinners";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

export default function AuthModal(props) {


    const [code, setCode] = useState('')
    const [resendEmailError, setResendEmailError] = useState('')
    const [resendEmailCheck, setResendEmailCheck] = useState('')

    const resendEmail = async (email, firstName) => {
        cleanStatus()
        setResendEmailCheck('')
        setResendEmailError('')
        const data = {
            email: email,
            firstName: firstName
        }

        await axios.post(`${baseUrl()}/api/login/authMail`, data)
            .then(res => {
                props.setAuthCode(res.data.secureCode)
                setResendEmailError('')
                setResendEmailCheck('Verifique seu e-mail')
            }).catch(e => {
                setResendEmailCheck('')
                setResendEmailError('Verifique seus dados de cadastro')
            })
    }

    const cleanStatus = () => {
        setCode('')
        setResendEmailError('')
        setResendEmailCheck('')
        props.setAuthError('')
        props.setSignUpLoading(false)
    }


    return (
        <div
            className="modal fade"
            id="authModal"
            tabindex="-1"
            aria-labelledby="authModalLabel"
            aria-hidden="true" data-bs-backdrop="static"
            data-bs-keyboard="false"
        >

            <div className="modal-dialog modal-dialog-centered" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title title-dark" id="authModalLabel">
                            Verifique seu e-mail!
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => cleanStatus()}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <span>
                                    Enviamos em seu e-mail um código de autenticação. Insira o
                                    código no campo abaixo:
                                </span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-center">
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={code}
                                        onChange={e => setCode(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <span className="small span" type="button" onClick={() => resendEmail(props.email, props.firstName)}>
                                    Enviar código novamente
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                {resendEmailError ?
                                    <small className="small text-danger fadeItem">{resendEmailError}</small>
                                    :
                                    props.authError ?
                                        <small className="small text-danger fadeItem">{props.authError}</small>
                                        :
                                        <small className="small text-success fadeItem">{resendEmailCheck}</small>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            data-bs-dismiss="modal"
                            onClick={() => cleanStatus()}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button" disabled={code ? false : true}
                            className="btn btn-outline-success btn-sm"
                            data-bs-dismiss="modal"
                            onClick={() => props.handleSignUp(code)}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
