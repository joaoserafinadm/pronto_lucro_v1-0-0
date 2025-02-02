import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlanoDeContasConfigModal from "./planoDeContasConfigModal";
import { useStateContext } from "./context/resultsContext";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useEffect } from "react";
import PlanoDeContasTable from "./planoDeContasTable";



export default function PlanoDeContasPage(props) {


    const token = jwt.decode(Cookie.get("auth"));


    const {
        setPlanoDeContasConfig,
        planoDeContasConfig
    } = useStateContext();

    useEffect(() => {
        dataFunction();
    }, [])

    const dataFunction = async () => {

        await axios.get("/api/results/planoDeContas", {
            params: {
                user_id: token.sub
            }
        }).then(res => {
            setPlanoDeContasConfig(res.data.planoDeContasConfig)
        }).catch(e => {
            console.log(e)
        })

    }

    return (
        <div>

            <PlanoDeContasConfigModal dataFunction={dataFunction} />


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
                        <>
                            <div className="col-12">
                                <PlanoDeContasTable />
                            </div>
                            <div className="col-12 my-5 d-flex justify-content-center">
                                <button className="btn btn-c-secondary" data-bs-toggle="modal" data-bs-target="#planoDeContasConfigModal">
                                    <FontAwesomeIcon icon={faList} className="me-2" />
                                    Configurar Plano de Contas
                                </button>
                            </div>
                        </>
                    }
                </div>


            </div>
        </div>

    )



}