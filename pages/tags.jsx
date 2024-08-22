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




export default function Tags() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const [section, setSection] = useState('Categorias de receita')

    const [incomeTags, setIncomeTags] = useState([])
    const [expenseTags, setExpenseTags] = useState([])

    const [loadingPage, setLoadingPage] = useState(true)

    useEffect(() => {
        dataFunction(token.sub)
        navbarHide(dispatch)
    }, [])

    const dataFunction = async (user_id) => {

        console.log('funcionou')

        await axios.get('/api/tags', {
            params: { user_id }
        }).then(res => {
            setIncomeTags(res.data.incomeTags)
            setExpenseTags(res.data.expenseTags)
            setLoadingPage(false)
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
                            <div className=" carousel  " data-bs-touch="false" data-bs-interval='false' id="accoutSetupPages">

                                <Sections section={section} idTarget="accoutSetupPages"
                                    setSection={value => setSection(value)}
                                    sections={["Categorias de receita", "Categorias de despeza"]} />


                                <div className="carousel-inner ">
                                    <div className="carousel-item active">
                                        <TagsPage tags={incomeTags} section={'incomeTags'} dataFunction={() => dataFunction(token.sub)} />
                                    </div>
                                    <div className="carousel-item">
                                        <TagsPage tags={expenseTags} section={'expenseTags'} dataFunction={() => dataFunction(token.sub)} />

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