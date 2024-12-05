import { useEffect, useState } from "react";
import Sections from "../src/components/Sections";
import Title from "../src/components/title/Title2";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import navbarHide from "../utils/navbarHide";
import axios from "axios";
import TagsPage from "../src/tags/TagsPage";
import { SpinnerLG } from "../src/components/loading/Spinners";
import CategoriesPage from "../src/categories_02/categoriesPage";

export default function categories() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const [section, setSection] = useState('Categorias de receita')

    const [incomeTags, setIncomeTags] = useState([])
    const [expenseTags, setExpenseTags] = useState([])

    const [loadingPage, setLoadingPage] = useState(true)
    const [forceUpdate, setForceUpdate] = useState(0)

    useEffect(() => {
        dataFunction(token.sub)
        navbarHide(dispatch)
    }, [])

    const dataFunction = async (user_id) => {
        setLoadingPage(true)

        console.log('funcionou')

        await axios.get('/api/categories', {
            params: { user_id }
        }).then(res => {
            console.log(res.data.incomeTags[0])
            setIncomeTags(res.data.incomeTags)
            setExpenseTags(res.data.expenseTags)
            setLoadingPage(false)
            setForceUpdate(forceUpdate + 1)
        }).catch(e => {
            console.log(e)
            setLoadingPage(false)

        })


    }


    return (
        <div>
            <Title title={'Categorias'} subtitle='Crie e gerencie suas categorias' backButton='/' />

            <div className="pagesContent shadow">
                {loadingPage ?
                    <SpinnerLG />
                    :
                    <div className="row fadeItem">
                        <div className="col-12">
                            <div className=" carousel slide " data-bs-touch="false" data-bs-interval='false' id="accoutSetupPages">

                                <Sections section={section} idTarget="accoutSetupPages"
                                    setSection={value => setSection(value)}
                                    sections={["Categorias de receita", "Categorias de despesa"]} />


                                <div className="carousel-inner ">
                                    <div className="carousel-item active">
                                        <CategoriesPage categories={incomeTags} section={'incomeTags'} dataFunction={() => dataFunction(token.sub)} />
                                    </div>
                                    <div className="carousel-item ">
                                        <CategoriesPage categories={expenseTags} section={'expenseTags'} dataFunction={() => dataFunction(token.sub)} />

                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>
                }
            </div>

        </div>
    )
}