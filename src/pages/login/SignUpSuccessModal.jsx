import isMobile from "../../../utils/isMobile"






export default function SignUpSuccessModal(props) {




    return (
        <div
            className="modal fade"
            id="signUpSuccessModal"
            tabindex="-1"
            aria-labelledby="authModalLabel"
            aria-hidden="true"        >

            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title title-dark" id="authModalLabel">
                            Parabéns!
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        Cadastro efetuado com sucesso!

                    </div>
                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-custom-secondary btn-sm"
                            data-bs-dismiss="modal"
                            onClick={() => props.setSection('signIn')}>
                            Entrar!
                        </button>
                    </div>
                </div>
            </div>
        </div>




    )
}