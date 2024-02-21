import { faArrowTurnRight, faArrowsTurnRight, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function InvoicesModal(props) {





    return (
        <div className="modal fade" id="invoicesModal" tabIndex="-1" aria-labelledby="invoicesModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="h5_title" id="exampleModalLabel">Detalhes da Fatura</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <span>
                                    Assinatura
                                </span>

                            </div>
                            <div className="col d-flex justify-content-end">
                                <span><small>R$ 19,90</small></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="ps-4" style={{ fontSize: '13px' }}>
                                    <FontAwesomeIcon icon={faArrowTurnRight} className="me-1" />   Calculadora GEE
                                </span>
                            </div>
                            <div className="col d-flex justify-content-end">
                                <span><small>R$ 19,90</small></span>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-outline-success" data-bs-dismiss="modal">Baixar Fatura</button>
                        <button type="button" className="btn btn-sm btn-success">Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}