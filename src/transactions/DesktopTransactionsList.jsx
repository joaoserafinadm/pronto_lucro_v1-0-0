import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDate } from "../../utils/mask"
import TypeIcon from "./TypeIcon"
import { faClipboard, faDotCircle, faEdit, faEllipsis, faFile, faPaperclip, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import TagSelected from "./tagSelected"




export default function DesktopTransactionsList(props) {

    const { data, setIncomeSelected } = props

    console.log('data', data)

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


                <table className="table   " style={{ borderRadius: '20px !important' }}>
                    <thead className="table-secondary text-secondary">
                        <tr className="">
                            <th >

                            </th>
                            <th className="text-start small">
                                Data
                            </th>
                            <th className="text-start small">
                                Descrição
                            </th>
                            <th className="text-start small">
                                Marcador
                            </th>
                            <th className="text-start small">
                                Conta
                            </th>
                            <th className="text-start small">
                                Valor
                            </th>
                            <th>

                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {data?.dfcData?.map((elem, index) => {

                            const tagSelected = data?.tags?.find(elem1 => elem1._id === elem?.tag_id);

                            const accountSelected = data?.accounts?.find(elem1 => elem1._id === elem?.account_id);


                            return (

                                <tr key={index} className="">

                                    <td className="text-center ">
                                        <TypeIcon elem={elem} />
                                    </td>
                                    <td className="text-start " style={{ fontSize: '12px' }}>
                                        {formatDate(elem?.paymentDate)}
                                    </td>
                                    <td className={`text-start small  ${elem?.description ? 'bold' : 'text-muted'}`}>
                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                    </td>
                                    <td className="text-start">
                                        <TagSelected tag={elem.tag} tagsArray={data?.tags} />
                                    </td>
                                    <td className="text-start">
                                        {!accountSelected ?
                                            <span class=" px-2 py-1  small rounded-pill border">
                                                Sem conta
                                            </span>
                                            :
                                            <>
                                                <span
                                                    className={`cardAnimation px-2 py-1 small rounded-pill text-white `}

                                                    style={{ backgroundColor: accountSelected.color }}>
                                                    <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={20} height={20} />
                                                    {accountSelected.description}
                                                </span>
                                            </>
                                        }
                                    </td>
                                    <td className={`text-start bold text-${elem?.active === false ? 'secondary' : elem?.type === 'income' ? 'c-success' : 'c-danger'}`}>
                                        {elem?.type === 'expense' && '-'}{elem?.type === 'income' && '+'}{brlMoney.format(elem?.value)} <br />
                                        <span style={{ fontSize: '12px' }}>{elem?.active === false && 'Pendente'}</span>
                                    </td>
                                    <td>

                                        <span className=" me-2 cardAnimation" type="button" data-bs-toggle="modal" data-bs-target="#attachmentModal" onClick={() => { setIncomeSelected(elem) }}>

                                            {elem.files && (
                                                <span className="bg-success me-1" style={{ display: 'inline-block', height: '10px', width: '10px', borderRadius: '50%' }} />

                                            )}
                                            <FontAwesomeIcon icon={faPaperclip} className="text-secondary" />


                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <div className="btn-group">

                                            <span className="cardAnimation me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FontAwesomeIcon icon={faEllipsis} className="text-secondary fs-4" />
                                            </span>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li class="dropdown-item text-secondary" type='button'>
                                                    <FontAwesomeIcon icon={faEdit} className="small me-1" /> Editar
                                                </li>
                                                <li class="dropdown-item text-danger" type='button' data-bs-toggle="modal" data-bs-target="#deleteIncomeModal" onClick={() => { setIncomeSelected(elem) }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} className="small me-1" /> Excluir
                                                </li>
                                            </ul>
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