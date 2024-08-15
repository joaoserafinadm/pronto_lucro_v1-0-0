import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './BankAccounts.module.scss'
import isMobile from "../../utils/isMobile";
import monthName from "../../utils/monthName";
import { maskNumberMoney } from "../../utils/mask";



export default function AccountsTotalCards(props) {

    const { dateSelected, data } = props



    return (
        <div className="row my-3">
            <div className="col-12 px-lg-3 col-sm-6 d-flex justify-content-center my-1 px-4">
                <div className="col-12  col-md-12 col-lg-12 col-xl-8">
                    <span className={`card rounded-pill shadow cardAnimation `} >
                        <div className={"card-body text-center text-lg-start "} style={{ marginLeft: isMobile() ? '0px' : '80px' }}>

                            <div className={`${styles.cardIcon}`}>
                                <div style={{
                                    backgroundColor: '#00c661',
                                }}>

                                    <FontAwesomeIcon icon={faWallet} className=" fs-3 text-white" />
                                </div>
                            </div>

                            <span className=" bold me-1 fs-6 text-secondary">
                                Saldo atual
                            </span> <br />
                            <span className="text-success me-1 fs-5">R$</span>
                            <span className="text-secondary pulse fs-3 bold">

                                {maskNumberMoney(data?.dfcResult) || "0,00"}
                            </span>
                        </div>
                    </span>
                </div>
            </div>
            <div className="col-12 px-lg-3 col-sm-6 d-flex justify-content-center my-1 px-4">
                <div className="col-12  col-md-12 col-lg-12 col-xl-8">
                    <span className={`card rounded-pill shadow cardAnimation `} >
                        <div className={"card-body text-center text-lg-start "} style={{ marginLeft: isMobile() ? '0px' : '80px' }}>

                            <div className={`${styles.cardIcon}`}>
                                <div style={{
                                    backgroundColor: '#00c661',
                                }}>

                                    <FontAwesomeIcon icon={faWallet} className=" fs-3 text-white" />
                                </div>
                            </div>

                            <span className=" bold me-1 fs-6 text-secondary">
                                Saldo previsto <span className="small">({monthName(dateSelected.month)})</span>
                            </span> <br />
                            <span className="text-success me-1 fs-5">R$</span>
                            <span className="text-secondary pulse fs-3 bold">
                                {maskNumberMoney(data?.dfcResult || data?.dfcPendigResult ? +data?.dfcResult + +data?.dfcPendingResult: 0)}
                            </span>
                        </div>
                    </span>
                </div>
            </div>





        </div>
    )
}