import { faChartLine, faLock, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"





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
        <div className="card mx-5">
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12 small text-white text-center">
                                <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                    <FontAwesomeIcon icon={faWallet} />
                                </span>
                                <span className=" bold ms-2 fs-5 text-secondary">
                                    Saldo total
                                </span> <br />
                                <span className="text-success me-1 fs-5">R$</span>
                                <span className="text-secondary pulse fs-3 bold">
                                    {brlNumber.format(data?.dfcResult ? data?.dfcResult : 0)}

                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 border-start">
                        <div className="row">
                            <div className="col-12 small text-white  text-center">
                                <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <span className=" bold ms-2 fs-5 text-secondary">
                                    Valor pendente
                                </span> <br />
                                <span className="text-success me-1 fs-5">R$</span>
                                <span className="text-secondary fs-3 bold">{brlNumber.format(data?.monthPendingResult ? data?.monthPendingResult : 0)}</span><br />
                                <span className="small text-success me-1 ">R$</span>
                                <span className="small text-secondary  bold">{brlNumber.format(data?.dfcPendingResult ? data?.dfcPendingResult : 0)} (acumulado)</span>

                            </div>
                        </div>
                    </div>
                    <div className="col-4 border-start">
                        <div className="row">
                            <div className="col-12 small text-white  text-center">
                                <span className="badge rounded-pill  bold me-1 fs-5" style={{ backgroundColor: '#00c661' }}>
                                    <FontAwesomeIcon icon={faChartLine} />
                                </span>
                                <span className=" bold ms-2 fs-5 text-secondary">
                                    Balanço do mês
                                </span> <br />

                                <span className="text-success me-1 fs-5">R$</span>
                                <span className="text-secondary fs-3 bold"> {brlNumber.format(data?.monthResult ? data?.monthResult : 0)}</span>

                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <div className="col-12 d-flex justify-content-center text-center mb-3">
                            <span className="bold text-secondary">Maiores <b className="text-success">receitas</b> do mês</span>
                        </div>




                        <table className="table table-sm">
                            <tbody>
                                {data?.top3Incomes?.map((elem, index) => {

                                    const tagSelected = data?.tags?.find(elem1 => elem1._id === elem?.tag_id);

                                    return (
                                        <tr className=" ">
                                            <td className="fw-bold text-success">{index + 1}º</td>
                                            <td className="fw-bold text-start">{elem.description}</td>
                                            <td>
                                                {!tagSelected ? (
                                                    <span className="px-2 py-1 small rounded-pill border">
                                                        Sem marcador
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={`cardAnimation px-2 py-1 small rounded-pill`}
                                                        style={{
                                                            backgroundColor: tagSelected.color,
                                                            color: tagSelected.textColor,
                                                        }}
                                                    >
                                                        {tagSelected.tag}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="fw-bold text-success">
                                                +{brlNumber.format(elem.value ? elem.value : 0)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>


                    </div>
                    <div className="col-6 border-start">
                        <div className="col-12 d-flex justify-content-center text-center">
                            <span className="bold text-secondary">Maiores <b className="text-danger">despesas</b> do mês</span>
                        </div>
                        <table className="table table-sm">
                            <tbody>
                                {data?.top3Expenses?.map((elem, index) => {

                                    const tagSelected = data?.tags?.find(elem1 => elem1._id === elem?.tag_id);

                                    return (
                                        <tr className=" ">
                                            <td className="fw-bold text-success">{index + 1}º</td>
                                            <td className="fw-bold text-start">{elem.description}</td>
                                            <td>
                                                {!tagSelected ? (
                                                    <span className="px-2 py-1 small rounded-pill border">
                                                        Sem marcador
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={`cardAnimation px-2 py-1 small rounded-pill`}
                                                        style={{
                                                            backgroundColor: tagSelected.color,
                                                            color: tagSelected.textColor,
                                                        }}
                                                    >
                                                        {tagSelected.tag}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="fw-bold text-success">
                                                +{brlNumber.format(elem.value ? elem.value : 0)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>

        </div>
    )
}