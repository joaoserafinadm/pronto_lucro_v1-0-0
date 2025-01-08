import axios from "axios"
import { showModalBs } from "../../utils/modalControl"
import { useState } from "react";
import scrollCarouselTo from "../../utils/scrollCarouselTo";



export default function ActiveAccountModal(props) {


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

        await axios.patch(`/api/bankAccounts/activeAccount`, data)
            .then(res => {
                handleCancel()
                dataFunction(token.sub)
                scrollCarouselTo('backAccountsPage', 0)
            }).catch(e => {
                console.log(e)
                showModalBs('activeAccountModal')
                setSaveError("Houve um problema ao salvar. Por favor, tente novamente.")
            })
    }


    return (
        <div class="modal fade" id="activeAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="activeAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="activeAccountModalLabel">Ativar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCancel(null)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center my-3 text-center">
                                <span>Tem certeza que deseja <b>ativar</b> essa conta?</span>
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
                            {saveError && (

                                <div className="col-12 d-flex justify-content-center my-3">
                                    <span className="text-danger">{saveError}</span>
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-c-outline-tertiary" data-bs-dismiss="modal" onClick={() => handleCancel(null)}>Fechar</button>
                        <button type="button" className="btn btn-sm btn-c-outline-success" data-bs-dismiss="modal" onClick={() => handleSave(null)}>Ativar</button>

                    </div>
                </div>
            </div>
        </div>
    )



}