import { faArrowsUpDown, faChartLine, faLock, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './transactions.module.scss'
import isMobile from "../../utils/isMobile";



export default function DesktopTotalCards(props) {

    const { data, dateSelected } = props

    const actualDate = {
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    }

    const brlNumber = {
        format: (value) => value.toLocaleString('pt-BR', { decimal: '.', style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    const isBeforeOrEqual = (a, b) => {
        if (+a.year < +b.year) return true;
        if (+a.year === +b.year && +a.month <= +b.month) return true;
        return false;
    }

    return (

        <>
            {isBeforeOrEqual( dateSelected, actualDate) ?
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
                                <span className="text-secondary fs-3 bold">{brlNumber.format(data?.monthPendingResult ? data?.monthPendingResult : 0)}</span><br />
                                <span className="small text-success me-1 ">R$</span>
                                <span className="small text-secondary  bold">{brlNumber.format(data?.dfcPendingResult ? data?.dfcPendingResult : 0)} (acumulado)</span>
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
                                <span className="text-secondary fs-3 bold"> {brlNumber.format(data?.monthResult ? data?.monthResult : 0)}</span>
                            </div>
                        </span>
                    </div>
                </div>

                :
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
                                    Saldo previsto
                                </span> <br />
                                <span className="text-success me-1 fs-5">R$</span>
                                <span className="text-secondary pulse fs-3 bold">
                                    {brlNumber.format(data?.dfcResult || data?.dfcPendigResult ? +data?.dfcResult + +data?.dfcPendingResult: 0)}
                                </span>
                            </div>
                        </span>
                    </div>
                   
                </div>
            }


        </>


    )
}