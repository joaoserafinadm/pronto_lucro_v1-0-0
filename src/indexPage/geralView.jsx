import { faArrowAltCircleUp, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HideValue from "../components/hideElemet/hideValue";




export default function GeralView(props) {




    return (
        <div className="row">
            <div className="col-12 d-flex">
                <div className="col-6 d-flex justify-content-center">
                    <div className="cardAnimation">

                        <div className="row ">
                            <div className="col-12 d-flex align-items-center">

                                <FontAwesomeIcon icon={faArrowUp} className="text-c-success me-2" />
                                <span className="small fw-bold text-secondary">Receitas</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" style={{ height: "50px" }}>
                                {props.valueView ?
                                    <span className="fs-4 bold text-c-success">
                                        R$ 1.500,00
                                    </span>
                                    :
                                    <span className="fs-4 bold text-c-success">
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

                                <FontAwesomeIcon icon={faArrowDown} className="text-c-danger me-2" />
                                <span className="small fw-bold text-secondary">Despesas</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" style={{ height: "50px" }}>
                                {props.valueView ?
                                    <span className="fs-4 bold text-c-danger">
                                        R$ 1.500,00
                                    </span>
                                    :
                                    <span className="fs-4 bold text-c-danger">
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