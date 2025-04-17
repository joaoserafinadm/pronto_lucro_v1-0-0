import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import { faBell, faBuilding, faCircleRight, faGear, faKey, faLeftLong, faUser } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import tippy from "tippy.js";
import Notifications from "./components/Notifications";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import isMobile from "../../../utils/isMobile";
import NotificationsSM from "./components/NotificationsSM";
import Alerts from "../../alerts";
import { akvoToolInitialValues } from "../../../store/AkvoTools/AkvoTools.actions";

export default function Header(props) {

    const token = jwt.decode(Cookies.get('auth'))
    const dropdownRef = useRef(null);

    const dispatch = useDispatch()

    const router = useRouter();
    const toggleStatus = useSelector(state => state.toggleStatus)

    const [notifications, setNotifications] = useState([])
    const [dropdownStatus, setDropdownStatus] = useState(true)
    const [showNotification, setShowNotification] = useState(false)

    // useEffect(() => {
    //     dataFunction(token.sub)
    // }, [])

    // useEffect(() => {
    //     const dropdownElement = dropdownRef.current;

    //     const showDropdownHandler = () => {
    //         setDropdownStatus(true);
    //     };

    //     const hideDropdownHandler = () => {
    //         setDropdownStatus(false);
    //     };

    //     dropdownElement.addEventListener('show.bs.dropdown', showDropdownHandler);
    //     dropdownElement.addEventListener('hide.bs.dropdown', hideDropdownHandler);

    //     return () => {
    //         dropdownElement.removeEventListener('show.bs.dropdown', showDropdownHandler);
    //         dropdownElement.removeEventListener('hide.bs.dropdown', hideDropdownHandler);
    //     };
    // }, []);

    // useEffect(() => {

    //     setTimeout(() => {

    //         if (!dropdownStatus) {
    //             handleNotificationCheck()
    //         }
    //     }, 100)


    // }, [dropdownStatus])


    const hendleSession = async () => {

        Cookies.remove('auth')
        localStorage.removeItem('auth')
        await router.replace('/')
        router.reload()
    }


    // const dataFunction = async (user_id) => {

    //     await axios.get(`${baseUrl()}/api/notifications`, {
    //         params: {
    //             user_id: user_id
    //         }
    //     })
    //         .then(res => {
    //             setNotifications(res.data.data)
    //         }).catch(e => {
    //             console.log(e)
    //         })

    // }

    // const handleShowNotifications = () => {

    //     const unviewedNot = notifications?.filter(elem => elem.checked === false)

    //     return unviewedNot?.length
    // }

    // const handleNotificationCheck = async () => {

    //     const newNotStatus = notifications.map(elem => {
    //         return { ...elem, checked: true }
    //     })

    //     setNotifications(newNotStatus)

    //     if (handleShowNotifications()) {

    //         await axios.patch(`${baseUrl()}/api/notifications`, {
    //             company_id: token.company_id,
    //             user_id: token.sub
    //         }).then(res => {
    //             dataFunction(token.sub)
    //         })

    //     }
    // }



    return (
        <div className={`d-flex shadow justify-content-center align-items-center ${styles.header}`}>


            <Alerts />

            {!toggleStatus && (
                <div className="fadeItem">
                    <Link href="/">
                        <div className='d-flex justify-content-center align-items-center ' >
                            <span type='button'>
                                <img src="/LOGO_02.png" alt="logo" className='' height={30} />
                            </span>
                        </div>
                    </Link>
                </div>
            )}


            <div className={`d-flex ${styles.configIcons}`}>




                <div className="dropdown">
                    {/* Avatar com efeito de hover */}
                    <span
                        type="button"
                        className="position-relative d-inline-block"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src={token.profileImageUrl}
                            alt="Foto de perfil"
                            className={`${styles.profilePicture} rounded-circle border border-2 border-light shadow-sm me-2`}
                            style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "";
                            }}
                        />
                        </span>

                    {/* Menu redesenhado */}
                    <ul className="dropdown-menu dropdown-menu-end mt-2 me-0 shadow-lg border-0 rounded-3 overflow-hidden" style={{ minWidth: "250px" }}>
                        {/* <div className="px-4 py-3 bg-light border-bottom">
                            <h6 className="mb-0 fw-bold">Menu de Usuário</h6>
                        </div> */}
                        <div className="p-2">
                            <small>
                                <li className="my-1">
                                    <Link href="/editProfile">
                                        <span className="dropdown-item rounded-2 text-gray-dark d-flex align-items-center py-2">
                                            <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                                            <span>Meu perfil</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="my-1">
                                    <Link href="/editProfile?section=Minha empresa">
                                        <span className="dropdown-item rounded-2 text-gray-dark d-flex align-items-center py-2">
                                            <FontAwesomeIcon icon={faBuilding} className="me-2 text-primary" />
                                            <span>Minha empresa</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="my-1">
                                    <Link href="/passwordChange">
                                        <span className="dropdown-item rounded-2 text-gray-dark d-flex align-items-center py-2">
                                            <FontAwesomeIcon icon={faKey} className="me-2 text-primary" />
                                            <span>Alterar senha</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="my-1">
                                    <Link href="/accountSetup">
                                        <span className="dropdown-item rounded-2 text-gray-dark d-flex align-items-center py-2">
                                            <FontAwesomeIcon icon={faGear} className="me-2 text-primary" />
                                            <span>Configurações</span>
                                        </span>
                                    </Link>
                                </li>

                                <li className="my-2"><hr className="dropdown-divider" /></li>

                                <li className="mt-1">
                                    <button
                                        className="dropdown-item rounded-2 text-danger d-flex align-items-center py-2"
                                        type="button"
                                        onClick={() => hendleSession()}
                                    >
                                        <FontAwesomeIcon icon={faCircleRight} className="me-2" />
                                        <span>Sair</span>
                                    </button>
                                </li>
                            </small>
                        </div>
                    </ul>
                </div>






                {/* <div className={` dropdown`} ref={dropdownRef}>
                    <span type="button" className="" role="button" data-bs-toggle={!isMobile() ? "dropdown" : ''} aria-expanded="false" onClick={() => setShowNotification(!showNotification)}>
                        <FontAwesomeIcon icon={faBell} className={`text-white  px-2 mx-3`} style={{  fontSize: '23px' }} />
                        {!!handleShowNotifications() && (
                            <div className={`${styles.notificationIcon} fadeItem`}>
                                <p className='text-light d-flex justify-content-center align-items-center'>{handleShowNotifications()}</p>
                            </div>
                        )}
                    </span>

                    {!isMobile() ?
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownNotification">
                            <Notifications notifications={notifications} />
                        </ul>
                        :
                        <>
                            {showNotification && (

                                <NotificationsSM notifications={notifications} notificationOff={() => setShowNotification(false)} handleNotificationCheck={handleNotificationCheck}/>
                            )}
                        </>

                    }

                </div> */}






            </div>
        </div>
    );
}
