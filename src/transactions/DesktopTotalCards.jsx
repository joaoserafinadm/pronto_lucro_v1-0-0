import { faArrowsUpDown, faChartLine, faLock, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './transactions.module.scss'
import isMobile from "../../utils/isMobile";



export default function DesktopTotalCards(props) {

    const { data } = props

    const brlNumber = {
        format: (value) => value.toLocaleString('pt-BR', { decimal: '.', style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    return (


        <div className="row d-flex justify-content-center px-2">
            <div className="col-12 col-xl-12 col-lg-4 col-sm-12  px-1 my-1">

                <span className={`card rounded-pill shadow cardAnimation `} >
                    <div className={"card-body text-center text-lg-start "} style={{ marginLeft: isMobile() ? '0px' : '80px' }}>

                        <div className={`${styles.cardIcon}`}>
                            <div style={{
                                backgroundColor: '#00c661',
                            }}>

                                <FontAwesomeIcon icon={faWallet} className=" fs-3 text-white" />
                            </div>
                        </div>

                        <span className=" bold me-1 fs-5 text-secondary">
                            Saldo total
                        </span> <br />
                        <span className="text-success me-1 fs-5">R$</span>
                        <span className="text-secondary pulse fs-3 bold">
                            {brlNumber.format(data?.dfcResult ? data?.dfcResult : 0)}
                        </span>
                    </div>
                </span>
            </div>
            <div className="col-12 col-xl-12 col-lg-4 col-sm-6  px-1 my-1">

                <span className={`card rounded-pill shadow cardAnimation `} >
                    <div className={"card-body text-center text-lg-start "} style={{ marginLeft: isMobile() ? '0px' : '80px' }}>

                        <div className={`${styles.cardIcon}`}>
                            <div style={{
                                backgroundColor: '#00c661',
                            }}>

                                <FontAwesomeIcon icon={faLock} className=" fs-3 text-white" />
                            </div>
                        </div>

                        <span className=" bold me-1 fs-5 text-secondary">
                            Valor pendente
                        </span> <br />
                        <span className="text-success me-1 fs-5">R$</span>
                        <span className="text-secondary fs-3 bold">{brlNumber.format(data?.dfcPendingResult ? data?.dfcPendingResult : 0)}</span>
                    </div>
                </span>
            </div>
            <div className="col-12 col-xl-12 col-lg-4 col-sm-6  px-1 my-1">

                <span className={`card rounded-pill shadow cardAnimation `} >
                    <div className={"card-body text-center text-lg-start "} style={{ marginLeft: isMobile() ? '0px' : '80px' }}>
                        <div className={`${styles.cardIcon}`}>
                            <div style={{
                                backgroundColor: '#00c661',
                            }}>

                                <FontAwesomeIcon icon={faChartLine} className=" fs-3 text-white" />
                            </div>
                        </div>

                        <span className=" bold me-1 fs-5 text-secondary">
                            Balanço do mês
                        </span> <br />
                        <span className="text-success me-1 fs-5">R$</span>
                        <span className="text-secondary fs-3 bold">testes</span>
                    </div>
                </span>
            </div>
        </div>

    )
}