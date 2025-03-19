import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




export default function EntriesHistoric() {



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
        <div className="card" style={{ height: '100%' }}>
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
                                <div className="row">
                                    <div>

                                        <span class="badge" style={{ backgroundColor: `${elem.color}` }}>
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
    )


}