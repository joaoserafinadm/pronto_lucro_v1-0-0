import Head from "next/head";
//import styles from '../styles/Home.module.css'
import Logo from "./components/Logo";
import Header from "./Header";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBarOff, toggleBarOn } from "../../../store/ToggleBarStatus/ToggleBarStatus.action";
import window2Mobile from "../../../utils/window2Mobile";

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
            document.documentElement.style.setProperty('--aside-width', '270px')
        }
        else {
            document.documentElement.style.setProperty('--aside-width', '0px')
        }
    }



    return (
        <body className="app">

            <div className={`  pages`} >
                {children}
            </div>

            <Navbar />
            <Header navbarStatus={toggleStatus} />




        </body>
    );
}
