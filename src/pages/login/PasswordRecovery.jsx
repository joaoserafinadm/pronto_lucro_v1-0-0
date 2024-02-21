import styles from "./Login.module.scss";

import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { SpinnerSM } from "../../components/loading/Spinners";

export default function PasswordRecover(props) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordRecoverToken, setPasswordRecoverToken] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);

    const urlSearchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        setPasswordRecoverToken(urlSearchParams.get("token"));
        setUserId(urlSearchParams.get("id"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setPasswordError("Confirmação de senha não compatível.");
            return;
        } else if (password.length < 6) {
            setPasswordError("A senha deve ter no mínimo 6 caracteres");
            return;
        } else {
            setPasswordError("");
            setLoading(true);

            const body = {
                userId,
                passwordRecoverToken,
                password,
            };

            await axios.patch(`${baseUrl()}/api/login/passwordChange`, body)
                .then((res) => {
                    Router.replace("/");
                    setTimeout(() => {
                        Router.reload();
                        setLoading(false);
                    }, 500);
                }).catch(e => {
                    setLoading(false);

                })
        }
    };

    return (
        <div className={`${styles.container} d-flex justify-content-center align-items-center container-fluid`}>


            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                <form onSubmit={e => handleSubmit(e)}>

                    <div className={`card `}>
                        <div className={`card-body  m-3 `}>
                            <div className="row mb-3">
                                <h1 className={`${styles.title} title-dark`}>Alterar senha</h1>
                            </div>

                            <div className="row mt-3 mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control mt-2`}
                                    placeholder="Nova senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    className={`form-control mt-2`}
                                    placeholder="Confirmar nova senha"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />
                                <span className="small text-danger fadeItem">
                                    {passwordError}
                                </span>
                            </div>

                            <div className="row mb-3">
                                {loading ? (
                                    <button
                                        disabled
                                        className="btn btn-success"
                                    >
                                        <SpinnerSM />
                                    </button>
                                ) : (
                                    <button className="btn btn-outline-success" type="submit">
                                        Confirmar
                                    </button>
                                )}
                            </div>


                        </div>
                    </div>
                </form>

            </div>


        </div>
    );
}
