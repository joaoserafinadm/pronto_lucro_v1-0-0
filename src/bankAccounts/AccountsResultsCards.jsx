import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { maskNumberMoney } from "../../utils/mask";
import monthName from "../../utils/monthName";
import isMobile from "../../utils/isMobile";




export default function AccountsResultsCards(props) {


    const { dateSelected, data } = props


    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-12 small text-white text-start text-sm-center">
                                <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                    <FontAwesomeIcon icon={faWallet} />
                                </span>
                                <span className=" bold ms-2 fs-5 text-secondary">
                                    Saldo atual
                                </span> <br />
                                <span className="text-success me-1 fs-5">R$</span>
                                <span className="text-secondary pulse fs-3 bold">
                                    {maskNumberMoney(data?.dfcResult) || "0,00"}


                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 ${isMobile() ? '': 'border-start'} `}>
                    <hr className="d-md-none d-block"/>
                        <div className="row">
                            <div className="col-12 small text-white  text-start text-sm-center">
                                <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                    <FontAwesomeIcon icon={faWallet} />
                                </span>
                                <span className=" bold ms-2 fs-5 text-secondary">
                                    Saldo previsto <span className="small" style={{fontSize: '13px'}}>({monthName(dateSelected.month)})</span>
                                </span> <br />
                                <span className="text-success me-1 fs-5">R$</span>
                                <span className="text-secondary fs-3 bold">{maskNumberMoney(data?.dfcResult || data?.dfcPendigResult ? +data?.dfcResult + +data?.dfcPendingResult : 0)}</span><br />

                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}