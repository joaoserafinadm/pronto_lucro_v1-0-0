import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDate } from "../../utils/mask"
import TypeIcon from "./TypeIcon"
import { faClipboard, faDotCircle, faEdit, faFile, faPaperclip, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons"




export default function DesktopTransactionsList(props) {

    const { data } = props

    const brlMoney = {
        format: (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    return (
        <>
            {data?.dfcData?.length === 0 ?
                <div className="row my-5">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <span className='small'>Nenhum lançamento neste mês</span>
                    </div>
                </div>
                :


                <table className="table table-sm mx-1">
                    <thead>
                        <tr>
                            <th >

                            </th>
                            <th className="text-start">
                                Data
                            </th>
                            <th className="text-start">
                                Descrição
                            </th>
                            <th className="text-start">
                                Marcador
                            </th>
                            <th className="text-start">
                                Conta
                            </th>
                            <th className="text-end">
                                Valor
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {data?.dfcData?.map((elem, index) => {

                            const tagSelected = data?.tags?.find(elem1 => elem1._id === elem?.tag);


                            return (

                                <tr key={index}>

                                    <td className="text-center ">
                                        <TypeIcon elem={elem} />
                                    </td>
                                    <td className="text-start " style={{ fontSize: '12px' }}>
                                        {formatDate(elem?.paymentDate)}
                                    </td>
                                    <td className="text-start small">
                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                    </td>
                                    <td className="text-start">
                                        {!tagSelected ?
                                            <span class=" px-2 py-1  small rounded-pill border">
                                                Sem marcador
                                            </span>
                                            :
                                            <>
                                                <div className="row">
                                                    <div>
                                                        <span type="button"
                                                            className={`cardAnimation px-2 py-1   small rounded-pill fw-bold `}
                                                            style={{ backgroundColor: tagSelected.color, color: tagSelected.textColor, fontSize: '10px' }}>
                                                            {tagSelected.tag}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </td>
                                    <td className="text-start">
                                        <span class=" px-3 py-1 border border-rounded   small mx-1 rounded-pill ">
                                            <img src="/logo-sicredi.png" className="rounded-circle me-1" height={15} alt="" /> Sicredi
                                        </span>
                                    </td>
                                    <td className={`text-end text-${elem?.active === false ? 'secondary' : elem?.type === 'income' ? 'success' : 'danger'}`}>
                                        {elem?.type === 'expense' && '(-)'}{brlMoney.format(elem?.value)} <br />
                                        <span style={{ fontSize: '12px' }}>{elem?.active === false && 'Pendente'}</span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-secondary me-2">

                                            {elem.files && (
                                                <span className="bg-success me-1" style={{ display: 'inline-block', height: '10px', width: '10px', borderRadius: '50%' }} />

                                            )}
                                            <FontAwesomeIcon icon={faPaperclip} />


                                        </button>
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-secondary">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </>

    )

}