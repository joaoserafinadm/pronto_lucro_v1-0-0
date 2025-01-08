import axios from "axios"
import { showModalBs } from "../../utils/modalControl"
import { useState } from "react";
import scrollCarouselTo from "../../utils/scrollCarouselTo";



export default function DeleteAccountModal(props) {


    const { token, accountSelected, setAccountSelected, dataFunction } = props


    const [saveError, setSaveError] = useState('');

    const handleCancel = () => {
        setTimeout(() => {
            setAccountSelected(null)
            setSaveError('')
        }, 500)
    }


    const handleSave = async () => {

        setSaveError('')

        const data = {
            user_id: token.sub,
            account_id: accountSelected?._id
        }

        await axios.delete(`/api/bankAccounts/activeAccount`, { params: data })
            .then(res => {
                handleCancel()
                dataFunction(token.sub)
            }).catch(e => {
                console.log(e)
                showModalBs('deleteAccountModal')
                setSaveError("Houve um problema ao salvar. Por favor, tente novamente.")
            })
    }


    return (
        <div class="modal fade" id="deleteAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteAccountModalLabel">Ativar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCancel(null)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 flex-column d-flex justify-content-center my-3 text-center">
                                <span>Tem certeza que deseja <b className="text-danger">deletar</b> essa conta?</span>
                            </div>
                            <div className="col-12 d-flex flex-column align-items-center my-3 ">
                                <div className="d-flex align-items-center mb-2 fw-bold">
                                    {accountSelected?.description}

                                </div>
                                <div>
                                    <span
                                        className={` cardAnimation px-3 py-2  text-white small mx-1 rounded-pill fw-bold `}

                                        style={{ backgroundColor: accountSelected?.color }}>
                                        <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={20} height={20} />
                                        {accountSelected?.bankSelected?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 d-flex justify-content-center text-center my-3">
                                <span className="text-danger">Suas transações vinculadas à essa conta ficarão com o status "Sem conta"</span>

                            </div>
                            {saveError && (

                                <div className="col-12 d-flex justify-content-center my-3">
                                    <span className="text-danger">{saveError}</span>
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-c-outline-tertiary" data-bs-dismiss="modal" onClick={() => handleCancel(null)}>Fechar</button>
                        <button type="button" className="btn btn-sm btn-c-outline-danger" data-bs-dismiss="modal" onClick={() => handleSave(null)}>Deletar</button>

                    </div>
                </div>
            </div>
        </div>
    )



}