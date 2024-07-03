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


    const { setSection, tags, setTagSelected , dataFunction} = props

    const [category, setCategory] = useState('')
    const [tagName, setTagName] = useState('')
    const [color, setColor] = useState('')
    const [textColor, setTextColor] = useState('white')

    const [newCategory, setNewCategory] = useState('')

    const [typesArray, setTypesArray] = useState([])

    const [loadingSave, setLoadingSave] = useState(false)




    useEffect(() => {
        setTypesArray(handleTagArray(tags))
    }, [tags.length])

    useEffect(() => setNewCategory(''), [category])

    const handleSave = async () => {

        const isValid = validate()

        if (isValid) {
            setLoadingSave(true)


            const data = {
                user_id: token.sub,
                newTag: {
                    category: category === 'new' ? newCategory : category,
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
                    hideModal('tagSelectModal')
                    setTagSelected(res.data)
                    setLoadingSave(true)
                    dataFunction()
                })
                .catch(e => {
                    console.log(e)
                    setLoadingSave(true)

                })
        }


    }


    const validate = () => {

        let categoryError = ''
        let newCategoryError = ''
        let tagNameError = ''
        let colorError = ''
        let textColorError = ''

        if (category === '') categoryError = 'Selecione uma categoria'
        if (category === 'new' && newCategory === '') newCategoryError = 'Insira o nome da categoria'
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





    return (
        <>
            <div className="modal-body" id="pageTop">
                <div className="row fadeItem">
                    <div className="col-12">
                        <label htmlFor="typeSelect" className="form-label">Categoria </label>
                        <select name="typeSelect" className="form-select" id="typeSelect"
                            value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled>Selecione...</option>
                            {typesArray.map((elem, index) => {
                                return <option value={elem} >{elem}</option>
                            })}
                            <option value="new">Nova categoria</option>
                        </select>
                        {category === 'new' && (
                            <input type="text" id="tagDescription" placeholder="Categoria do marcador"
                                className="form-control mt-2 fadeItem" aria-describedby="tagDescription"
                                value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
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
                                <div className="row">
                                    <span className="bold">{category !== 'new' ? category : newCategory}</span>
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
                    {loadingSave ? <SpinnerSM className="mx-4"/>: 'Salvar marcador'}
                    
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