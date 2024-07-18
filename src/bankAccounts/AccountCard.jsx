import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import monthName from "../../utils/monthName";
import { faArrowTrendDown, faArrowTrendUp, faArrowUp, faChevronRight, faEllipsisVertical, faEye, faGear, faListDots } from "@fortawesome/free-solid-svg-icons";



export default function AccountCard(props) {

    const { dateSelected } = props


    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div style={{ width: "40px", height: "40px" }}>
                        <img src="/logo-sicredi.png" alt=""
                            height={40} className="cardIcon" />
                    </div>
                    <div className="col d-flex align-items-center">
                        <span className="ms-2 fs-5 bold text-secondary">
                            Conta Salário
                        </span>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 my-2 d-flex justify-content-between ">
                        <span className="bold text-secondary">Saldo atual</span>
                        <span className="bold text-success">R$10.000,00</span>

                    </div>
                    <div className="col-12 my-2 d-flex justify-content-between text-secondary">
                        <div className="">
                            <span>Saldo previsto</span><br />
                            <span className="small">({monthName(dateSelected.month)})</span>
                        </div>
                        <div className="text-end">

                            <span>R$10.000,00</span><br />
                            <span className="small text-success"><FontAwesomeIcon icon={faArrowUp} className="me-1"/>10%</span>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <span type='button' className="cardAnimation text-secondary  mx-1 px-2">
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                        <span type='button' className="cardAnimation text-success mx-1 px-2">
                            <FontAwesomeIcon icon={faArrowTrendUp} />
                        </span>
                        <span type='button' className="cardAnimation text-danger mx-1 px-2">
                            <FontAwesomeIcon icon={faArrowTrendDown} />
                        </span>
                        <span type='button' className="cardAnimation text-secondary  mx-1 px-2">
                            <FontAwesomeIcon icon={faGear} />
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )


}