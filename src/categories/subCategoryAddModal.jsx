import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { showModalBs } from "../../utils/modalControl";
import axios from "axios";
import { ObjectId } from "bson";



export default function SubCategoryAddModal(props) {

    const { categorySelected, type, dataFunction, id, token } = props;

    const [subCategoryName, setSubCategoryName] = useState('')

    const [saveError, setSaveError] = useState('');

    const handleSave = async () => {
        const data = {
            user_id: token.sub,
            category_id: categorySelected?._id,
            type,
            _id: new ObjectId().toString(),
            name: subCategoryName
        }

        await axios.post(`/api/categories/subCategories`, data)
            .then(res => {
                dataFunction();
                setSubCategoryName('');
            }).catch(e => {
                console.log(e)
                showModalBs(id)
                setSaveError("Houve um problema ao adicionar a subcategoria. Por favor, tente novamente.")
                scrollTo(id)
            })
    }



    return (
        <div className="modal fade" id={id} tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={id + 'Label'} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={id + 'Label'}>Adicionar subcategoria em "{categorySelected?.categoryName}"</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {saveError && (
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="alert alert-danger">{saveError}</div>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faDotCircle} />
                                <span className="small fw-bold  ms-3">Nome da subcategoria</span>
                                <input type="text" className="form-control mt-2" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-c-tertiary"
                            data-bs-dismiss="modal"
                            onClick={() => setSubCategoryName('')}>
                            Cancelar
                        </button>
                        <button className="btn btn-c-success"
                            data-bs-dismiss="modal"
                            disabled={!subCategoryName}
                            onClick={() => handleSave()}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}