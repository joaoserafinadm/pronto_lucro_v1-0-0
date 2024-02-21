import Link from "next/link";
import styles from "./Login.module.scss";
import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { useState } from "react";
import removeInputError from "../../../utils/removeInputError";
import axios from "axios";
// import CVanimation from '../../components/CVanimation';
import baseUrl from "../../../utils/baseUrl";
import { useRouter } from "next/router";
import PolicyModal from "./PolicyModal";
import AuthModal from "./AuthModal";
import { SpinnerSM } from "../../components/loading/Spinners";
import SignUpSuccessModal from "./SignUpSuccessModal";
import isMobile from "../../../utils/isMobile";
import { signIn, signOut } from 'next-auth/react'


export default function SignUp(props) {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authCode, setAuthCode] = useState("");

    //ERROR STATES
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [authError, setAuthError] = useState("");
    const [signUpError, setSignUpError] = useState("");

    //LOADING
    const [singUpLoading, setSignUpLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false)


    const validate = (
        firstNameValue,
        LastNameValue,
        emailValue,
        passwordValue
    ) => {
        removeInputError();
        clearErrors();

        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let passwordError = "";

        if (!firstNameValue) firstNameError = "Insira seu nome";
        if (!LastNameValue) lastNameError = "Insira seu sobrenome";
        if (!emailValue || !emailValue.includes("@"))
            emailError = "Insira um e-mail válido";
        if (passwordValue.length < 6 || !passwordValue)
            passwordError = "Insira no mínimo 6 caracteres";

        if (firstNameError || lastNameError || emailError || passwordError) {
            if (firstNameError)
                document.getElementById("firstNameInput").classList.add("inputError");
            if (lastNameError)
                document.getElementById("lastNameInput").classList.add("inputError");
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
            return true;
        }
    };

    const clearErrors = () => {
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
    };

    const validateCode = async (authCode, code) => {

        return new Promise(async resolve => {


            setAuthError('')

            if (!authCode || !code) {
                setAuthError('Insira o código de autenticação')
                resolve(false)
            }


            const data = {
                authCode,
                code
            }

            const response = await axios.post(`${baseUrl()}/api/login/authCode`, data)
                .then(res => {

                    setAuthError('')

                    resolve(true)
                }).catch(e => {
                    setAuthError('Código de autenticação errado')

                    resolve(false)

                })

        }
        )


    }

    const handleSignUp = async (code) => {

        setSignUpLoading(true);

        const isValid = await validateCode(authCode, code)

        if (isValid) {
            const data = {
                firstName,
                lastName,
                email,
                password,
            };

            await axios
                .post(`${baseUrl()}/api/login/signUp`, data)
                .then((res) => {
                    var myModal = new bootstrap.Modal(document.getElementById('signUpSuccessModal'))
                    myModal.show()
                })
                .catch((e) => {
                    setSignUpError(
                        "Houve um problema no cadastro. Por favor, tente novamente mais tarde!"
                    );
                });
        } else {

            var myModal = new bootstrap.Modal(document.getElementById('authModal'))
            myModal.show()

        }
    };


    const handleAuth = async (e) => {

        e.preventDefault()

        console.log("isvalid")
        setSignUpLoading(true)

        const isValid = validate(firstName, lastName, email, password);

        if (isValid) {


            const data = {
                email: email,
                firstName: firstName
            }

            await axios.post(`${baseUrl()}/api/login/authMail`, data)
                .then(res => {
                    setAuthCode(res.data.secureCode)
                    var myModal = new bootstrap.Modal(document.getElementById('authModal'))
                    myModal.show()
                }).catch(e => {
                    setSignUpLoading(false)
                    setEmailError('E-mail já cadastrado.')
                })
        } else {
            setSignUpLoading(false)

            return
        }




    }

    return (
        <div className="row fadeItem1s" style={{ height: "100%" }}>
            <div className="d-flex justify-content-center align-items-center">
                <div className={`card ${styles.cardSignIn} p-2`}>
                    <div
                        className={`card-body ${styles.cardSize} d-flex justify-content-center`}
                    >
                        <div className={`col-12 col-lg-6 d-flex justify-content-center align-items-center`}>
                            <form  >
                            {/* <form onSubmit={e => handleAuth(e)} > */}
                                <div className="row mb-1">
                                    <h1 className={`${styles.title} title-dark`}>Cadastre-se</h1>
                                </div>
                                <div className="row mb-3">
                                    <span style={{ fontSize: "15px" }}>É rápido e fácil.</span>
                                </div>

                                <div className="d-flex mb-2">
                                    <div className="col-6 pe-2">
                                        {/* <label for="exampleFormControlInput1" className="form-label">Email address</label> */}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstNameInput"
                                            placeholder="Nome"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6 ps-2">
                                        <input
                                            type="text"
                                            className="form-control "
                                            id="lastNameInput"
                                            placeholder="Sobrenome"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12  mb-2">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailInput"
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="small text-danger fadeItem">
                                        {emailError}
                                    </span>
                                </div>
                                <div className="col-12  mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordInput"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className="small text-danger fadeItem">
                                        {passwordError}
                                    </span>
                                </div>
                                <div className="col-12  mb-2" style={{ fontSize: "10px" }}>
                                    <span>
                                        Ao clicar em Cadastre-se, você concorda com nossos
                                    </span>
                                    <span
                                        className="span ms-1"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#policyModal"
                                    >
                                        Termos, Política de Privacidade e Política de Cookies.
                                    </span>
                                    <span className="ms-1">
                                        {" "}
                                        Você poderá receber notificações por SMS e cancelar isso
                                        quando quiser.
                                    </span>
                                </div>
                                <div className="col-12 d-flex justify-content-center my-3">
                                    {singUpLoading ?
                                        <button
                                            className="btn btn-success px-5"
                                            disabled
                                        >
                                            <SpinnerSM />
                                        </button>
                                        :
                                        <input type="submit" className={` ${styles.signInBtnOutline} px-5`} value={'Cadastre-se'} />
                                        // <input type="submit"
                                        //     className={` ${styles.signInBtnOutline} px-5`} value={'Cadastre-se'} />

                                    }
                                </div>
                                {/* <div className="col-12 d-flex justify-content-center mt-3">
                                    <span
                                        className="span"
                                        type="button"
                                        onClick={() => {
                                            props.setSection("signIn");
                                        }}
                                    >
                                        Já possui uma conta?
                                    </span>
                                </div> */}

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
                                        <span className="card py-2 px-1 my-2 cardAnimation" type="button"  >
                                        {/* <span className="card py-2 px-1 my-2 cardAnimation" type="button" onClick={() => { signIn('google'); setGoogleLoading(true) }}  > */}
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
                                                        <span >Cadastre-se com o Google</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                        :
                                        <span className="card py-2 px-1 my-2 cardAnimation" type="button" onClick={() => { signIn('google'); setGoogleLoading(true) }}  >
                                            <div className="row ">
                                                <div className="col-12 d-flex justify-content-center text-success py-1">
                                                    <SpinnerSM />
                                                </div>
                                            </div>
                                        </span>
                                    }

                                </div>
                            </form>
                        </div>

                        {!isMobile() && (
                            <div className="col-6 d-flex justify-content-center align-items-center p-5">

                                <img src="SIGN_UP_GIF.gif" className={`${styles.gif}`} alt="..." width={550} />
                            </div>
                        )}


                    </div>
                </div>
            </div>
            <div className={`${styles.voltarButton}`}>
                <span
                    className="span"
                    type="button"
                    onClick={() => {
                        props.setSection("signIn");
                    }}
                >
                    <AiOutlineLeft className="me-2" /> Voltar
                </span>
            </div>

            <PolicyModal />

            <AuthModal
                authCode={authCode}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                authError={authError}
                setAuthError={value => setAuthError(value)}
                setAuthCode={value => setAuthCode(value)}
                setSignUpLoading={(value) => setSignUpLoading(value)}
                handleSignUp={(code) => handleSignUp(code)}
                singUpLoading={singUpLoading}
            />

            <SignUpSuccessModal setSection={value => props.setSection(value)} />


        </div >
    );
}
