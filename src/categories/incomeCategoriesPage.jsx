import { useEffect, useState } from "react"
import { SpinnerLG } from "../components/loading/Spinners"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faGripLines, faPlus, faShuffle } from "@fortawesome/free-solid-svg-icons"
import CategoryAddModal from "./categoryAddModal"
import tippy from "tippy.js"
import CategoriesOrderModal from "./categoriesOrderModal"
import CategoryIcon, { SubCategoryIcon } from "./categoryIcon"
import EditCategoryModal from "../categories/editCategoryModal"
import SubCategoryAddModal from "./subCategoryAddModal"




export default function IncomeCategoriesPage(props) {

    const { token } = props


    const [incomeCategories, setIncomeCategories] = useState([])

    const [categorySelected, setCategorySelected] = useState(null)

    const [forceUpdate, setForceUpdate] = useState(0)


    const [loadingPage, setLoadingPage] = useState(true)


    useEffect(() => {
        dataFunction(token.sub)
    }, [])

    const tippyFunction = () => {
        setTimeout(() => {
            tippy('#incomeAddCategoryBtn', {
                content: 'Adicionar categoria',
                placement: 'bottom'
            })
            tippy('#incomeReorderCategoryBtn', {
                content: 'Ordenar categoria',
                placement: 'bottom'
            })

        }, 700)

    }




    const dataFunction = async (user_id) => {

        await axios.get('/api/categories', {
            params: { user_id, type: 'income' }
        }).then(res => {
            setIncomeCategories(res.data.categories)
            setLoadingPage(false)
            tippyFunction()
            setForceUpdate(forceUpdate + 1)
        }).catch(e => {
            console.log(e)
            // setLoadingPage(false)
        })


    }


    return (
        <>

            <CategoryAddModal id='incomeCategoryAddModal' type='incomeCategories' token={token} dataFunction={() => dataFunction(token.sub)} />
            <CategoriesOrderModal id="incomeCategoriesOrderModal" categories={incomeCategories} token={token} type='incomeCategories' dataFunction={() => dataFunction(token.sub)} />
            <EditCategoryModal categorySelected={categorySelected} categories={incomeCategories} type='incomeCategories' token={token} dataFunction={() => dataFunction(token.sub)} id={`editIncomeCategoryModal`} />
            <SubCategoryAddModal categorySelected={categorySelected} categories={incomeCategories} type='incomeCategories' token={token} dataFunction={() => dataFunction(token.sub)} id={`incomeSubCategoryAddModal`} />

            {loadingPage ?
                <SpinnerLG />
                :
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-c-outline-secondary  mx-1"
                            id="incomeReorderCategoryBtn"
                            data-bs-toggle="modal" data-bs-target="#incomeCategoriesOrderModal">
                            <FontAwesomeIcon icon={faShuffle} />
                        </button>
                        <button className="btn btn-c-outline-success  mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#incomeCategoryAddModal"
                            id="incomeAddCategoryBtn">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    {incomeCategories.length === 0 ?
                        <div className="col-12 d-flex justify-content-center my-5">
                            <span className="small">Nenhuma categoria encontrada</span>
                        </div>
                        :
                        <>
                            {incomeCategories.map((elem, index) => (
                                <div className="col-12 fadeItem">
                                    <div className="card my-3 bg-white p-3" id={elem.id}>
                                        <div className="row d-flex">
                                            <div className="col-12 d-flex justify-content-between">

                                                <div className="d-flex align-items-center">
                                                    <CategoryIcon color={elem.color} />
                                                    <span className="bold mx-2">{elem.categoryName}</span>

                                                </div>

                                                <div style={{ width: '40px' }}>

                                                    <span className="optionsButton  text-c-secondary" data-bs-toggle="modal" data-bs-target={`#editIncomeCategoryModal`} onClick={() => setCategorySelected(elem)} >
                                                        <FontAwesomeIcon icon={faGear} />
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="row">

                                            {elem.subCategories.map((elem1, index) => (
                                                <div className="col-12 d-flex  align-items-center my-2">
                                                    <SubCategoryIcon color={elem.color} />
                                                    <span className="fw-bold" style={{ color: elem.color }}>{elem1.name}</span>
                                                </div>

                                            ))}
                                        </div>
                                        <hr />
                                        <div className="col-12 d-flex my-1 align-items-center mt-2">
                                            <span type="button" className="px-2 small bold cardAnimation" onClick={() => setCategorySelected(elem)}
                                                data-bs-toggle="modal" data-bs-target={`#incomeSubCategoryAddModal`}
                                                style={{ border: `2px solid ${elem.color}`, borderRadius: '20px', color: elem.color }}>
                                                + subcategoria
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </>
                    }
                </div>

            }

        </>
    )


}