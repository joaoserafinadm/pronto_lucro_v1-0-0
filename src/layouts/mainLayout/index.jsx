import Head from "next/head";
//import styles from '../styles/Home.module.css'
import Logo from "./components/Logo";
import Header from "./Header";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBarOff, toggleBarOn } from "../../../store/ToggleBarStatus/ToggleBarStatus.action";
import window2Mobile from "../../../utils/window2Mobile";
import MenuBar from "./Menubar";
import InputButton from "../../components/inputButton/InputButton";
import isMobile from "../../../utils/isMobile";

export default function MainLayout({ children }) {

    const toggleStatus = useSelector(state => state.toggleStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        if (window2Mobile()) dispatch(toggleBarOn())
        else dispatch(toggleBarOff())
    }, [])

    useEffect(() => {
        handleSidebarToggle()
    }, [toggleStatus])

    const handleSidebarToggle = () => {
        const fixedWidht = document.documentElement.style.getPropertyValue('--aside-fixed-width')
        if (toggleStatus && window2Mobile()) {
            document.documentElement.style.setProperty('--aside-width', '230px')
        }
        else {
            document.documentElement.style.setProperty('--aside-width', '0px')
        }
    }



    return (
        <body className="app">
            <Header navbarStatus={toggleStatus} />
            <Navbar />

            <div className={`  pages`} >
                {children}
            </div>


            {isMobile() ?
                <MenuBar />
                :

                <InputButton />
            }






        </body>
    );
}
