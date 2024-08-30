import { useState, useContext } from "react";
import Logo from "./components/Logo";
import Toggle from "./components/Toggle";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Scrollbars from "react-custom-scrollbars-2";
import { Accordion } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { AccordionContext } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBank, faBook, faBookOpen, faBuildingUser, faChartColumn, faChartLine, faChartSimple, faClipboardCheck, faClipboardList, faCreditCard, faCreditCardAlt, faDiagramProject, faFileContract, faGear, faHome, faHouseUser, faListCheck, faMessage, faMoneyBillTransfer, faObjectGroup, faTable, faTags, faTree, faUsers, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import window2Mobile from "../../../utils/window2Mobile";
import { toggleBarChange } from "../../../store/ToggleBarStatus/ToggleBarStatus.action";
import { userRestriction } from "../../../utils/permission.js"
import AkvoToolToggle from "./components/AkvoToolToggle";

export default function Nav(props) {

    const token = jwt.decode(Cookies.get("auth"));
    const toggleStatus = useSelector(state => state.toggleStatus)

    const akvoTool = useSelector(state => state.tool)

    const dispatch = useDispatch()

    const router = useRouter()

    function ContextAwareToggle({ children, eventKey, callback }) {
        const { activeEventKey } = useContext(AccordionContext);

        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey)
        );

        const isCurrentEventKey = activeEventKey === eventKey;

        return (
            <span
                className="font-weight-bold btn-toggle"
                type="button"
                onClick={decoratedOnClick}
                collapsed={isCurrentEventKey ? "true" : "false"}
            >
                <div className="row align-items-center">{children}</div>
            </span>
        );
    }



    return (
        <>
            <div className={`${styles.menuArea} shadow`} style={{ left: `${toggleStatus ? "0px" : "-270px"}` }}>
                <Toggle />
                <Logo />
                <div className=" row align-items-center mt-4 mb-2 fadeItem">
                    <div className="col">

                        <div className="row align-items-center">
                            <Link href={`/editProfile`}>
                                <div className="d-flex justify-content-center">
                                    <span type="button">
                                        <img
                                            src={token.profileImageUrl}
                                            alt="User profile picture"
                                            className={`${styles.img} `}
                                        />
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="row align-items-center mt-2">
                            <div className={`d-flex justify-content-center ${styles.userName}`}>
                                {token.firstName} {token.lastName}
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="d-flex justify-content-center">
                                <small className={styles.userStatus}>
                                    {token.userStatus === 'admGlobal' ? 'Administrador' : token.userStatus === 'consultant' ? 'Consultor' : ""}
                                </small>
                            </div>
                        </div>
                        <div style={{ height: (token.companyLogo || token.companyName) ? "75px" : "25px" }} className=" slideDown d-flex justify-content-center align-items-center">
                            {(token.companyLogo || token.companyName) && (
                                <Link href="/companyEdit" >
                                    <span type="button" className="row" >
                                        <div className="d-flex justify-content-center align-items-center">
                                            {token.companyLogo ?
                                                <img
                                                    src={token.companyLogo}
                                                    className={`${styles.companyLogo} fadeItem1s`}
                                                />
                                                :
                                                <span className={`${styles.userName} text-center fadeItem1s`}>
                                                    {token.companyName}
                                                </span>
                                            }
                                        </div>
                                    </span>
                                </Link>
                            )}
                        </div>

                        <Scrollbars
                            style={{ height: "calc(100vh - 200px" }}
                            autoHide
                            autoHideTimeout={3000}
                            autoHideDuration={200}
                            renderTrackVertical={(props) => (
                                <div {...props} className="vtrackSidebar" />
                            )}
                            renderThumbVertical={(props) => (
                                <div {...props} className="vthumbSidebar" />
                            )}
                        >
                            <ul style={{ width: "95%" }}>
                                <Accordion defaultActiveKey="0">
                                    <li>
                                        <ContextAwareToggle eventKey="0" collapse="InicioItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push('/')}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faHome} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Início</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>
                                    <li>
                                        <ContextAwareToggle eventKey="0" collapse="transactionsItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push('/transactions')}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Transações</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>
                                    <li>
                                        <ContextAwareToggle eventKey="1" collapse="resultsItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push('/transactions')}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faChartLine} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Resultados</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>
                                    <li>
                                        <ContextAwareToggle eventKey="2" collapse="cardsItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push('/bankAccounts')}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faWallet} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Contas</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>
                                    <li>
                                        <ContextAwareToggle eventKey="2" collapse="cardsItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push('/transactions')}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faCreditCard} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Cartão de crédito</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>
                                    <li>
                                        <ContextAwareToggle eventKey="3" collapse="tagsItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push('/categories')}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faTags} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Categorias</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>


                                    <li>
                                        <ContextAwareToggle eventKey="81">
                                            <div className="d-flex">
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faGear} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Configurações</div>
                                                <div className="col-1 toggleIcon text-end">
                                                    <FontAwesomeIcon icon={faAngleRight} className=" icon" />
                                                </div>
                                            </div>
                                        </ContextAwareToggle>
                                        <Accordion.Collapse eventKey="81">
                                            <ul>
                                                <li>
                                                    <Link href={`/editProfile`}>
                                                        <span>Editar Perfil</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/passwordChange">
                                                        <span>Alterar Senha</span>
                                                    </Link>
                                                </li>
                                                {userRestriction(["user", "auditor"], token.userStatus) && (
                                                    <li>
                                                        <Link href="/accountSetup">
                                                            <span>Configuração da Conta</span>
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </Accordion.Collapse>
                                    </li>

                                    <li>
                                        <ContextAwareToggle eventKey="91">
                                            <div className="d-flex">
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faBookOpen} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Documentação</div>
                                                <div className="col-1 toggleIcon text-end">
                                                    <FontAwesomeIcon icon={faAngleRight} className=" icon" />
                                                </div>
                                            </div>
                                        </ContextAwareToggle>
                                        <Accordion.Collapse eventKey="91">
                                            <ul>

                                                <li>
                                                    <Link href="/tutorials">
                                                        <span>Tutoriais</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Accordion.Collapse>
                                    </li>


                                    <li>
                                        <ContextAwareToggle eventKey="101" collapse="InicioItem">
                                            <div className="d-flex justify-content-start " type='button' onClick={() => router.push("/sac")}>
                                                <div className="col-1 text-center me-3">
                                                    <FontAwesomeIcon icon={faMessage} className="me-2 icon" />
                                                </div>
                                                <div className="col-9 bold">Fale Conosco</div>
                                            </div>
                                        </ContextAwareToggle>
                                    </li>




                                </Accordion>
                            </ul>

                        </Scrollbars>

                    </div>
                </div>
            </div>
            {!window2Mobile() && toggleStatus === true && (
                <div className={`fadeItem ${styles.navbarBackground}`} onClick={() => dispatch(toggleBarChange(toggleStatus))}>

                </div>
            )}
        </>

    );
}
