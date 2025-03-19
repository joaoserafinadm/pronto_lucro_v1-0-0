import InputsHistoric from "./InputsHistoric"




export default function InputsHistoricModal(props) {

    const { lastDataInputs, categories } = props


    return (
        <div class="modal fade" id="inputsHistoricModal" tabindex="-1" aria-labelledby='inputsHistoricModalLabel' aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id='inputsHistoricModalLabel'>Últimas transações</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <InputsHistoric lastDataInputs={lastDataInputs} categories={categories} />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>

                </div>
            </div>
        </div>
    )



}