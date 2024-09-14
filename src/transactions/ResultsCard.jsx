import { faChartLine, faLock, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import isMobile from "../../utils/isMobile"





export default function ResultsCard(props) {

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
            {isBeforeOrEqual(dateSelected, actualDate) ?
                <div className="col-12">

                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-4 ">
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
                                                {brlNumber.format(data?.dfcResult ? data?.dfcResult : 0)}

                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-4 ${isMobile() ? '' : 'border-start'} `}>
                                    <hr className="d-md-none d-block" />
                                    <div className="row">
                                        <div className="col-12 small text-white  text-start text-sm-center">
                                            <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                                <FontAwesomeIcon icon={faLock} />
                                            </span>
                                            <span className=" bold ms-2 fs-5 text-secondary">
                                                Valor pendente
                                            </span> <br />
                                            <span className={`text-${data?.dfcPendingResult < 0 ? 'c-danger' : 'success'} me-1 fs-5`}>R$</span>
                                            <span className={`text-${data?.dfcPendingResult < 0 ? 'c-danger' : 'secondary'} fs-3 bold`}>{brlNumber.format(data?.monthPendingResult ? data?.monthPendingResult : 0)}</span><br />
                                            <span className="small text-secondary me-1 ">R$</span>
                                            <span className={`small text-${data?.dfcPendingResult < 0 ? 'c-danger' : 'secondary'}  bold`}>{brlNumber.format(data?.dfcPendingResult ? data?.dfcPendingResult : 0)} (acumulado)</span>

                                        </div>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-4 ${isMobile() ? '' : 'border-start'} `}>
                                    <hr className="d-md-none d-block" />
                                    <div className="row">
                                        <div className="col-12 small text-white  text-start text-sm-center">
                                            <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                                <FontAwesomeIcon icon={faChartLine} />
                                            </span>
                                            <span className=" bold ms-2 fs-5 text-secondary">
                                                Balanço do mês
                                            </span> <br />

                                            <span className={`text-${data?.monthResult < 0 ? 'c-danger' : 'success'} me-1 fs-5`}>R$</span>
                                            <span className="text-secondary fs-3 bold"> {brlNumber.format(data?.monthResult ? data?.monthResult : 0)}</span><br />
                                            + <span className="small text-secondary me-1 ">{data?.monthPendingResult < 0 ? '' : '+'}R$</span>
                                            <span className={`small text-${data?.monthPendingResult < 0 ? 'c-danger' : 'secondary'}  bold`}>{brlNumber.format(data?.monthPendingResult ? data?.dfcPendingResult : 0)} (pendente)</span>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
                :
                <div className="row d-flex justify-content-center">

                    <div className="col-4 " >

                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className="row">
                                            <div className="col-12 small text-white text-start text-sm-center">
                                                <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                                    <FontAwesomeIcon icon={faWallet} />
                                                </span>
                                                <span className=" bold ms-2 fs-5 text-secondary">
                                                    Saldo previsto
                                                </span> <br />
                                                <span className="text-success me-1 fs-5">R$</span>
                                                <span className="text-secondary pulse fs-3 bold">
                                                    {brlNumber.format(data?.dfcResult || data?.dfcPendigResult ? +data?.dfcResult + +data?.dfcPendingResult : 0)}

                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            }
        </>

    )
}