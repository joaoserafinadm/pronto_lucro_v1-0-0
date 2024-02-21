import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function CalculadoraGeeCard(props) {



    return (

        <div className="card cardAnimation my-3">
            <div className="card-body d-flex">
                <div className="akvo-cardUncheck fadeItem">
                    <FontAwesomeIcon icon={faXmark} className="akvo-cardCheck-checked" />
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: '150px' }}>
                    <img src="./InventarioGEE_icon.png" alt="" height={150} />
                </div>
                <div className="col">
                    <div className="row">
                        <h5 className="text-success">
                            Calculadora GEE
                        </h5>
                    </div>
                    <div className="row">
                        <span>
                            Crie o inventário de emissões de GEE da sua instituição.
                        </span>
                    </div>
                </div>
                <div >
                    {props.check ?
                        <>
                            <div>
                                <button className="btn btn-sm btn-outline-success mb-2">Solicitar Demonstração</button>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-success">Assinar Ferramenta</button>
                            </div>
                        </>
                        :
                        <div>
                            <button className="btn btn-sm btn-outline-danger">
                                Cancelar Assinatura
                            </button>
                        </div>

                    }

                </div>



            </div>
        </div>
    )
}