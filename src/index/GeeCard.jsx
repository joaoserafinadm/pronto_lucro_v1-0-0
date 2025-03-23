import { faArrowRight, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setAkvoTool } from "../../store/AkvoTools/AkvoTools.actions"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


export default function GeeCard(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()

    return (
        <div className={`card indexCards ${token.tools.geeCalculator ? 'cardAnimation' : 'indexCardDisabled'} `} style={{ "width": "18rem" }} onClick={() => { if (token.tools.geeCalculator) dispatch(setAkvoTool('geeCalculator')) }}>
            <div className="card-body " type={token.tools.geeCalculator ? 'button' : ''}>
                <div className="d-flex justify-content-center">
                    <div className="indexCardLogo d-flex justify-content-center align-items-center">
                        <img src="./InventarioGEE_icon_02.png" alt="" />
                    </div>
                </div>
                <h4 className="card-title text-light" style={{ "marginTop": "90px" }}>
                    Calculadora GEE
                </h4>

                <div className="row">
                    <span className="card-text text-light">
                        Crie o inventário de emissões de GEE da sua instituição
                    </span>
                </div>

                {props.akvoTool === "geeCalculator" && (

                    <div className="card-body px-0  fadeItem">
                        <div className="row px-2">
                            <Link href="/inventory" className="indexCardButton my-1">
                                Inventário
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/geeEmissions" className="indexCardButton my-1">
                                Emissões GEE
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/inventoryManagement" className="indexCardButton my-1">
                                Metas e Planos de Ação
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/reportManagement" className="indexCardButton my-1">
                                Relatórios
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                            <Link href="/offsetting" className="indexCardButton my-1">
                                Compensação
                                <FontAwesomeIcon className="ms-1 icon" icon={faArrowRight} />
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}