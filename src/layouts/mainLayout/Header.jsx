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

    const dropdownRef = useRef(null);

    const dispatch = useDispatch()

    const router = useRouter();
    const token = jwt.decode(Cookies.get('auth'))
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




                <div className={` dropdown `}>
                    <span type="button" className="me-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={token.profileImageUrl} alt="" className={`${styles.profilePicture}`} />
                    </span>

                    <ul className="dropdown-menu dropdown-menu-end mt-4 me-2" aria-labelledby="dropdownMenuButton1" >
                        <small >

                            <li className='my-1'>
                                <Link href="/editProfile">
                                    <span className="dropdown-item text-gray-dark" >
                                        <FontAwesomeIcon icon={faUser} className="me-1 icon" /> Meu perfil
                                    </span>
                                </Link>
                            </li>
                            <li className='my-1'>
                                <Link href="/editProfile?section=Minha empresa">
                                    <span className="dropdown-item text-gray-dark" >
                                        <FontAwesomeIcon icon={faBuilding} className="me-1 icon" /> Minha empresa
                                    </span>
                                </Link>
                            </li>
                            <li className='my-1'>
                                <Link href="/passwordChange">
                                    <span className="dropdown-item text-gray-dark" >
                                        <FontAwesomeIcon icon={faKey} className="me-1 icon" /> Alterar senha
                                    </span>
                                </Link>
                            </li>
                            <li className='my-1'>
                                <Link href="/accountSetup">
                                    <span className="dropdown-item text-gray-dark" >
                                        <FontAwesomeIcon icon={faGear} className="me-1 icon" /> Configurações
                                    </span>
                                </Link>
                            </li>

                            <li className='my-1'><hr className='dropdown-divider' /></li>
                            <li className='mt-1'>
                                <a className="dropdown-item text-gray-dark" type='button' onClick={() => hendleSession()}>
                                    <FontAwesomeIcon icon={faCircleRight} className="me-1 icon" /> Sair
                                </a>
                            </li>
                        </small>
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
