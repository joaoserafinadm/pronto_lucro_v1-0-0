import { faChevronLeft, faEquals, faInfo, faTags, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "./context/resultsContext";
import CategoryIcon from "../categories/categoryIcon";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import { showModalBs } from "../../utils/modalControl";
import { SpinnerSM } from "../components/loading/Spinners";
import scrollCarouselTo from "../../utils/scrollCarouselTo";


export default function PlanoDeContasConfigEdit(props) {

    const token = jwt.decode(Cookie.get("auth"));

    const { dataFunction, planoDeContasEdit, setPlanoDeContasEdit } = props

    const [resultName, setResultName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [nameError, setNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [saveError, setSaveError] = useState('');

    const [loadingSave, setLoadingSave] = useState(false);

    const {
        incomeCategories,
        expenseCategories,
        planoDeContasConfig
    } = useStateContext();

    useEffect(() => {

        if (planoDeContasEdit === null) return

        setResultName(planoDeContasEdit.resultName)
        setSelectedCategories(planoDeContasEdit.selectedCategories || [])
        // setPlanoDeContasEdit(null)

    }, [planoDeContasEdit])








    const handleSelectCategory = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(elem => elem !== id))
        } else {
            setSelectedCategories([...selectedCategories, id])
        }
    }



    const validate = () => {

        setSaveError('')
        setNameError('')
        setCategoryError('')

        let nameError = '';
        let categoryError = '';

        if (resultName === '') nameError = 'Insira o nome do resultado'
        if (selectedCategories.length === 0) categoryError = 'Selecione pelo menos uma categoria'

        if (nameError || categoryError) {
            if (nameError) { document.getElementById('resultNameInput').classList.add('inputError'); setNameError(nameError) }
            if (categoryError) setCategoryError(categoryError)
            return false
        } else {
            setNameError('')
            setCategoryError('')
            return true
        }


    }


    const handleSave = async () => {

        setLoadingSave(true)

        const isValid = validate()

        if (isValid) {

            const data = {
                user_id: token.sub,
                id: planoDeContasEdit._id,
                name: resultName,
                categories: selectedCategories
            }

            await axios.patch(`/api/results/planoDeContas`, data)
                .then(res => {
                    dataFunction()
                    scrollCarouselTo("planoDeContasConfigCarousel", 0)
                    setPlanoDeContasEdit(null)
                    setResultName('')
                    setSelectedCategories([])
                    setNameError('')
                    setCategoryError('')
                    setSaveError('')
                }).catch(e => {
                    setSaveError("Houve um problema ao salvar o resultado. Por favor, tente novamente.")
                    console.log(e)
                })

        }

        setLoadingSave(false)
    }



    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between fadeItem2s mt-0">
                <span className="cardAnimation  " type="button" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={0}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
            </div>
            <div className="col-12 my-3">

                <FontAwesomeIcon icon={faEquals} />
                <span className="small fw-bold mb-2 ms-3">Novo resultado</span>
                <input type="text" className="form-control" placeholder="Nome" id='resultNameInput' value={resultName} onChange={(e) => setResultName(e.target.value)} />
                <small className="text-danger">{nameError}</small>
            </div>

            <hr />
            <div className="col-12 my-2">

                <FontAwesomeIcon icon={faTags} />
                <span className="small fw-bold mb-3 ms-3">Adicionar categorias</span><br />
                <small className="text-danger">{categoryError}</small>
            </div>

            <div className="col-12 mb-2 ">

                {incomeCategories
                    .filter(elem =>
                        // Mantém apenas categorias que NÃO foram usadas em outras configurações OU que estão selecionadas atualmente
                        !planoDeContasConfig.some(result => result.selectedCategories.includes(elem._id)) ||
                        planoDeContasEdit?.selectedCategories.includes(elem._id)
                    )
                    .map((elem, index) => (
                        <div className="form-check form-switch d-flex align-items-center my-2" type="button" key={'income' + index}>
                            <input className="form-check-input me-1" type="checkbox" role="switch"
                                id={'income' + index}
                                onChange={() => handleSelectCategory(elem._id)}
                                checked={selectedCategories.includes(elem._id)}
                            />
                            <label className="form-check-label d-flex align-items-center" htmlFor={'income' + index} type="button">
                                <span className="bold me-2 text-c-success">(+)</span>
                                <div className="d-flex align-items-center">
                                    <CategoryIcon color={elem.color} />
                                    <span className="bold text-muted ms-1">{elem.categoryName}</span>
                                </div>
                            </label>
                        </div>
                    ))
                }

                {expenseCategories
                    .filter(elem =>
                        // Mantém apenas categorias que NÃO foram usadas em outras configurações OU que estão selecionadas atualmente
                        !planoDeContasConfig.some(result => result.selectedCategories.includes(elem._id)) ||
                        planoDeContasEdit?.selectedCategories.includes(elem._id)
                    )
                    .map((elem, index) => (
                        <div className="form-check form-switch d-flex align-items-center my-2" type="button" key={'expense' + index}>
                            <input className="form-check-input me-1" type="checkbox" role="switch"
                                id={'expense' + index}
                                onChange={() => handleSelectCategory(elem._id)}
                                checked={selectedCategories.includes(elem._id)}
                            />
                            <label className="form-check-label d-flex align-items-center" htmlFor={'expense' + index} type="button">
                                <span className="bold me-2 text-c-danger">(-)</span>
                                <div className="d-flex align-items-center">
                                    <CategoryIcon color={elem.color} />
                                    <span className="bold text-muted ms-1">{elem.categoryName}</span>
                                </div>
                            </label>
                        </div>
                    ))
                }


            </div>

            <hr />

            {saveError && (
                <div className="col-12 my-2">
                    <div className="alert alert-danger">

                        <FontAwesomeIcon icon={faWarning} className="me-2" />
                        <small >{saveError}</small>
                    </div>
                </div>
            )}

            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-sm btn-c-outline-tertiary me-2" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={0}>
                    Cancelar
                </button>
                <button className="btn btn-sm btn-c-outline-success" onClick={handleSave} disabled={loadingSave}>
                    {loadingSave ? <SpinnerSM className="mx-2" /> : " Salvar"}
                </button>

            </div>


        </div >
    )


}