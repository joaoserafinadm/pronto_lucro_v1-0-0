import { useEffect, useState } from "react";
import { hideModal } from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import scrollTo from "../../utils/scrollTo";
import { SpinnerSM } from "../components/loading/Spinners";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import baseUrl from "../../utils/baseUrl";


export default function NewTagAdd(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const { setSection, tags, setTagSelected, dataFunction } = props

    const [category_id, setCategory_id] = useState('')
    const [newCategoryName, setNewCategoryName] = useState('')
    const [tagName, setTagName] = useState('')
    const [color, setColor] = useState('')
    const [textColor, setTextColor] = useState('white')

    const [newCategory, setNewCategory] = useState('')

    const [typesArray, setTypesArray] = useState([])

    const [loadingSave, setLoadingSave] = useState(false)




    useEffect(() => {
        setTypesArray(handleTagArray(tags))
    }, [tags.length])

    useEffect(() => setNewCategoryName(''), [category_id])

    const handleSave = async () => {

        const isValid = validate()

        if (isValid) {
            setLoadingSave(true)


            const data = {
                user_id: token.sub,
                section: props.transactionSection,
                category_id: category_id,
                categoryName: category_id === 'new' ? newCategoryName : handleCategoryName(category_id),
                newTag: {
                    tag: tagName,
                    color,
                    textColor: 'white',
                    icon: '',
                }
            }

            await axios.post(`${baseUrl()}/api/incomeAdd/newTagAdd`, data)
                .then(res => {
                    console.log(res.data)
                    setSection('')
                    hideModal(props.id)
                    setTagSelected(res.data)
                    setLoadingSave(false)
                    dataFunction()
                })
                .catch(e => {
                    console.log(e)
                    setLoadingSave(false)

                })
        }


    }


    const validate = () => {

        let categoryError = ''
        let newCategoryError = ''
        let tagNameError = ''
        let colorError = ''
        let textColorError = ''

        if (category_id === '') categoryError = 'Selecione uma categoria'
        if (category_id === 'new' && newCategoryName === '') newCategoryError = 'Insira o nome da categoria'
        if (tagName === '') tagNameError = 'Insira o nome do marcador'
        if (color === '') colorError = 'Selecione uma cor'

        if (categoryError || newCategoryError || tagNameError || colorError || textColorError) {
            if (categoryError) document.getElementById('typeSelect').classList.add('inputError')
            if (newCategoryError) document.getElementById('tagDescription').classList.add('inputError')
            if (tagNameError) document.getElementById('tagInput').classList.add('inputError')
            if (colorError) document.getElementById('colorSelect').classList.add('inputError')
            if (textColorError) document.getElementById('textColorSelect').classList.add('inputError')
            scrollTo('pageTop')
            return false

        } else {
            return true
        }

    }


    const handleCategoryName = (id) => {
        return tags?.find(elem => elem._id === id)?.category
    }



    return (
        <>
            <div className="modal-body" id="pageTop">
                <div className="row fadeItem">
                    <div className="col-12">
                        <label htmlFor="typeSelect" className="form-label">Categoria </label>
                        <select name="typeSelect" className="form-select" id="typeSelect"
                            value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                            <option value="" disabled>Selecione...</option>
                            {tags.map((elem, index) => {
                                return <option value={elem._id} >{elem.category}</option>
                            })}
                            <option value="new">Nova categoria</option>
                        </select>
                        {category_id === 'new' && (
                            <input type="text" id="tagDescription" placeholder="Categoria do marcador"
                                className="form-control mt-2 fadeItem" aria-describedby="tagDescription"
                                value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                        )}

                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="tagInput" className="form-label">Nome do marcador</label>

                        <input type="text" id="tagInput"
                            className="form-control" aria-describedby="tagDescription"
                            value={tagName} onChange={(e) => setTagName(e.target.value)} />
                        <span className="small text-secondary">Máx. 15 caracteres</span>
                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="" className="form-label">Cor </label>
                        <div className="card" id="colorSelect">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-12 d-flex flex-wrap">
                                        {coresAtrativas.map((elem, index) => {
                                            return (
                                                <span category="button" onClick={() => setColor(elem)}
                                                    className={`cardAnimation d-flex justify-content-center align-items-center   m-2  small rounded-pill ${color === elem ? '  shadow' : ''} `}
                                                    style={{
                                                        backgroundColor: elem,
                                                        color: 'white',
                                                        height: '40px',
                                                        width: '40px',
                                                        scale: color === elem ? '1.5' : '1',
                                                        border: color === elem ? '2px solid #4d88bb' : 'none'
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
                    <div className="col-12  mt-3">
                        <label htmlFor="textColorSelect" className="form-label">Cor da letra </label>
                        <select name="textColorSelect" className="form-select" id="textColorSelect"
                            value={textColor} onChange={(e) => setTextColor(e.target.value)}>
                            <option value="white" selected>Branco</option>
                            <option value="black">Preto</option>
                        </select>
                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="textColorSelect" className="form-label">Visualizar Marcador</label>
                        <div className="card">
                            <div className="card-body">
                                <div className="row text-center">
                                    <span className="bold">{category_id !== 'new' ? handleCategoryName(category_id) : newCategoryName}</span>
                                    <div className="col-12 d-flex justify-content-center my-3">

                                        <span className={`cardAnimation px-2 py-1 fw-bold  m-2  small rounded-pill  `}
                                            style={{ backgroundColor: color, color: textColor, scale: '1.2' }}>
                                            {tagName}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">

                <button
                    category="button"
                    className="btn btn-outline-custom-tertiary"
                    onClick={() => { setSection('') }}
                >
                    Voltar
                </button>
                <button
                    category="button" disabled={loadingSave}
                    className="btn btn-outline-custom-success"
                    onClick={() => handleSave()}
                >
                    {loadingSave ? <SpinnerSM className="mx-4" /> : 'Salvar marcador'}

                </button>
            </div>
        </>
    )
}

const handleTagArray = (tagsArray) => {

    let types = []

    tagsArray.map(elem => {
        if (!types.includes(elem.category)) {
            types.push(elem.category)
        }
    })

    return types


}


const coresAtrativas = [
    '#FF5733', // Red Orange
    '#33FF57', // Green Lime
    '#3357FF', // Blue Royal
    '#FF33A1', // Pink Hot
    '#33FFF0', // Aqua
    '#FFBD33', // Amber
    '#C70039', // Red Crayola
    '#900C3F', // Burgundy
    '#581845', // Plum
    '#FFC300', // Yellow
    '#DAF7A6', // Light Green
    '#FFC0CB', // Pink
    '#40E0D0', // Turquoise
    '#FF6347', // Tomato
    '#4682B4', // Steel Blue
    '#7B68EE', // Medium Slate Blue
    '#FF4500', // Orange Red
    '#2E8B57', // Sea Green
    '#FF1493', // Deep Pink
    '#00CED1'  // Dark Turquoise
]