import { useEffect, useState } from "react";
import Sections from "../src/components/Sections";
import Title from "../src/components/title/Title2";
import navbarHide from "../utils/navbarHide";
import { useDispatch } from "react-redux";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import creditNetworkList from '../src/bankAccounts/creditCardList.json'
import TaxesConfigPage from "../src/creditNetworkConfig/taxesConfigPage";


export default function creditNetworkConfig() {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()


    const [section, setSection] = useState('Configuração de taxas')


    useEffect(() => {
        navbarHide(dispatch)
    }, [])


    return (
        <div>
            <Title title={'Cartão de crédito'} subtitle='Configure as taxas das redes de cartão de crédito' backButton='/' />


            <div className="pagesContent fadeItem shadow">
                <div className="row">
                    <div className="col-12">
                        <div className=" carousel slide " data-bs-touch="false" data-bs-interval='false' id="accoutSetupPages">


                            <Sections section={section} idTarget="accoutSetupPages"
                                setSection={value => setSection(value)}
                                sections={["Configuração de taxas", "Antecipação de parcelas"]} />

                            <div className="carousel-inner ">
                                <div className="carousel-item active">
                                    <TaxesConfigPage />
                                </div>
                                <div className="carousel-item ">
                                   <div className="row">
                                    <div className="col-12 my-5 text-center">
                                        <span className="small text-secondary ">
                                            Módulo disponível em breve
                                        </span>
                                    </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}