import { useEffect, useState } from "react";
import Title from "../src/components/title/Title2";
import { SpinnerLG } from "../src/components/loading/Spinners";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import axios from "axios";
import navbarHide from "../utils/navbarHide";
import Sections from "../src/components/Sections";
import IncomeCategoriesPage from "../src/categories/incomeCategoriesPage";
import ExpenseCategoriesPage from "../src/categories/expenseCategoriesPage";



export default function Categories() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()

    const [section, setSection] = useState('Categorias de receita')



    useEffect(() => {
        navbarHide(dispatch)
    }, [])





    return (
        <div>
            <Title title={'Categorias'} subtitle='Crie e gerencie suas categorias e marcadores' backButton='/' />

            <div className="pagesContent fadeItem shadow">
                <div className="row">
                    <div className="col-12">
                        <div className=" carousel slide " data-bs-touch="false" data-bs-interval='false' id="accoutSetupPages">


                            <Sections section={section} idTarget="accoutSetupPages"
                                setSection={value => setSection(value)}
                                sections={["Categorias de receita", "Categorias de despesa", "Marcadores"]} />

                            <div className="carousel-inner ">
                                <div className="carousel-item active">
                                    <IncomeCategoriesPage token={token} />
                                </div>
                                <div className="carousel-item ">
                                    <ExpenseCategoriesPage token={token} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}