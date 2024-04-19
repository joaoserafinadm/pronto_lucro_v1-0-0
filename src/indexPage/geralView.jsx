import { faArrowAltCircleUp, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HideValue from "../components/hideElemet/hideValue";




export default function GeralView(props) {




    return (
        <div className="row py-3">
            <div className="col-12 d-flex">
                <div className="col-6 d-flex justify-content-center">
                    <div className="cardAnimation">

                        <div className="row ">
                            <div className="col-12 d-flex align-items-center">

                                <FontAwesomeIcon icon={faArrowUp} className="text-success me-2" />
                                <span className="bold text-secondary">Receitas</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" style={{ height: "50px" }}>
                                {props.valueView ?
                                    <span className="fs-4 bold text-success">
                                        R$ 1.500,00
                                    </span>
                                    :
                                    <span className="fs-4 bold text-success">
                                        <HideValue />
                                    </span>

                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-6 d-flex justify-content-center">
                    <div>

                        <div className="row ">
                            <div className="col-12 d-flex align-items-center">

                                <FontAwesomeIcon icon={faArrowDown} className="text-danger me-2" />
                                <span className="bold text-secondary">Despesas</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" style={{ height: "50px" }}>
                                {props.valueView ?
                                    <span className="fs-4 bold text-danger">
                                        R$ 1.500,00
                                    </span>
                                    :
                                    <span className="fs-4 bold text-danger">
                                        <HideValue />
                                    </span>

                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div >
    )


}