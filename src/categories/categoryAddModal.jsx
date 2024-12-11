import { faCheck, faDotCircle, faPlus, faQuoteRight, faSwatchbook, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState } from "react"
import { showModalBs } from "../../utils/modalControl"




export default function CategoryAddModal(props) {

    const { id, type, token, dataFunction } = props

    const [categoryName, setCategoryName] = useState('')
    const [color, setColor] = useState('')
    const [newSubCategoryName, setNewSubCategoryName] = useState('')
    const [subCategories, setSubCategories] = useState([])

    const [editIndex, setEditIndex] = useState('')
    const [forceUpdate, setForceUpdate] = useState(0)

    const [saveError, setSaveError] = useState('')


    const handleTagAdd = (e, name) => {

        e.preventDefault()

        const data = {
            name: name,
            active: true
        }

        setSubCategories([...subCategories, data])

        setNewSubCategoryName('')

    }

    const initialValues = () => {
        setCategoryName('')
        setColor('')
        setNewSubCategoryName('')
        setSubCategories([])
        setSaveError('')
    }

    const disabledSave = () => {

        if (!categoryName || !color || subCategories.length === 0) return true
        else return false

    }

    const handleSubCategoryDelete = (index) => {

        const array = subCategories

        array.splice(index, 1)

        setSubCategories(array)
        setForceUpdate(forceUpdate + 1)

    };

    const handleSave = async () => {

        const data = {
            user_id: token.sub,
            type: type,
            categoryName,
            color,
            subCategories
        }

        await axios.post(`/api/categories`, data)
            .then(res => {
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
                                                {type === 'incomeCategories' && incomeColors.map((elem, index) => {
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
                                                {type === 'expenseCategories' && expenseColors.map((elem, index) => {
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

                                {subCategories.map((elem, index) => (
                                    <div className="border-bottom py-2 fadeItem">
                                        <div className="col-12 d-flex my-1 align-items-center">
                                            <div style={{ height: "12px", width: "12px", border: `2px solid ${color}` }} className="rounded-circle ms-2 me-2"></div>
                                            <div className="col">
                                                <span className="">{elem.name}</span>
                                            </div>
                                            <div style={{ width: "15px" }} className="d-flex justify-content-end align-items-center  ms-1">
                                                <span type="button" onClick={() => handleSubCategoryDelete(index)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} className=" text-c-danger" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="row mt-3 mb-5">
                                    <div className="col-12">
                                        <form onSubmit={e => handleTagAdd(e, newSubCategoryName)}>

                                            <div className="input-group">

                                                <input type="text" disabled={editIndex !== ''} className="form-control" id="newSubCategoryNameInput" onChange={(e) => setNewSubCategoryName(e.target.value)} value={newSubCategoryName} placeholder="Nova subcategoria" />
                                                <button disabled={!newSubCategoryName} className="btn btn-outline-secondary" type="submit" >
                                                    <FontAwesomeIcon icon={faPlus} className="pulse text-c-success" />
                                                </button>

                                            </div>
                                        </form>

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
        </div>
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