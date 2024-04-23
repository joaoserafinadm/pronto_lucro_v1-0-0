import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HideValue from "../components/hideElemet/hideValue";



export default function SaldoView(props) {






    return (
        <div className="row pt-4 pb-3">
            <div className="col-12 d-flex justify-content-center">
                <span className=" bold text-secondary">
                    Saldo em conta
                </span>

            </div>
            <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
                {props.valueView ?
                    <span className="fs-1 bold">
                        R$ 15.000,00
                    </span>
                    :
                    <span className="fs-1 bold d-flex justify-content-center align-items-center">
                        <HideValue />
                    </span>
                }

            </div>
            <div className="col-12 d-flex justify-content-center my-2">
                {props.valueView ?
                    <span className="text-secondary" type="button" onClick={() => props.setValueView(false)}>
                        <FontAwesomeIcon icon={faEyeSlash} />

                    </span>
                    :
                    <span className="text-secondary" type="button" onClick={() => props.setValueView(true)}>
                        <FontAwesomeIcon icon={faEye} />

                    </span>
                }
            </div>

        </div>
    )
}