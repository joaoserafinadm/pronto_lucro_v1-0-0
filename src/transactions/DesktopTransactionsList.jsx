import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDate } from "../../utils/mask"
import TypeIcon from "./TypeIcon"
import { faCheck, faCheckCircle, faClipboard, faDotCircle, faEdit, faEllipsis, faFile, faPaperclip, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import TagSelected from "./tagSelected"
import ActiveButton from "./activeButton"
import { useStateContext } from "./context/transactionsContext"
import BankAccountSelected from "./bankAccountSelected"




export default function DesktopTransactionsList(props) {

    const { data, setIncomeSelected, incomeSelected, categories } = useStateContext()


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
                            <th className="text-start small">
                                Data
                            </th>
                            <th className="text-start small">
                                Descrição
                            </th>
                            <th className="text-start small">
                                Categoria
                            </th>
                            <th className="text-start small">
                                Conta
                            </th>
                            <th className="text-start small">
                                Valor
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {data?.dfcData?.map((elem, index) => {


                            const accountSelected = data?.accounts?.find(elem1 => elem1._id === elem?.account_id);


                            return (

                                <tr key={index} className="">

                                    <td className="text-start " style={{ fontSize: '12px' }}>
                                        {formatDate(elem?.paymentDate)}
                                    </td>
                                    <td className={`text-start d-flex flex-column small  ${elem?.description ? 'bold' : 'text-muted'}`}>

                                        <div className="d-flex align-items-center">
                                            <TypeIcon elem={elem} />
                                            {elem?.description ? elem?.description : 'Sem descricão'}

                                        </div>
                                        {(elem?.periodicity === 'Parcelado' || elem?.periodicity === 'Repetido') && (
                                            <div className="small d-flex">
                                                {elem?.periodicity}
                                                {elem?.periodicity === 'Parcelado' && (
                                                    <div className="ms-1">
                                                        ({elem?.periodicityConfig?.parcelaAtual} / {elem?.periodicityConfig?.qtd})

                                                    </div>
                                                )}
                                                {elem?.periodicity === 'Repetido' && (
                                                    <div className="ms-1 ">
                                                        ({elem?.periodicityConfig?.parcelaAtual}ª)
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-start">
                                        <TagSelected subCategory_id={elem.subCategory_id} categories={categories} />
                                    </td>
                                    <td className="text-start">
                                        <div className="d-flex">

                                            <BankAccountSelected accountSelected={accountSelected} />
                                        </div>

                                    </td>
                                    <td className={`text-end bold text-${elem?.active === false ? 'secondary' : elem?.type === 'income' ? 'c-success' : 'c-danger'}`}>
                                        {elem?.type === 'expense' && '-'}{elem?.type === 'income' && '+'}{brlMoney.format(elem?.value)} <br />

                                        {/*{elem?.active === false && 'Pendente' && (

                                            <div className="d-flex text-secondary">
                                                <span style={{ fontSize: '12px' }}>Pendente</span>

                                                 <ActiveButton incomeSelected={incomeSelected} setIncomeSelected={setIncomeSelected} elem={elem} /> 
                                            </div>
                                        )}*/}

                                        {/* {elem?.creditConfig?.parcelaAtual && (
                                            <div className="text-end me-2" style={{ fontSize: '10px' }}>
                                                {elem?.creditConfig?.parcelaAtual} / {elem?.creditConfig?.parcelas}
                                            </div>
                                        )} */}
                                    </td>
                                    <td className="text-end">
                                        <div className="btn-group d-flex align-items-center justify-content-end">
                                            {elem?.active === false && (
                                                <div className="mx-2">

                                                    <ActiveButton incomeSelected={incomeSelected} setIncomeSelected={setIncomeSelected} elem={elem} />
                                                </div>
                                            )}
                                            <span className=" mx-2 cardAnimation" type="button" data-bs-toggle="modal" data-bs-target="#attachmentModal" onClick={() => { setIncomeSelected(elem) }}>
                                                {elem.files && (
                                                    <span className="bg-success me-1" style={{ display: 'inline-block', height: '10px', width: '10px', borderRadius: '50%' }} />
                                                )}
                                                <FontAwesomeIcon icon={faPaperclip} className="text-secondary" />
                                            </span>


                                            <span className="cardAnimation mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FontAwesomeIcon icon={faEllipsis} className="text-secondary fs-4" />
                                            </span>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li class="dropdown-item text-secondary" type='button' data-bs-toggle="modal" data-bs-target={elem.type === 'expense' ? "#editExpenseModal" : "#editIncomeModal"} onClick={() => { setIncomeSelected(elem) }}>
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