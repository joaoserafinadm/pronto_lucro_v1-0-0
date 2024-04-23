import { faArrowDown, faArrowTrendDown, faArrowTrendUp, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




export default function EntriesHistoricModal(props) {

    const data = [
        {
            tag: 'geral',
            description: 'Produtos de limpeza',
            type: "expense",
            value: 150,
            color: '#2a9d8f'
        },
        {
            tag: 'imprevistos',
            description: 'Manutenção do carro',
            type: "expense",
            value: 785,
            color: '#e9c46a'
        },
        {
            tag: 'Produto 1',
            description: 'Venda - produto 1',
            type: "revenue",
            value: 1200,
            color: '#f4a261'
        },


    ]

    return (
        <div
            className="modal fade"
            id="entriesHistoricModal"
            tabindex="-1"
            aria-labelledby="entriesHistoricModalLabel"
            aria-hidden="true"        >

            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title title-dark" id="entriesHistoricModalLabel">
                            Histórico de entradas
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-sm" style={{ overflowY: 'scroll' }}>

                            <tbody>

                                {data.map((elem, index) => (
                                    <tr className="small">
                                        <td >
                                            <FontAwesomeIcon className={`${elem.type === 'revenue' ? 'text-success' : 'text-danger'}`}
                                                icon={elem.type === 'revenue' ? faArrowUp : faArrowDown} />

                                        </td>
                                        <td className=" bold text-secondary text-start">
                                            <div className="row">
                                                <div>

                                                    <span class="badge" style={{ backgroundColor: elem.color }}>
                                                        {elem.tag}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <span>


                                                    {elem.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td className=" bold text-secondary text-end">

                                            R${elem.value},00
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            data-bs-dismiss="modal"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )


}