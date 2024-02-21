import { useState, useEffect } from "react";
import { SpinnerLG } from "../src/components/loading/Spinners";
import Sections from "../src/components/Sections";
import Title from "../src/components/title/Title2";
import GeeCalculatorPage from "../src/tutorials/GeeCalculatorPage";
import CorporateSustainabilityPage from "../src/tutorials/CorporateSustainabilityPage";
import navbarHide from "../utils/navbarHide.js";
import { useDispatch } from "react-redux";
import isMobile from "../utils/isMobile";
import Link from "next/link";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';


export default function Tutorials() {

    const token = jwt.decode(Cookie.get('auth'))



    const isMobileDevice = isMobile();
    const [section, setSection] = useState('Calculadora GEE')
    const dispatch = useDispatch()

    const unacessibleToolsMessage = (
        <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '58vh' }}>
            <p className="fs-3 fw-bold text-secondary">Esta ferramenta não está disponível no plano atual!</p>
            <p className="text-secondary">
                Acesse <i>"Seus produtos"</i> na página {isMobileDevice ? <br /> : ''}
                <Link href="/accountSetup"><span className="text-success text-decoration-underline">Configuração da Conta</span></Link> para verificar
                {isMobileDevice ? <br /> : ''} as opções disponíveis!
            </p>
        </div>
    )


    useEffect(() => {
        navbarHide(dispatch)
    }, [])


    return (
        <div id="pageTop">
            <Title title={'Tutoriais'} backButton='/' />
            <div className={`pagesContent shadow fadeItem mb-5 ${isMobileDevice && 'p-1'}`}>
                <div className="carousel" data-bs-touch="false" data-bs-interval='false' id="tutorialsPages">

                    <div className="p-3">
                        <Sections
                            section={section} idTarget="tutorialsPages"
                            setSection={value => setSection(value)}
                            sections={["Calculadora GEE", "Indicadores ESG"]} />
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            {
                                token?.tools?.geeCalculator ?
                                    <GeeCalculatorPage enablePlayVideo={section === 'Calculadora GEE' && true} />
                                    :
                                    unacessibleToolsMessage
                            }
                        </div>
                        <div className="carousel-item">
                            {
                                token?.tools?.esgIndicators ?
                                    <CorporateSustainabilityPage enablePlayVideo={section === 'Sustentabilidade Corporativa' && true} />
                                    :
                                    unacessibleToolsMessage
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}