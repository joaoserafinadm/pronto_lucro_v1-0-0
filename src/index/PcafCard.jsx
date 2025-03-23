import { faArrowRight, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setAkvoTool } from "../../store/AkvoTools/AkvoTools.actions"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


export default function PcafCard(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()

    return (
        <div className={`card indexCards ${token.tools.pcaf ? 'cardAnimation' : 'indexCardDisabled'} `} style={{ "width": "18rem" }} onClick={() => { if (token.tools.pcaf) dispatch(setAkvoTool('pcaf')) }}>
            <div className="card-body " type={token.tools.pcaf ? 'button' : ''}>
                <div className="d-flex justify-content-center">
                    <div className="indexCardLogo d-flex justify-content-center align-items-center">
                        <img src="./PCAF_icon.png" alt="" />
                    </div>
                </div>
                <h4 className="card-title text-light" style={{ "marginTop": "90px" }}>
                    Emissões Financiadas
                </h4>

                <div className="row">
                    <span className="card-text text-light">
                        Ferramenta para bancos avaliarem os impactos das emissões de GEE dos seus financiamentos
                    </span>
                </div>

                {props.akvoTool === "pcaf" && (

                    <div className="card-body px-0  fadeItem">
                        <div className="row px-2">

                            <Link href="/pcafInstructions" className="indexCardButton my-1" >
                                Instruções
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/contractsManagement indexCardButton my-1" className="indexCardButton my-1">
                                Gestão de Contratos
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/pcafResults_2" className="indexCardButton my-1">
                                Resultados
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/pcafReportManagement" className="indexCardButton my-1">
                                Relatórios
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}