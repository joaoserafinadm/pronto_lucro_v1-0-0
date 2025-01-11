import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isMobile from "../../utils/isMobile";



export default function ToolsCard(props) {




    return (
        <div className="card cardAnimation my-3">
            <div className="card-body d-flex">
                {!isMobile() ?
                    <>
                        <div className={` fadeItem ${props.check ? 'akvo-cardCheck' : 'akvo-cardUncheck'}`}>
                            <FontAwesomeIcon icon={props.check ? faCheck : faXmark} className="akvo-cardCheck-checked" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '150px' }}>
                            <img src={props.imgUrl} alt="" height={150} />
                        </div>
                        <div className="col-12 col-md">
                            <div className="row d-flex justify-content-end">
                                <h5 className="text-c-secondary">
                                    {props.title}
                                </h5>
                            </div>
                            <div className="row">
                                <span>
                                    {props.description}
                                </span>
                            </div>
                            <div className="row">
                                <ul className=" ms-3" >
                                    {props.list.map((item, index) => (

                                        <span key={index} className="list-group-item p_Card"><FontAwesomeIcon icon={faCheck} className="text-success me-2" />{item}</span>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div style={{ width: '200px' }} >
                            {!props.check ?
                                <>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-sm btn-outline-success mb-2">Solicitar Demonstração</button>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-sm btn-success">Habilitar Ferramenta</button>
                                    </div>
                                </>
                                :
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-sm btn-outline-danger">
                                        Desabilitar Ferramenta
                                    </button>
                                </div>

                            }

                        </div>
                    </>
                    :
                    <>
                        <div className={` fadeItem ${props.check ? 'akvo-cardCheck-end' : 'akvo-cardUncheck-end'}`} style={{ transform: 'rotate(-45deg)' }}>
                            <FontAwesomeIcon icon={props.check ? faCheck : faXmark} className="akvo-cardCheck-checked-end" />
                        </div>
                        <div className="row">
                            <div className="col-12 ">
                                <div className="row d-flex justify-content-end">
                                    <h5 className="text-success pe-3">
                                        {props.title}
                                    </h5>
                                </div>
                                <div className="row  mt-2">
                                    <span>
                                        {props.description}
                                    </span>
                                </div>
                                <div className="row">
                                    <ul className=" ms-3" >
                                        {props.list.map((item, index) => (

                                            <span className="list-group-item p_Card"><FontAwesomeIcon icon={faCheck} className="text-success me-2" />{item}</span>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12" >
                                {!props.check ?
                                    <div className="row px-2">
                                        <button className="btn btn-sm btn-outline-success mb-2">Solicitar Demonstração</button>
                                        <button className="btn btn-sm btn-success">Habilitar Ferramenta</button>
                                    </div>
                                    :
                                    <div className="row  px-2">

                                        <button className="btn btn-sm btn-outline-danger">
                                            Desabilitar Ferramenta
                                        </button>
                                    </div>

                                }

                            </div>
                        </div>
                    </>

                }




            </div>
        </div>
    )
}