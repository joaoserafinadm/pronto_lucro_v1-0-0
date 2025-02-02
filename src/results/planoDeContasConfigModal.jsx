import { useState } from "react";
import PlanoDeContasConfig from "./planoDeContasConfig";
import PlanoDeContasNewConfig from "./planoDeContasNewConfig";
import PlanoDeContasConfigEdit from "./planoDeContasConfigEdit";
import PlanoDeContasShuffleResults from "./planoDeContasShuffleResults";
import PlanoDeContasShuffleCategories from "./planoDeContasShuffleCategories";



export default function PlanoDeContasConfigModal(props) {

    const { dataFunction } = props

    const [planoDeContasEdit, setPlanoDeContasEdit] = useState(null)



    return (
        <div class="modal fade" id="planoDeContasConfigModal" tabindex="-1" aria-labelledby="planoDeContasConfigModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="planoDeContasConfigModalLabel">Configurar Plano de Contas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <div
                                    className="carousel slide"
                                    data-bs-touch="false"
                                    data-bs-interval="false"
                                    id="planoDeContasConfigCarousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <PlanoDeContasConfig
                                                dataFunction={dataFunction}
                                                setPlanoDeContasEdit={elem => setPlanoDeContasEdit(elem)} />

                                        </div>
                                        <div className="carousel-item ">

                                            <PlanoDeContasNewConfig dataFunction={dataFunction} />
                                        </div>
                                        <div className="carousel-item ">

                                            <PlanoDeContasConfigEdit
                                                dataFunction={dataFunction}
                                                planoDeContasEdit={planoDeContasEdit}
                                                setPlanoDeContasEdit={elem => setPlanoDeContasEdit(elem)} />
                                        </div>
                                        <div className="carousel-item ">

                                            <PlanoDeContasShuffleResults
                                                dataFunction={dataFunction} />
                                        </div>
                                        <div className="carousel-item ">

                                            <PlanoDeContasShuffleCategories
                                                planoDeContasEdit={planoDeContasEdit}
                                                setPlanoDeContasEdit={elem => setPlanoDeContasEdit(elem)}
                                                dataFunction={dataFunction} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}