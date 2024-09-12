import { faArrowTurnUp, faDotCircle, faPlus, faTag, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import axios from "axios"
import { showModalBs } from "../../utils/modalControl"
import scrollTo from "../../utils/scrollTo"


export default function NewTagModal(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const { categorySelected, dataFunction, section, categories, id } = props

    const [newTagName, setNewTagName] = useState('')
    const [newSubTagName, setNewSubTagName] = useState('')
    const [subTags, setSubTags] = useState([])

    const [saveError, setSaveError] = useState('')

    const initialValues = () => {
        setNewTagName('')
        setNewSubTagName('')
    }

    const disabledSave = () => {
        if (newTagName) {
            return false
        } else {
            return true
        }
    }

    const handleSubTagAdd = (e) => {
        e.preventDefault()

        if (!newSubTagName) return;

        const subTagsArray = subTags
        subTagsArray.push(newSubTagName)
        setSubTags(subTagsArray)
        setNewSubTagName('')
    }

    const handleSave = async () => {

        const data = {
            user_id: token.sub,
            section: section,
            category_id: categorySelected?._id,
            newTagName,
            subTags
        }

        await axios.post(`/api/categories/tags`, data)
            .then(res => {
                console.log(res.data)
                dataFunction()
                initialValues()
            }).catch(e => {
                console.log(e)
                showModalBs(id)
                setSaveError("Houve um problema ao salvar a categoria. Por favor, tente novamente.")
                scrollTo(id)
            })

    }

    return (
        <div class="modal fade" id={id} tabindex="-1" aria-labelledby={id + 'Label'} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id={id + 'Label'}>Nova subcategoria</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {saveError && (
                            <div className="col-12 ">
                                <div className="alert alert-danger">{saveError}</div>
                            </div>
                        )}

                        <div className="row">
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faTag} />
                                <span className="small fw-bold  ms-3">Categoria</span>
                            </div>
                            <div className="col-12">
                                <div className="col-12 d-flex  align-items-center mt-2">

                                    <div style={{ backgroundColor: categorySelected?.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
                                    <span className="bold">{categorySelected?.category}</span>

                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">

                            <div className="col-12 ">
                                <FontAwesomeIcon icon={faDotCircle} />
                                <span className="small fw-bold  ms-3">Nome da subcategoria</span>
                                <div className="d-flex align-items-center mt-2">
                                    <div style={{ height: "12px", width: "12px", border: `2px solid ${categorySelected?.color}` }} className="rounded-circle ms-2 me-2"></div>
                                    <input type="text" className="form-control" id="newTagNameInput" placeholder="Nova subcategoria" onChange={(e) => setNewTagName(e.target.value)} value={newTagName} />
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)' }} />
                                <span className="small fw-bold  ms-3">Marcadores</span>
                                {subTags.map(elem => (

                                    <div className="col-12 my-1 d-flex small align-items-center mt-2">
                                        <div className="col">

                                            <FontAwesomeIcon className="me-2 ms-4" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: categorySelected?.color }} />
                                            <span>{elem}</span>
                                        </div>
                                        <div className="fadeItem" style={{ width: "25px" }}>

                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => setSubTags(subTags.filter(elem1 => elem1 !== elem))} >
                                                <FontAwesomeIcon icon={faXmark} className="text-c-danger" />
                                            </button>

                                        </div>
                                    </div>
                                ))}
                                <form onSubmit={handleSubTagAdd} className="mt-2">

                                    <div className="input-group">
                                        <input type="text" className="form-control" id="newSubTagNameInput" onChange={(e) => setNewSubTagName(e.target.value)} value={newSubTagName} placeholder="Novo marcador" />
                                        <button disabled={!newSubTagName} className="btn btn-outline-secondary" type="submit">
                                            <FontAwesomeIcon icon={faPlus} className="pulse text-c-success" />
                                        </button>
                                    </div>
                                </form>

                            </div>

                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-c-tertiary"
                            data-bs-dismiss="modal"
                            onClick={() => initialValues()}>
                            Cancelar
                        </button>
                        <button className="btn btn-c-success"
                            data-bs-dismiss="modal"
                            disabled={disabledSave()}
                            onClick={() => handleSave()}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}