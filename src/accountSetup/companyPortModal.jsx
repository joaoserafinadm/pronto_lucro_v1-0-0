import { faCheckCircle, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";




export default function CompanyPortModal(props) {

    const [companyPort, setCompanyPort] = useState('')

    return (
        <div class="modal fade" id="companyPortModal" tabindex="-1" aria-labelledby="companyPortModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title-dark" id="companyPortModalLabel">Pagamento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="col-12">
                            <ul class="list-group list-group-flush list-group-item-action">
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('1')}>
                                    <span className={companyPort === '1' ? 'bold' : ''}>
                                        MEI / Autônomo <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: até R$ 81 mil</small>
                                    </span>
                                    {companyPort === '1' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('2')}>
                                    <span className={companyPort === '2' ? 'bold' : ''}>
                                        Microempresa <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 81 mil até R$ 360 mil</small>
                                    </span>
                                    {companyPort === '2' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }
                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('3')}>
                                    <span className={companyPort === '3' ? 'bold' : ''}>
                                        EPP <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 360 mil até R$ 4.8 Mi</small>
                                    </span>
                                    {companyPort === '3' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('4')}>
                                    <span className={companyPort === '4' ? 'bold' : ''}>
                                        Média Empresa I <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 4.8 Mi até R$ 6 Mi</small>
                                    </span>
                                    {companyPort === '4' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('5')}>
                                    <span className={companyPort === '5' ? 'bold' : ''}>
                                        Média Empresa II <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 6 Mi até R$ 50 Mi</small>
                                    </span>
                                    {companyPort === '5' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('6')}>
                                    <span className={companyPort === '6' ? 'bold' : ''}>
                                        Grande Empresa I <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 50 Mi até R$ 1 Bi</small>
                                    </span>
                                    {companyPort === '6' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('7')}>
                                    <span className={companyPort === '7' ? 'bold' : ''}>
                                        Grande Empresa II <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 1 Bi até R$ 3 Bi</small>
                                    </span>
                                    {companyPort === '7' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('8')}>
                                    <span className={companyPort === '8' ? 'bold' : ''}>
                                        Grande Empresa III <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 3 Bi até R$ 5 Bi</small>
                                    </span>
                                    {companyPort === '8' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('9')}>
                                    <span className={companyPort === '9' ? 'bold' : ''}>
                                        Grande Empresa IV <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: R$ 5 Bi até R$ 10 Bi</small>
                                    </span>
                                    {companyPort === '9' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>
                                <li type="button"
                                    class="list-group-item  list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => setCompanyPort('10')}>
                                    <span className={companyPort === '10' ? 'bold' : ''}>
                                        Grande Empresa V <br />
                                        <small style={{ fontSize: '11px' }}>Faturamento: acima de R$ 10 Bi </small>
                                    </span>
                                    {companyPort === '10' &&
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4 fadeItem" />
                                    }

                                </li>


                            </ul>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                        <button className="btn btn-success btn-sm" data-bs-dismiss="modal">Salvar</button>
                    </div>
                </div>
            </div>
        </div >

    )

}