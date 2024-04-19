import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




export default function EntriesHistoric() {



    const data = [
        {
            tag: 'geral',
            description: 'Produtos de limpeza',
            type: "expense",
            value: 150
        },
        {
            tag: 'imprevistos',
            description: 'Manutenção do carro',
            type: "expense",
            value: 785
        },
        {
            tag: 'Produto 1',
            description: 'Venda - produto 1',
            type: "revenue",
            value: 1200
        },
        

    ]


    return (
        <div className="card" style={{ height: '100%' }}>
            <div className="card-body">
                <div className="row">
                    <span className='bold text-secondary'>
                        Histórico de entradas
                    </span>
                </div>
                <table className="table table-sm" style={{ overflowY: 'scroll' }}>

                    <tbody>

                        {data.map((elem, index) => (
                            <tr className="small">
                                <td >
                                    <FontAwesomeIcon className={`${elem.type === 'revenue' ? 'text-success' : 'text-danger'}`}
                                        icon={elem.type === 'revenue' ? faArrowUp : faArrowDown} />

                                </td>
                                <td className=" bold text-secondary text-start">

                                    {elem.description}
                                </td>
                                <td className=" bold text-secondary text-end">

                                    {elem.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )


}