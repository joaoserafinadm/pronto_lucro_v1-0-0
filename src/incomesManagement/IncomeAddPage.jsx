import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../components/icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";



export default function IncomeAddPage() {



    return (
        <div>
            <div className="row my-3">
                <div className="col-12 d-flex">
                    <span className="ms-3"><Icons icon='a-l' /></span>
                    <span className="ms-3 bold">Nova Receita</span>

                </div>
            </div>


            <div className="row px-3 my-2">
                <div className="col-12 ">
                    <span className="small">Valor da receita</span>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="d-flex fs-1 ">
                        <span className="me-1">R$</span>
                        <span className="fw-bold">0,00</span>
                    </div>
                    <div className="d-flex fs-3 ">
                        <span className="me-1">BRL</span>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-12">

                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-success">
                                        Hoje
                                    </span>
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary">
                                        Ontem
                                    </span>
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary">
                                        Outros...
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>



                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faMicrophone} />
                                </div>
                                <div className="col d-flex">
                                   <input type="text" class="form-control" placeholder="Descrição" />
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}