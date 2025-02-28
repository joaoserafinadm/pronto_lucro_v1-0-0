import { faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import axios from "axios";
import { newData } from "../../store/NewData/NewData.action";
import { showModalBs } from "../../utils/modalControl";
import { useState } from "react";
import { useStateContext } from "./context/transactionsContext";



export default function DeleteIncomeModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()


    const { incomeSelected } = useStateContext()

    const [deleteError, setDeleteError] = useState('')

    const handleDelete = async () => {


        setDeleteError('')
        const data = {
            user_id: token.sub,
            income_id: incomeSelected?._id
        }

        await axios.delete(`/api/transactions/incomeEdit`, {
            params: data
        })
            .then(res => {
                dispatch(newData(true))
            }).catch(e => {
                showModalBs("deleteIncomeModal")
                setDeleteError('Não foi possível excluir esta transação, tente novamente mais tarde')
            });

    }



    return (
        <div class="modal fade" id="deleteIncomeModal" tabindex="-1" aria-labelledby="deleteIncomeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteIncomeModalLabel">Deletar transação</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {deleteError && (

                            <div className="row fadeItem">
                                <div className="col-12">
                                    <div className="alert alert-danger">
                                        <span>
                                            {deleteError}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="row  text-center">
                            <span>
                                Tem certeza que deseja excluir esta transação?
                            </span>
                            <span className="small text-danger">
                                <FontAwesomeIcon icon={faWarning} /> Os dados não podão ser recuperados
                            </span>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button className="btn btn-sm btn-outline-danger" data-bs-dismiss="modal" onClick={handleDelete}>
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}