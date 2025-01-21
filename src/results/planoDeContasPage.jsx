import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlanoDeContasConfigModal from "./planoDeContasConfigModal";
import { useStateContext } from "./context/resultsContext";




export default function PlanoDeContasPage(props) {

    const {
        planoDeContasConfig
    } = useStateContext();

    return (
        <div>

            <PlanoDeContasConfigModal />


            <div className="card">

                <div className="row">
                    {!planoDeContasConfig.length ?
                        <div className="col-12 my-5 d-flex justify-content-center">
                            <button className="btn btn-c-secondary" data-bs-toggle="modal" data-bs-target="#planoDeContasConfigModal">
                                <FontAwesomeIcon icon={faList} className="me-2" />
                                Configurar Plano de Contas
                            </button>
                        </div>
                        :
                        <div>

                        </div>
                    }
                </div>


            </div>
        </div>

    )



}