import { faLock, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { maskMoneyNumber } from "../../utils/mask"




export default function DfcResultsCard(props) {

    const { data } = props

    const brlMoney = {
        format: (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }



    return (
        <div className="row">
            <div className="col-6">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center" style={{ width: "50px" }}>
                        <FontAwesomeIcon icon={faMoneyBill} className="fs-3" />
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-12">
                                <span>
                                    Saldo total
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <span>
                                    {brlMoney.format(data?.dfcResult ? data?.dfcResult : 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-6">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center" style={{ width: "50px" }}>
                        <FontAwesomeIcon icon={faLock} className="fs-3" />
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-12">
                                <span>
                                    Valor pendente
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <span>
                                    {brlMoney.format(data?.dfcPendingResult ? data?.dfcPendingResult : 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}