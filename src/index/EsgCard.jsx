import { faArrowRight, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setAkvoTool } from "../../store/AkvoTools/AkvoTools.actions"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


export default function EsgCard(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()

    return (
        // <div className={`card indexCards indexCardDisabled `} style={{ "width": "18rem" }} >
        <div className={`card indexCards ${token.tools.esgIndicators ? 'cardAnimation' : 'indexCardDisabled'} `} style={{ "width": "18rem" }} onClick={() => { if (token.tools.esgIndicators) dispatch(setAkvoTool('esgIndicators')) }}>
            {/* <div className="card-body" > */}
            <div className="card-body" type={token.tools.esgIndicators ? 'button' : ''}>
                <div className="d-flex justify-content-center">
                    <div className="indexCardLogo d-flex justify-content-center align-items-center">
                        <img src="./IndicadoresESG_icon.png" alt="" />
                    </div>
                </div>
                <h4 className="card-title text-light" style={{ "marginTop": "90px" }}>
                    Sustentabilidade Corporativa
                </h4>

                <div className="row">
                    <span className="card-text text-light">
                        Avalie a maturidade dos critérios ESG e GRI da sua instituição
                    </span>
                </div>

                {props.akvoTool === "esgIndicators" && (

                    <div className="card-body px-0  fadeItem">
                        <div className="row px-2">
                            <Link href="/esgIndicators_old" className="indexCardButton my-1">
                                Formulário
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/esgResults" className="indexCardButton my-1">
                                Resultados
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/esgManagement" className="indexCardButton my-1">
                                Planos de Ação
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}