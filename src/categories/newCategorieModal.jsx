import { faArrowTurnRight, faArrowTurnUp, faCheck, faCircle, faCommentAlt, faDotCircle, faPlus, faQuoteRight, faSwatchbook, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState } from "react"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import { showModalBs } from "../../utils/modalControl"
import scrollTo from "../../utils/scrollTo"


export default function NewCategorieModal(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const { dataFunction, section, categories, id } = props

    const [categoryName, setCategoryName] = useState('')
    const [newTagName, setNewTagName] = useState('')
    const [tags, setTags] = useState([])
    const [color, setColor] = useState('')
    const [editIndex, setEditIndex] = useState('')
    const [newSubTagName, setNewSubTagName] = useState('')

    const [saveError, setSaveError] = useState('')


    const handleTagAdd = (e, name) => {

        e.preventDefault()

        const data = {
            tag: name,
            subTags: []
        }

        setTags([...tags, data])

        setNewTagName('')

    }

    const handleSubTagAdd = (e, name, tagIndex) => {
        e.preventDefault();

        if (!name) return;

        const data = {
            subTag: name
        }
        // Cria uma cópia das tags atuais
        const updatedTags = [...tags];

        // Adiciona a nova subTag à tag específica
        updatedTags[tagIndex].subTags.push(data);

        // Atualiza o estado das tags com a nova subTag adicionada
        setTags(updatedTags);

        // Limpa o campo de input e reseta o índice de edição
        setNewSubTagName('');
        setEditIndex('');
    };


    const handleSubTagDelete = (tagIndex, subTagIndex) => {
        // Cria uma cópia das tags atuais
        const updatedTags = [...tags];

        // Remove a subTag específica do array de subTags
        updatedTags[tagIndex].subTags.splice(subTagIndex, 1);

        // Atualiza o estado das tags
        setTags(updatedTags);
    };

    const initialValues = () => {
        setCategoryName('')
        setNewTagName('')
        setTags([])
        setColor('')
        setEditIndex('')
        setNewSubTagName('')
    }

    const disabledSave = () => {

        if (!categoryName || !color || tags.length === 0) return true

    }

    const handleSave = async () => {

        const data = {
            user_id: token.sub,
            section,
            categoryName,
            color,
            tags
        }

        await axios.post(`/api/categories`, data)
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
                        <h5 class="modal-title" id={id + 'Label'}>Nova categoria</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                <div className="col-12">
                                    <FontAwesomeIcon icon={faQuoteRight} />
                                    <span className="small fw-bold  ms-3">Nome da categoria</span>
                                    <input type="text" className="form-control mt-2" onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12 ">
                                <FontAwesomeIcon icon={faSwatchbook} />
                                <span className="small fw-bold  ms-3">Cor da categoria</span>
                                <div className="card mt-2" id="colorSelect">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-12 d-flex flex-wrap">
                                                {section === 'incomeTags' && incomeColors.map((elem, index) => {
                                                    return (
                                                        <span type="button" onClick={() => setColor(elem)}
                                                            className={`cardAnimation d-flex justify-content-center align-items-center   m-1  small rounded-pill ${color === elem ? '  shadow' : ''} `}
                                                            style={{
                                                                backgroundColor: elem,
                                                                color: 'white',
                                                                height: '40px',
                                                                width: '40px',
                                                                scale: color === elem ? '1.3' : '1',
                                                            }}>
                                                            {color === elem && <FontAwesomeIcon icon={faCheck} className="text-white" />}
                                                        </span>
                                                    )
                                                })}
                                                {section === 'expenseTags' && expenseColors.map((elem, index) => {
                                                    return (
                                                        <span type="button" onClick={() => setColor(elem)}
                                                            className={`cardAnimation d-flex justify-content-center align-items-center   m-1  small rounded-pill ${color === elem ? '  shadow' : ''} `}
                                                            style={{
                                                                backgroundColor: elem,
                                                                color: 'white',
                                                                height: '40px',
                                                                width: '40px',
                                                                scale: color === elem ? '1.3' : '1',
                                                            }}>
                                                            {color === elem && <FontAwesomeIcon icon={faCheck} className="text-white" />}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">




                            <div className="col-12 fadeItem mb-5">
                                <FontAwesomeIcon icon={faDotCircle} />
                                <span className="small fw-bold  ms-3">Subcategorias</span>
                                <div className="card mt-2">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-12 d-flex">
                                                <div className="col d-flex my-1 align-items-center">
                                                    <div style={{ backgroundColor: color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
                                                    <span className="bold">{categoryName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            {tags?.map((elem1, index1) => (
                                                <div className="border-bottom py-2">
                                                    <div className="col-12 d-flex my-1 align-items-center">
                                                        <div style={{ height: "12px", width: "12px", border: `2px solid ${color}` }} className="rounded-circle ms-2 me-2"></div>
                                                        <div className="col">
                                                            <span className="">{elem1.tag}</span>
                                                        </div>
                                                        {editIndex === '' && (
                                                            <div className="btn-group fadeItem" style={{ width: "60px" }}>
                                                                <button type="button" disabled={editIndex} className={` btn btn-outline-secondary btn-sm ${editIndex === '' ? "text-c-success" : 'text-muted'}`} onClick={() => setEditIndex(index1)}>
                                                                    <FontAwesomeIcon icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)' }} />
                                                                </button>
                                                                <button type="button" disabled={editIndex} className={`  btn btn-outline-secondary btn-sm ${editIndex === '' ? "text-c-danger" : 'text-muted'}`} onClick={() => setTags(tags.filter((elem2, index2) => index1 !== index2))}>
                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                </button>
                                                            </div>

                                                        )}
                                                    </div>
                                                    {elem1.subTags?.map((elem2, index2) => (

                                                        <div className="col-12 my-1 d-flex small align-items-center">
                                                            <div className="col">

                                                                <FontAwesomeIcon className="me-2 ms-4" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: color }} />
                                                                <span>{elem2.subTag}</span>
                                                            </div>
                                                            <div className="fadeItem" style={{ width: "25px" }}>
                                                                {editIndex === '' && (

                                                                    <button className="btn btn-sm btn-outline-secondary">
                                                                        <FontAwesomeIcon icon={faXmark} className="text-c-danger" onClick={() => handleSubTagDelete(index1, index2)} />
                                                                    </button>
                                                                )}

                                                            </div>
                                                        </div>
                                                    ))}
                                                    {editIndex === index1 && (

                                                        <div className="col-12 d-flex fadeItem align-items-center">
                                                            <FontAwesomeIcon className="ms-3 me-2 small" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: color }} />
                                                            <form onSubmit={e => handleSubTagAdd(e, newSubTagName, editIndex)} className="w-100">

                                                                <div className="input-group ">

                                                                    <input type="text" className="form-control" onChange={(e) => setNewSubTagName(e.target.value)} value={newSubTagName} placeholder="Novo marcador" />

                                                                    <button disabled={!newSubTagName} className="btn btn-outline-secondary" type="submit" >
                                                                        <FontAwesomeIcon icon={faPlus} className="pulse text-c-success" />
                                                                    </button>
                                                                    <button className="btn btn-outline-secondary" type="submit" onClick={() => { setEditIndex(''); setNewSubTagName('') }} >
                                                                        <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                                    </button>
                                                                </div>
                                                            </form>

                                                        </div>
                                                    )}
                                                </div>

                                            ))}
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <form onSubmit={e => handleTagAdd(e, newTagName)}>

                                                    <div className="input-group">

                                                        <input type="text" disabled={editIndex !== ''} className="form-control" id="newTagNameInput" onChange={(e) => setNewTagName(e.target.value)} value={newTagName} placeholder="Nova subcategoria" />
                                                        <button disabled={!newTagName} className="btn btn-outline-secondary" type="submit" >
                                                            <FontAwesomeIcon icon={faPlus} className="pulse text-c-success" />
                                                        </button>

                                                    </div>
                                                </form>
                                                {!tags.length && (

                                                    <span className="small text-secondary fadeItem">É necessário incluir no mínimo uma subcategoria</span>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
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
        </div >
    )
}




const incomeColors = [
    "#2B8EAD", // Blueish Teal
    "#76B041", // Green Apple
    "#FFD700", // Golden Yellow
    "#FFB300", // Dark Yellow
    "#009688", // Teal
    "#3F51B5", // Indigo
    "#1E88E5", // Light Blue
    "#8BC34A", // Light Green
    "#FFC107", // Sunflower Yellow
    "#0288D1", // Strong Blue
    "#CDDC39", // Lime Green
    "#00BCD4", // Cyan
    "#4CAF50", // Leaf Green
    "#8E44AD", // Amethyst Purple
    "#FFEB3B", // Bright Yellow
    "#0097A7", // Turquoise
    "#FF9800", // Amber
    "#607D8B", // Blue Grey
    "#6A1B9A", // Dark Purple
    "#8E24AA", // Vivid Purple
];


const expenseColors = [
    "#D32F2F", // Brick Red
    "#C62828", // Crimson Red
    "#E64A19", // Rust Orange
    "#F44336", // Fire Red
    "#9C27B0", // Dark Purple
    "#7B1FA2", // Purple
    "#512DA8", // Grape
    "#455A64", // Charcoal
    "#616161", // Slate Grey
    "#795548", // Brown
    "#BF360C", // Dark Burnt Orange
    "#5D4037", // Chocolate
    "#6D4C41", // Chestnut Brown
    "#8D6E63", // Cocoa
    "#BDBDBD", // Light Grey
    "#3E2723", // Espresso
    "#1B5E20", // Dark Forest Green
    "#37474F", // Deep Blue Grey
    "#FF5722", // Burnt Orange
    "#607D8B", // Dark Blue Grey
];
