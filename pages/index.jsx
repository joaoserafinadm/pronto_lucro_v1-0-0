// import Head from 'next/head'
// import Image from 'next/image'
// import { useState, useEffect } from 'react'
import Title from '../src/components/title/Title2'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useEffect } from 'react'
import navbarHide from '../utils/navbarHide.js'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Link from 'next/link.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import isMobile from '../utils/isMobile.js'
import IndexCardsTools from '../src/index/IndexCardsTools.jsx'
// import Link from 'next/link'
// import $ from 'jquery'
// import axios from 'axios'
// import baseUrl from '../utils/baseUrl'
// import sidebarHide from "../utils/sidebarHide";
// import { useSelector } from 'react-redux'
// import { Accordion } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
// import { resetStates } from '../store/InventoryManagement/InventoryManagement.actions'
// import IndexNotifications from '../src/components/index/indexNotifications'
// import IndexCards from '../src/components/index/IndexCards_02'
// import IndexCardsTools from '../src/components/index/IndexCardsTools'


// if (typeof window !== "undefined") {
//     const bootstrap = require("bootstrap");
// }


// import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
// import {
//     chevronDownCircle,
//     chevronForwardCircle,
//     chevronUpCircle,
//     colorPalette,
//     document,
//     globe,
// } from 'ionicons/icons';


export default function Home() {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()


    useEffect(() => {
        navbarHide(dispatch)

    }, [])

    return (

        <div className='fadeItem1s'>
            <Title title={`Olá, ${token.firstName}!`} subtitle={'Qual a sua meta de sustentabilidade para hoje?'} />

            <div className=''></div>


            {/* <IndexCardsTools /> */}

            {/* <IndexCards /> */}
            {/* <div className="row">
                <div className="col-12">

                    <h5 className=' ms-2 mt-4'>Qual ferramenta deseja usar?</h5>
                </div>
            </div> */}

            {/* <IndexCardsTools />

            <IndexNotifications /> */}



            


        </div >
    )
}
