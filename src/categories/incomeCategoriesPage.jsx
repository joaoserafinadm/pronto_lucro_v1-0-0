import { useEffect, useState } from "react"
import { SpinnerLG } from "../components/loading/Spinners"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faShuffle } from "@fortawesome/free-solid-svg-icons"
import CategoryAddModal from "./categoryAddModal"
import tippy from "tippy.js"




export default function IncomeCategoriesPage(props) {

    const { token } = props


    const [incomeCategories, setIncomeCategories] = useState([])


    const [loadingPage, setLoadingPage] = useState(true)


    useEffect(() => {
        dataFunction(token.sub)
    }, [])

    const tippyFunction = () => {
        tippy('#addCategoryBtn', {
            content: 'Adicionar categoria',
            placement: 'bottom'
        })
        tippy('#reorderCategoryBtn', {
            content: 'Ordenar categoria',
            placement: 'bottom'
        })

    }




    const dataFunction = async (user_id) => {

        await axios.get('/api/categories', {
            params: { user_id, type: 'income' }
        }).then(res => {
            setIncomeCategories(res.data.categories)
            setLoadingPage(false)
            tippyFunction()
        }).catch(e => {
            console.log(e)
            // setLoadingPage(false)
        })


    }


    return (
        <>

            <CategoryAddModal id='incomeCategoryAddModal' type='income' />


            {loadingPage ?
                <SpinnerLG />
                :
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-c-outline-secondary  mx-1" id="reorderCategoryBtn">
                            <FontAwesomeIcon icon={faShuffle} />
                        </button>
                        <button className="btn btn-c-outline-success  mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#incomeCategoryAddModal"
                            id="addCategoryBtn">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    {incomeCategories.length === 0 ?
                        <div className="col-12 d-flex justify-content-center my-5">
                            <span className="small">Nenhuma categoria encontrada</span>
                        </div>
                        :
                        <>
                            <div className="col-12">

                            </div>
                        </>
                    }
                </div>

            }

        </>
    )


}