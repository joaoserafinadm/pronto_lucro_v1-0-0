import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { Provider, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle } from "styled-components";
import 'tippy.js/dist/tippy.css';
import { register } from 'swiper/element/bundle'
register()

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

import "../styles/globals.scss";
import "../styles/buttons.scss";
import '../styles/datePicker.scss';


import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

if (typeof window !== "undefined") {
    window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')
    require('apexcharts/dist/apexcharts.common.js')
    require("../node_modules/popper.js/dist/umd/popper.min.js")
    require("jquery");
    require("@popperjs/core")
    require("bootstrap");
    require("bootstrap/dist/css/bootstrap.min.css")
    require("bootstrap/dist/js/bootstrap.bundle")
    require("bootstrap/dist/js/bootstrap.min.js")
}


import baseUrl from "../utils/baseUrl";
import { store, persistedStore } from "../store/store";



import MainLayout from "../src/layouts/mainLayout";
import Login from "../src/pages/login";
import PasswordRecover from "../src/pages/login/PasswordRecovery";
import jwt from "jsonwebtoken";
import { SessionProvider } from 'next-auth/react'
import ConsultantRedirect from "../src/pages/consultantRedirect/index.jsx";
import { closeModal } from "../utils/modalControl.js";
import IncomeAddModal from "../src/incomeAdd/IncomeAddModal.jsx";
import ExpenseAddModal from "../src/incomeAdd/ExpenseAddModal.jsx";


export default function MyApp({ Component, pageProps }) {

    useEffect(() => {
        closeModal()
    }, []);

    const token = Cookie.get('auth') ? jwt.decode(Cookie.get('auth')) : false

    const [passwordRecoverRoute, setPasswordRecoverRoute] = useState(false);
    const [consultantRedirectRoute, setConsultantRedirectRoute] = useState(false)


    useEffect(() => {
        hrefVerify();
    }, []);

    const hrefVerify = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const queryId = urlSearchParams.get("id");
        const queryToken = urlSearchParams.get("token");
        const queryConsId = urlSearchParams.get("id");
        const queryConsToken = urlSearchParams.get("consToken");
        const queryCompanyId = urlSearchParams.get("companyId");


        if (queryId && queryToken) {
            setPasswordRecoverRoute(true);
            var passwordRecoverRoute = true;
        }

        if (queryConsId && queryConsToken && queryCompanyId) {
            setConsultantRedirectRoute(true)
            var consultantRedirectRoute = true
        }



        if (!Cookie.get("auth") &&
            window.location.href !== baseUrl() &&
            !passwordRecoverRoute &&
            !consultantRedirectRoute) {

            setTimeout(async () => {
                await Router.replace("/");
            }, 1000);

        }
    };

    const render = () => {



        if (passwordRecoverRoute) {
            return <PasswordRecover />;
        }


        if (!token && consultantRedirectRoute) {

            return (
                <ConsultantRedirect />
            )

        }




        if (!token) {
            return (
                <Provider store={store}>
                    <PersistGate persistor={persistedStore}>
                        <Head>
                            <title>PRONTO LUCRO</title>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                            />
                            <link rel="icon" href="favicon.ico" />

                            <link rel="manifest" href="/manifest.json" />
                            <link rel="apple-touch-icon" href="/icon.png" />
                            <meta name="theme-color" content="#012351" />
                        </Head>

                        <SessionProvider>

                            <Login onChange={(token) => setToken(token)} />

                        </SessionProvider>
                    </PersistGate>
                </Provider>
            );
        }



        if (token) {
            return (
                <Provider store={store}>
                    <PersistGate persistor={persistedStore}>
                        <Head>
                            <title>Pronto Lucro</title>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                            />
                            <link rel="icon" href="favicon.ico" />

                            <link rel="manifest" href="/manifest.json" />
                            <link rel="apple-touch-icon" href="/icon.png" />
                            <meta name="theme-color" content="#333333" />
                        </Head>

                        <MainLayout>
                            <IncomeAddModal />
                            <ExpenseAddModal />

                            <Component  {...pageProps} />
                        </MainLayout>
                    </PersistGate>
                </Provider>
            );
        }
    };

    return <div>{render()}</div>;
}
