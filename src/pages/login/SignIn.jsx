import Head from "next/head";
import styles from "./Login.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import removeInputError from "../../../utils/removeInputError";
import baseUrl from "../../../utils/baseUrl";
import router from "next/router";
import { SpinnerSM } from "../../components/loading/Spinners";
import Cookies from "js-cookie";
import { signIn, signOut } from 'next-auth/react'
import isMobile from "../../../utils/isMobile";


export default function signInPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //RENDER
    const [loadedImages, setLoadedImages] = useState(0);
    const [singInLoading, setSignInLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false)

    //ERROR
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validate = () => {
        removeInputError();
        clearErrors();

        let emailError = "";
        let passwordError = "";

        if (!email || !email.includes("@")) emailError = "Insira um e-mail válido";
        if (!password) passwordError = "Insira sua senha";

        if (emailError || passwordError) {
            if (emailError) {
                document.getElementById("emailInput").classList.add("inputError");
                setEmailError(emailError);
            }
            if (passwordError) {
                document.getElementById("passwordInput").classList.add("inputError");
                setPasswordError(passwordError);
            }
            return false;
        } else {
            setEmailError("");
            setPasswordError("");
            return true;
        }
    };

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const handleEmailAuth = () => {
        const isValid = validate();

        if (isValid) {
            const data = {};
        }
    };

    const handleSignIn = async (e) => {

        e.preventDefault()

        setSignInLoading(true);

        const isValid = validate();

        if (isValid) {
            const data = {
                email,
                password,
            };

            await axios
                .post(`${baseUrl()}/api/login/signIn`, data)
                .then((res) => {

                    localStorage.setItem("auth", Cookies.get("auth"));
                    const localToken = localStorage.getItem("auth");

                    router.reload();

                })
                .catch((e) => {
                    setPasswordError("E-mail ou senha incorretos");
                    setSignInLoading(false);

                });
        } else {
            setSignInLoading(false);
        }
    };

    return (
        <>
            <div className="row fadeItem1s "
                style={{ height: "100%" }}>
                <div className="col-12 d-flex justify-content-evenly">



                    {!isMobile() && (
                        <div className=" d-flex justify-content-center align-items-center">
                            <img
                                src=""
                                alt=""
                                className={`${styles.logoImg}`}
                                onLoad={() => setLoadedImages(loadedImages + 1)}
                            />
                        </div>
                    )}

                    <div className=" d-flex justify-content-center align-items-center">
                        <form onSubmit={e => handleSignIn(e)}>

                            <div className={`card `}>
                                <div className={`card-body ${styles.cardSize} `}>

                                    <div className="row mb-3">
                                        <h1 className={`${styles.title} title-dark`}>Login</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col-12  d-flex justify-content-start">
                                            <span>Não possui uma conta?</span>
                                        </div>
                                        <div className="col-12  d-flex justify-content-start">
                                            <span
                                                className="span"
                                                type="button"
                                                onClick={() => {
                                                    props.setSection("signUp");
                                                }}
                                            >
                                                Cadastre-se
                                            </span>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row mt-3 mb-3">
                                        <input
                                            type="email"
                                            id="emailInput"
                                            className="form-control"
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="small text-danger fadeItem">{emailError}</span>
                                    </div>
                                    <div className="row mb-3">
                                        <input
                                            type="password"
                                            id="passwordInput"
                                            className="form-control"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="small text-danger fadeItem">
                                            {passwordError}
                                        </span>
                                    </div>
                                    <div className="row mb-3">
                                        {singInLoading ? (
                                            <button
                                                disabled
                                                className="btn btn-c-outline-secondary"
                                            >
                                                {/* <button
                                                disabled
                                                className="btn btn-success"
                                                onClick={() => handleSignIn()}
                                            > */}
                                                <SpinnerSM />
                                            </button>
                                        ) : (
                                            // <button className={` ${styles.signInBtn}`} type="submit">
                                            <button className={`btn btn-c-outline-secondary`} type="submit">
                                                Entrar
                                            </button>
                                        )}
                                    </div>
                                    <div className="row mb-1">
                                        <small>
                                            <span
                                                className="span"
                                                type="button"
                                                onClick={() => props.setSection("rescuePassword")}
                                            >
                                                Esqueceu a senha?
                                            </span>
                                        </small>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="col">
                                            <hr />
                                        </div>
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <span>
                                                <small>Ou</small>
                                            </span>
                                        </div>
                                        <div className="col">
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row">
                                        {!googleLoading ?
                                            // <span className="card py-2 px-1 my-2 cardAnimation" type="button" onClick={() => { signIn('google'); setGoogleLoading(true) }} >
                                            <span className="card py-2 px-1 my-2 cardAnimation" type="button" >
                                                <div className="row ">
                                                    <div className="col-12 d-flex justify-content-center">
                                                        <div className="icon-start">
                                                            <img
                                                                src="/ICON-GOOGLE.png"
                                                                alt=""
                                                                className="socialIcon"
                                                            />
                                                        </div>
                                                        <div>
                                                            <span >Continuar com o Google</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                            :
                                            <span className="card py-2 px-1 my-2 "  >
                                                <div className="row ">
                                                    <div className="col-12 d-flex justify-content-center text-success py-1">
                                                        <SpinnerSM />
                                                    </div>
                                                </div>
                                            </span>
                                        }

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12 d-flex justify-content-center">
                                            <img src="./LOGO_01.png" alt="" height={40} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </>
    );
}
