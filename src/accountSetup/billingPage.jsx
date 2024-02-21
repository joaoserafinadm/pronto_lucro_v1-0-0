import { faEnvelope, faIdCard, faMailBulk, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InvoicesModal from "./invoicesModal";
import CardFormModal from "./cardFormModal";
import CompanyPortModal from "./companyPortModal";



export default function BillingPage(props) {





    return (
        <div className="fadeItem">
            <div className="row ">
                <div className="col-12 col-md-3 pt-3">
                    <span className="fs-4 text-bold text-success" >Classificação da Instituição</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>
                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Porte da Instituição
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <div>
                                <small>Média Empresa I</small> <br />
                                <small>Faturamento: R$ 4.8 Mi até R$ 6 Mi</small> <br />
                                <small className="text-warning">Aguardando avaliação</small>
                            </div>
                            <span
                                type="button"
                                className="text-success"
                                data-bs-toggle="modal"
                                data-bs-target="#companyPortModal">
                                <FontAwesomeIcon icon={faPencil} />
                            </span>

                        </div>
                    </div>


                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-3 pt-3">
                    <span className="fs-4 text-bold text-success" >Plano</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>
                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Assitura e produtos
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <div>
                                <small>&#8226; Calculdora GEE</small> <br />
                                <small className="ms-3">Módulo: Relatório Customizado</small> <br />
                                <small className="ms-3">Consultoria</small> <br />
                                <small>&#8226; Calculdora GEE</small> <br />
                                <small className="ms-3">Módulo: Relatório Customizado</small> <br />
                                <small className="ms-3">Consultoria</small>
                            </div>
                            <span
                                type="button"
                                className="text-success"
                                data-bs-toggle="modal"
                                data-bs-target="#companyPortModal">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>

                        </div>
                    </div>


                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-3 pt-3">
                    <span className="fs-4 text-bold text-success" >Cobrança</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>
                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Endereço de Cobrança
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <div>

                                <small>JOÃO MARCEL SERAFIN</small><br />
                                <small>Av. tiradentes, nº 1655</small><br />
                                <small>Erechim, Rio Grande do Sul, 99701-502 </small> <br />
                                <small>BR</small>
                            </div>
                            <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} /></span>

                        </div>
                    </div>
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Endereço da Fatura
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <div>

                                <small>JOÃO MARCEL SERAFIN</small><br />
                                <small>Av. tiradentes, nº 1655</small><br />
                                <small>Erechim, Rio Grande do Sul, 99701-502 </small> <br />
                                <small>BR</small>
                            </div>
                            <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} /></span>

                        </div>
                    </div>

                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-3 pt-3 pb-4">
                    <span className="fs-4 text-bold text-success" >Pagamento</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>

                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Forma de Pagamento
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <span type="button"
                                className="span"
                                data-bs-toggle="modal"
                                data-bs-target="#cardFormModal">+ Adicionar forma de pagamento</span>
                            {/* <div>
                                <small><FontAwesomeIcon icon={faIdCard} /> Visa terminando em <b>0120</b></small><br />
                                <small className="text-secondary">Expira em 6/2026</small>
                            </div>*/}
                            <span
                                type="button"
                                className="text-success"
                                data-bs-toggle="modal"
                                data-bs-target="#cardFormModal">
                                <FontAwesomeIcon icon={faPencil} />
                            </span>

                        </div>
                    </div>

                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-3 pt-3 pb-4">
                    <span className="fs-4 text-bold text-success" >Faturas</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>

                <div className="col-12 col-md-9 mt-2 " style={{ height: '250px', overflowY: 'scroll' }}>



                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-warning" style={{ width: '100px' }}>
                            <span>
                                Pendente
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Julho de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>
                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-success" style={{ width: '100px' }}>
                            <span>
                                Pago
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Junho de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>
                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-success" style={{ width: '100px' }}>
                            <span>
                                Pago
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Maio de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>
                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-success" style={{ width: '100px' }}>
                            <span>
                                Pago
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Abril de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>
                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-success" style={{ width: '100px' }}>
                            <span>
                                Pago
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Março de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>
                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-success" style={{ width: '100px' }}>
                            <span>
                                Pago
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Fevereiro de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>
                    <span type='button' className="row border-bottom py-3" data-bs-toggle="modal" data-bs-target="#invoicesModal">
                        <div className="text-success" style={{ width: '100px' }}>
                            <span>
                                Pago
                            </span>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <small>1º de Janeiro de 2023</small>
                            <small>R$ 19.90</small>
                        </div>
                    </span>


                </div>


                <InvoicesModal />

                <CardFormModal />

                <CompanyPortModal />
            </div>

            <div className="row mt-5 ">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-sm btn-outline-danger">Cancelar Assinatura</button>
                </div>
            </div>

        </div>

    )
}