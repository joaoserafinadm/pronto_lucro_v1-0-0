import { useEffect, useState } from "react";
import Title from "../src/components/title/Title2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faUser, faUserCheck, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FixedTopicsBottom } from "../src/components/fixedTopics";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { SpinnerLG, SpinnerSM } from "../src/components/loading/Spinners"
import { useDispatch, useSelector } from "react-redux";
import navbarHide from "../utils/navbarHide";
import removeInputError from "../utils/removeInputError";
import scrollTo from "../utils/scrollTo";
import randomPassword from "../utils/randomPassword";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { addAlert } from "../store/Alerts/Alerts.actions";
import { useRouter } from "next/router";
import UnityPermissionTable from "../src/userAdd/UnityPermissionTable";
import isMobile from "../utils/isMobile";



export default function userAdd() {

    const token = jwt.decode(Cookies.get("auth"));
    const dispatch = useDispatch()
    const router = useRouter()

    const alertsArray = useSelector(state => state.alerts)


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userStatus, setUserStatus] = useState('')

    const [firstNameError, setFirstNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [userStatusError, setUserStatusError] = useState('')

    const [loadingSave, setLoadingSave] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)

    const [permissions, setPermissions] = useState([])
    const [permissionsError, setPermissionsError] = useState('')

    const [unidades, setUnidades] = useState([])
    const [users, setUsers] = useState([])
    const [groups, setGroups] = useState([])

    const [forceUpdate, setForceUpdate] = useState(0)

    useEffect(() => {
        navbarHide(dispatch)
        dataFunction(token.company_id)

    }, [])

    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/userAdd`, {
            params: {
                company_id
            }
        }).then(res => {
            setUnidades(res.data.unidades)
            setUsers(res.data.users)
            setGroups(res.data.groups)

            console.log("res.data", res.data)
            setLoadingPage(false)
        }).catch(e => {
            console.log(e)
        })

    }


    const handleDisableSave = () => {

        if (!firstName || !email || !userStatus) {
            return true
        } else {
            return false
        }
    }

    const validate = () => {

        setFirstNameError('')
        setEmailError('')
        setUserStatusError('')

        let firstNameError = ''
        let emailError = ''
        let userStatusError = ''

        removeInputError()

        if (!firstName) firstNameError = 'Escreva o nome do usuário'
        if (!email || !email.includes('@')) emailError = "E-mail inválido"
        if (!userStatus) userStatusError = "Escolha uma das opções"


        if (firstNameError || emailError || userStatusError) {
            if (firstNameError) { setFirstNameError(firstNameError); document.getElementById("firstName").classList.add('inputError') }
            if (emailError) { setEmailError(emailError); document.getElementById("email").classList.add('inputError') }
            if (userStatusError) { setUserStatusError(userStatusError) }

            scrollTo('pageTop')
            return false
        } else {
            setFirstNameError('')
            setEmailError('')
            setUserStatusError('')

            removeInputError()

            return true
        }
    }

    const handleSave = async (company_id) => {

        setLoadingSave(true)

        const isValid = validate()

        if (isValid) {

            const data = {
                company_id: token.company_id,
                user_id: token.sub,
                firstName,
                lastName,
                email,
                userStatus: userStatus
            }

            await axios.post(`${baseUrl()}/api/userAdd`, data)
                .then(res => {
                    setLoadingSave(false)

                    const alert = {
                        type: 'alert',
                        message: 'Usuário adicionado com sucesso.',
                    }

                    dispatch(addAlert(alertsArray, [alert]))

                    router.push('/')

                })
                .catch(e => {
                    if (e.response.data.error === 'User already exists') {
                        setEmailError('Este e-mail ja está cadastrado')
                        document.getElementById("email").classList.add('inputError')
                    }
                    setLoadingSave(false)

                })


            setLoadingSave(false)
        }

        setLoadingSave(false)

    }


    return (
        <div >
            <Title title={'Adicionar usuário'} backButton='/' />

            {loadingPage ?
                <SpinnerLG />
                :

                <div className="pagesContent shadow fadeItem" id="pageTop">
                    <div className="row d-flex ">
                        <label for="telefoneItem" className="form-label fw-bold">Informações do usuário</label>
                        <div className="col-12 col-lg-5 my-2">
                            <label for="firstName" >Nome*</label>
                            <input type="text" className="form-control " id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="" />
                            <small className="text-danger">{firstNameError}</small>
                        </div>
                        <div className="col-12 col-lg-5 my-2 fadelItem">
                            <label for="lastName" >Sobrenome (opcional)</label>
                            <input type="text" className="form-control " id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="" />
                        </div>
                        <div className="col-12 col-lg-10 my-2">
                            <label for="email" >E-mail*</label>
                            <input type="text" className="form-control " id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="" />
                            <small className="text-danger">{emailError}</small>
                        </div>
                    </div>


                    <div className="row d-flex mt-3">
                        <label for="telefoneItem" className="form-label fw-bold">Categoria*</label>
                        <small className="text-danger">{userStatusError}</small>

                        <div className="col-12 col-lg-5 my-2">
                            <div className={`card cardAnimation ${userStatus === 'admin' ? 'border border-success border-2' : ''}`} type="button" onClick={() => setUserStatus('admin')}>
                                <div className="card-body">
                                    <div className="row">


                                        <h5 class="card-title text-title d-flex align-items-center "> <FontAwesomeIcon icon={faUserGear} className="icon me-2" />Administrador</h5>
                                        <div className="col-12 small">
                                            <span>
                                                Administradores podem acessar todos os dados de todas as unidades, cadastrar novas unidades e usuários, além de inserir e editar informações conforme necessário.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5 my-2">
                            <div className={`card cardAnimation  ${userStatus === 'user' ? 'border border-success border-2' : ''}`} type="button" onClick={() => { setUserStatus('user'), scrollTo('permissionsSection') }}>
                                <div className="card-body">
                                    <div className="row">


                                        <h5 class="card-title text-title d-flex align-items-center"> <FontAwesomeIcon icon={faUser} className="icon me-2" />Usuário</h5>
                                        <div className="col-12 small">
                                            <span>
                                                Usuários têm acesso aos dados das unidades autorizadas pelo administrador, podendo inserir dados no inventário e editar as informações inseridas por eles mesmos.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="col-12 col-lg-5 my-2">
                            {/* <div className={`card cardAnimation bg-light ${userStatus === 'consultor' ? 'border border-success border-2' : ''}`} type="button" onClick={() => {setUserStatus('consultor'), scrollTo('permissionsSection')}}> */}
                            <div className={`card bg-light`}>
                                <div className="card-body">
                                    <div className="row">


                                        <h5 class="card-title text-title d-flex align-items-center"> <FontAwesomeIcon icon={faChalkboardUser} className="icon me-2" />Consultor Externo</h5>
                                        <div className="col-12 small">
                                            <span>
                                                Disponível em <b>breve</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div className="col-12 col-lg-5 my-2">
                            {/* <div className={`card cardAnimation ${userStatus === 'auditor' ? 'border border-success border-2' : ''}`} type="button" onClick={() => {setUserStatus('auditor'), scrollTo('permissionsSection')}}> */}
                            <div className={`card bg-light`}>
                                <div className="card-body">
                                    <div className="row">


                                        <h5 class="card-title text-title d-flex align-items-center "> <FontAwesomeIcon icon={faUserCheck} className="icon me-2" />Auditor</h5>
                                        <div className="col-12 small">
                                            <span>
                                                Disponível em <b>breve</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {(userStatus === "user" || userStatus === "auditor" || userStatus === "consultor") && (

                            <div className="col-12 my-4 fadeItem" id="permissionsSection">
                                <label className="form-label fw-bold">Permissões *</label>
                                <p>Selecione as unidades a que o usuário cadastrado terá acesso</p>
                                <div className="col-12 col-xl-12 ">
                                    <UnityPermissionTable
                                        // unidades={unitsPermissions(unidades, userPermissions, token.userConfig, userStatus)}
                                        users={users}
                                        unidades={unidades}
                                        permissions={permissions}
                                        onChange={value => { setPermissions(value); setForceUpdate(forceUpdate + 1) }}
                                        groups={groups}
                                    />
                                </div>

                                <small className="text-danger error_font_size">{permissionsError}</small>
                            </div>
                        )}



                    </div>

                    {!isMobile() && <hr />}

                    <FixedTopicsBottom >

                        <div className="row">
                            <div className="col-12 d-flex justify-content-end align-items-center">
                                <Link href="/">
                                    <button className="btn btn-sm btn-secondary">Cancelar</button>
                                </Link>

                                {loadingSave ?
                                    <button className="ms-2 btn btn-sm btn-success px-5" disabled><SpinnerSM /></button>
                                    :
                                    <button className="ms-2 btn btn-sm btn-success fadeItem" disabled={handleDisableSave()} onClick={() => handleSave(token.company_id)}>Cadastrar</button>
                                }
                            </div>
                        </div>
                    </FixedTopicsBottom>
                </div>
            }
        </div>
    )
}