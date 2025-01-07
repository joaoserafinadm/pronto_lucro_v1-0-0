import { faBank, faCommentAlt, faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { maskInputMoney } from "../../utils/mask"




export default function ViewAccountModal(props) {

    const { accountSelected, setAccountSelected } = props


    console.log("accountSelected", accountSelected)
    return (
        <div class="modal fade" id="viewAccountModal" tabindex="-1" aria-labelledby="viewAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewAccountModalLabel">Visualizar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faBank} />
                                <span className="small fw-bold  ms-3">Instituição Financeira</span>
                                <div className="d-flex align-items-center mt-2">
                                    <span
                                        className={` cardAnimation px-3 py-2  text-white small mx-1 rounded-pill fw-bold `}

                                        style={{ backgroundColor: accountSelected?.color }}>
                                        <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={20} height={20} />
                                        {accountSelected?.bankSelected?.name}
                                    </span>

                                </div>

                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faCommentAlt} />
                                <span className="small fw-bold  ms-3">Descrição</span>
                                <div className="d-flex align-items-center mt-2">
                                    {accountSelected?.description}

                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faMoneyBill} />
                                <span className="small fw-bold  ms-3">Valor disponível na conta</span>
                                <div className="d-flex flex-column align-items-center mt-2">
                                    <div className="col-12">
                                        <span className="text-secondary">Saldo inicial</span>
                                    </div>
                                    <div className="col-12">
                                        <span className="bold">R$ {accountSelected ? maskInputMoney((+accountSelected?.initialValue * 100).toString()) : '0,00'}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column small">
                                    <span>* Valor <b>{accountSelected?.valueSum ? " " : "não "}incluído</b> na soma da tela inicial </span>


                                </div>
                                <div className="d-flex flex-column align-items-center mt-2">
                                    <div className="col-12">
                                        <span className="text-secondary">Saldo atual</span>
                                    </div>
                                    <div className="col-12">
                                        <span className="bold">R$ {accountSelected ? maskInputMoney((+accountSelected?.value * 100).toString()) : '0,00'}</span>
                                    </div>
                                </div>


                            </div>

                        </div>
                        {accountSelected?.creditCard && (
                            <>
                                <hr />

                                <div className="row">
                                    <div className="col-12">
                                        <FontAwesomeIcon icon={faCreditCard} />
                                        <span className="small fw-bold  ms-3">Cartão de crédito</span>
                                        <div className="d-flex flex-column align-items-center mt-2">
                                            <div className="col-12">
                                                <span className="text-secondary">Bandeira</span>
                                            </div>
                                            <div className="col-12 d-flex align-items-center">
                                                <img src={accountSelected?.creditNetwork?.logoUrl} height={40} />
                                                <span className="bold">{accountSelected?.creditNetwork?.descricao}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-center mt-2">
                                            <div className="col-12">
                                                <span className="text-secondary">Limite</span>
                                            </div>
                                            <div className="col-12 d-flex align-items-center">
                                                <span className="bold">R$ {accountSelected ? maskInputMoney((+accountSelected?.creditLimit * 100).toString()) : '0,00'}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-center mt-2">
                                            <div className="col-12">
                                                <span className="text-secondary">Dia de fechamento: <span className="text-black bold">{accountSelected?.diaFechamento}</span></span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-center mt-2">
                                            <div className="col-12">
                                                <span className="text-secondary">Dia de lançamento: <span className="text-black bold">{accountSelected?.diaLancamento}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-sm btn-c-tertiary" data-bs-dismiss="modal">
                            Fechar
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )



}