import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CategoryIcon from "../categories/categoryIcon"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import axios from "axios"
import scrollCarouselTo from "../../utils/scrollCarouselTo"
import { SpinnerSM } from "../components/loading/Spinners"


export default function SubCategoryAdd(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const { newCategorySelected, setNewCategorySelected, setSubCategorySelected, dataFunction, section } = props

    const [newSubCategory, setNewSubCategory] = useState('')
    const [errorSave, setSaveError] = useState('')

    const [loadingSave, setLoadingSave] = useState(false)

    const handleSave = async () => {

        setLoadingSave(true)

        const data = {
            user_id: token.sub,
            category_id: newCategorySelected?._id,
            subCategoryName: newSubCategory
        }

        await axios.post(`/api/incomeAdd/newSubCategoryAdd`, data)
            .then(res => {
                dataFunction(token.sub)
                setSubCategorySelected({ name: newSubCategory, color: newCategorySelected.color, category_id: newCategorySelected._id, tag_id: res.data.id })
                setLoadingSave(false)
                scrollCarouselTo('categorySelectPages' + section, 0)
                setNewCategorySelected(null)
                setNewSubCategory('')
            }).catch(e => {
                console.log(e)
                setLoadingSave(false)
                setSaveError("Houve um problema ao salvar. Por favor, tente novamente.")
            })





    }


    return (
        <div className="row">
            <div className="col-12">
                <span className="text-secondary" type="button"
                    data-bs-target={`${'#categorySelectPages' + section}`} data-bs-slide-to={0} >
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Voltar
                </span>
            </div>

            <div className="col-12 mt-3">
                <span>
                    Adicionar nova subcategoria em:
                </span>
            </div>
            <div className="col-12 mt-3">
                <div className="d-flex align-items-center ">
                    <CategoryIcon color={newCategorySelected?.color} />
                    <span className="bold">{newCategorySelected?.categoryName}</span>
                </div>
            </div>
            <div className="col-12 mt-3 mb-3">
                <label htmlFor="newSubCategoryInput">Nova subcategoria</label>
                <input type="text" className="form-control" id="newSubCategoryInput" value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} />
                <span className="small text-danger">
                    fdsfdsa
                </span>
            </div>
            <hr />
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-c-tertiary"
                    data-bs-dismiss="modal" data-bs-target={`${'#categorySelectPages' + section}`} data-bs-slide-to={0}
                    onClick={() => setNewCategorySelected(null)}>
                    Cancelar
                </button>
                <button className="btn btn-c-success ms-2"
                    disabled={!newSubCategory}
                    onClick={() => handleSave()}>
                    {loadingSave ?
                        <SpinnerSM className="mx-3" />
                        : 'Salvar'}
                </button>
            </div>
        </div>

    )
}