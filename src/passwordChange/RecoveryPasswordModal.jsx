import { useState } from "react";
import { SpinnerSM } from "../components/loading/Spinners";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'




export default function RecoveryPasswordModal(props) {

    const token = jwt.decode(Cookie.get('auth'))


    const [emailSent, setEmailSent] = useState(false)
    const [loadingSent, setLoadingSent] = useState(false)


    const handleResetPassword = async e => {
        e.preventDefault()
        setEmailSent(false)
        setLoadingSent(true)

        await axios.post(`${baseUrl()}/api/passwordChange/recoverPasswordMail`, { user_id: token.sub })
            .then(res => {
                setEmailSent(true)
                setLoadingSent(false)
            }).catch(e => {
                setLoadingSent(false)
            })
    }



    return (
        <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header ">
                        <h5 >Esqueceu a senha?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="">
                            Um link para recuperação de senha será enviado para o seu e-mail.
                        </p>
                        {emailSent && (
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <small className="text-success text-center fadeItem" role="alert">
                                        Verifique seu email!
                                    </small>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-sm btn-secondary ms-2"
                            data-bs-dismiss="modal"
                            onClick={() => { setEmailSent(false); setLoadingSent(false) }}>Cancelar</button>
                        {loadingSent ?
                            <button className="btn btn-sm btn-success px-3" type="button" disabled>
                                <SpinnerSM />
                            </button>
                            :
                            <button type="button" className="btn btn-sm btn-success" onClick={e => handleResetPassword(e)}>Enviar</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}