import { faChevronLeft, faChevronRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardTemplate from "../bankAccounts/CardTemplate";
import { maskNumberMoney } from "../../utils/mask";
import NewAccountCard from "../bankAccounts/NewAccountCard";




export default function AccountsConfigCardsTutorial(props) {

    const { bankAccounts } = props



    return (
        <div className="row d-flex mx-sm-3">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Suas Contas</span>
            </div>
            <hr />
            <div className="col-12 my-3 fadeItem1s">
                <div className="row">
                    <span className=" fs-5 my-1 mb-3">Cadastre suas contas: </span>

                    {bankAccounts.reverse().map(elem => {
                        return (

                            <div className="col-12 d-flex justify-content-center align-items-center my-2">
                                <CardTemplate tutorial
                                    bankSelected={elem.bankSelected}
                                    color={elem.color}
                                    value={maskNumberMoney(elem.initialValue)}
                                    description={elem.description}
                                    creditNetwork={elem.creditNetwork} />

                                <button className="btn btn-outline-secondary btn-sm ms-1">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </div>
                        )
                    })}
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <div style={{ width: "278px" }}>
                            <div className="card cardAnimation" type='button' data-bs-target="#tutorialPages" data-bs-slide-to={4}>
                                <div className="card-body">

                                    <div className="col-12 d-flex justify-content-center align-items-center">
                                        <span className={`newAccountCardIcon`}>
                                            +
                                        </span>
                                        <span className='ms-2 text-secondary bold'>
                                            Nova conta
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={2}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={6}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>
        </div>

    )
}