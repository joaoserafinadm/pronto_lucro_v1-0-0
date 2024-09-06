import { faArrowTurnUp, faCheck, faEdit, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import axios from "axios"
import { showModalBs } from "../../utils/modalControl"
import scrollTo from "../../utils/scrollTo"



export default function EditCategoryModal(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const { categorySelected, categories, section, dataFunction, id } = props

    const [categoryEdit, setCategoryEdit] = useState(categorySelected)
    const [editTagIndex, setEditTagIndex] = useState('')
    const [editSubTagIndex, setEditSubTagIndex] = useState({ tagIndex: '', subTagIndex: '' });

    const [editTagName, setEditTagName] = useState('')
    const [editSubTagName, setEditSubTagName] = useState('')
    const [saveError, setSaveError] = useState('')

    useEffect(() => {
        setCategoryEdit(categorySelected)
    }, [categorySelected])

    const initialValues = () => {

        setEditTagIndex('')
        setEditTagName('')
        setEditSubTagIndex({ tagIndex: '', subTagIndex: '' })
        setEditSubTagName('')
    }


    const handleTagNameChange = (elem, index, newTagName) => {
        // Cria uma cópia de categoryEdit
        let updatedCategory = { ...categoryEdit };

        // Atualiza o nome da tag específica no array de tags
        updatedCategory.tags[index].tag = newTagName;

        // Atualiza o estado com a nova categoria editada
        setCategoryEdit(updatedCategory);

        // Limpa os campos de edição
        setEditTagIndex('');
        setEditTagName('');

    };


    const handleSubTagNameChange = (elem1, tagIndex, subTagIndex, newSubTagName) => {
        // Cria uma cópia de categoryEdit
        let updatedCategory = { ...categoryEdit };

        // Atualiza o nome da subTag específica no array de subTags
        updatedCategory.tags[tagIndex].subTags[subTagIndex].subTag = newSubTagName;

        // Atualiza o estado com a nova categoria editada
        setCategoryEdit(updatedCategory);

        // Limpa os campos de edição
        setEditSubTagIndex('');
        setEditSubTagName('');


    };

    const handleSave = async () => {

        const data = {
            user_id: token.sub,
            section: section,
            category: categoryEdit
        }

        await axios.patch(`/api/categories/categoryEdit`, data)
            .then(res => {
                dataFunction()
            }).catch(e => {
                showModalBs(id)
                setSaveError("Houve um problema ao editar a categoria. Por favor, tente novamente.")
                scrollTo(id)

            })


    }

    return (
        <div class="modal fade" id={id} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={id + 'Label'} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id={id + 'Label'}>Configurar categoria</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {saveError && (
                                <div className="col-12 ">
                                    <div className="alert alert-danger">{saveError}</div>
                                </div>
                            )}
                            <div className="col-12">

                                <div className="row">
                                    <div className="col-12 d-flex my-1 align-items-center">
                                        <div style={{ backgroundColor: categoryEdit?.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
                                        <span className="bold">{categoryEdit?.category}</span>

                                    </div>
                                </div>
                                <hr />
                                {categoryEdit?.tags?.map((elem1, index1) => (
                                    <div >
                                        <div className="row ">
                                            {editTagIndex === index1 ?
                                                <div className="col-12 d-flex  align-items-center">
                                                    <div style={{ height: "12px", width: "12px", border: `2px solid ${categoryEdit?.color}` }} className="rounded-circle ms-2 me-2"></div>
                                                    <div className="input-group">

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={editTagName}
                                                            onChange={(e) => setEditTagName(e.target.value)} />
                                                        <button disabled={!editTagName} className="btn btn-outline-secondary" onClick={() => handleTagNameChange(elem1, index1, editTagName)} >
                                                            <FontAwesomeIcon icon={faCheck} className="pulse text-c-success" />
                                                        </button>
                                                        <button className="btn btn-outline-secondary" onClick={() => { setEditTagIndex(''); setEditTagName('') }} >
                                                            <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                        </button>
                                                    </div>
                                                </div>
                                                :

                                                <div className="col-12 d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div style={{ height: "12px", width: "12px", border: `2px solid ${categoryEdit?.color}` }} className="rounded-circle ms-2 me-2"></div>
                                                        <span className="fw-bold fadeItem" style={{ color: categoryEdit?.color }}>{elem1.tag}</span>
                                                    </div>
                                                    <span className="ms-2 text-c-secondary" type="button" onClick={() => { setEditTagIndex(index1); setEditSubTagIndex({ tagIndex: '', subTagIndex: '' }); setEditTagName(elem1.tag) }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </span>
                                                </div>
                                            }

                                        </div>
                                        <hr />
                                        {elem1.subTags?.map((elem2, index2) => (
                                            <div key={index2}>
                                                <div className="row">
                                                    {(editSubTagIndex.tagIndex === index1 && editSubTagIndex.subTagIndex === index2) ?
                                                        <div className="col-12 d-flex align-items-center">
                                                            <FontAwesomeIcon
                                                                className="me-2 ms-4"
                                                                icon={faArrowTurnUp}
                                                                style={{ transform: 'rotate(90deg)', color: categoryEdit?.color }}
                                                            />
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={editSubTagName}
                                                                    onChange={(e) => setEditSubTagName(e.target.value)}
                                                                />
                                                                <button
                                                                    disabled={!editSubTagName}
                                                                    className="btn btn-outline-secondary"
                                                                    onClick={() => handleSubTagNameChange(elem1, index1, index2, editSubTagName)}
                                                                >
                                                                    <FontAwesomeIcon icon={faCheck} className="pulse text-c-success" />
                                                                </button>
                                                                <button
                                                                    className="btn btn-outline-secondary"
                                                                    onClick={() => { setEditSubTagIndex({ tagIndex: '', subTagIndex: '' }); setEditSubTagName('') }}
                                                                >
                                                                    <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-12 d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center small fadeItem">
                                                                <FontAwesomeIcon
                                                                    className="me-2 ms-4"
                                                                    icon={faArrowTurnUp}
                                                                    style={{ transform: 'rotate(90deg)', color: categoryEdit?.color }}
                                                                />
                                                                <span className="bold fadeItem" style={{ color: categoryEdit?.color }}>{elem2.subTag}</span>
                                                            </div>
                                                            <span
                                                                className="ms-2 text-c-secondary"
                                                                type="button"
                                                                onClick={() => { setEditSubTagIndex({ tagIndex: index1, subTagIndex: index2 }); setEditTagIndex(''); setEditSubTagName(elem2.subTag) }}
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                                <hr />
                                            </div>
                                        ))}

                                    </div>
                                ))}

                            </div>
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-sm btn-c-tertiary" data-bs-dismiss="modal" onClick={() => initialValues()}>Fechar</button>
                        <button className="btn btn-sm btn-c-success" data-bs-dismiss="modal" onClick={() => handleSave()}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}