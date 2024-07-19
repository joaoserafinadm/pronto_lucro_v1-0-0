import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function NewAccountModal(props) {




    return (
        <div class="modal fade" id="newAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Adicionar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <label htmlFor="" className="form-label">Escolha a instituição financeira da conta:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Procure pelo nome" />
                                <span className="input-group-text"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                            </div>

                        </div>

                        <div className="row">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}