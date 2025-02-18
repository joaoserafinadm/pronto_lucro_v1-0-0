import { useEffect } from "react";
import Title from "../src/components/title/Title2.jsx";
import navbarHide from "../utils/navbarHide.js";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import baseUrl from "../utils/baseUrl.js";
import { SpinnerLG, SpinnerSM } from "../src/components/loading/Spinners.jsx";
import StyledDropzone from "../src/components/styledDropzone/StyledDropzone.jsx";
import CropperImageModal from "../src/companyEdit/CropperImageModal.jsx";
import { FixedTopicsBottom, FixedTopicsTop } from "../src/components/fixedTopics/index.jsx";
import scrollTo from "../utils/scrollTo.js";
import removeInputError from "../utils/removeInputError.js";
import { createImageUrl } from "../utils/createImageUrl.js";
import { useRouter } from "next/router";
import { maskCelular, maskCpf } from "../utils/mask.js";
import EstadosList from "../src/components/estadosList/index.jsx";
import isMobile from "../utils/isMobile.js";
import { addAlert } from "../store/Alerts/Alerts.actions.js";
import MyProfilePage from "../src/editProfile/MyProfilePage.jsx";
import Sections from "../src/components/Sections/index.jsx";
import MyCompanyPage from "../src/editProfile/MyCompanyPage.jsx";







export default function EditProfile() {

    const token = jwt.decode(Cookies.get('auth'))
    const dispatch = useDispatch()
    const router = useRouter()
    const alertsArray = useSelector(state => state.alerts)

    const pageSection = router.query.section


    const [section, setSection] = useState('Meu perfil')

    //Profile
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cpf, setCpf] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileImageUrlReview, setProfileImageUrlReview] = useState('')

    //Company
    const [companyName, setCompanyName] = useState('')
    const [companyLogo, setCompanyLogo] = useState('')
    const [cnpjPrincipal, setCnpjPrincipal] = useState('')
    const [companyCep, setCompanyCep] = useState('')
    const [companyBairro, setCompanyBairro] = useState('')
    const [companyLogradouro, setCompanyLogradouro] = useState('')
    const [companyNumero, setCompanyNumero] = useState('')
    const [companyCidade, setCompanyCidade] = useState('')
    const [companyEstado, setCompanyEstado] = useState('')
    const [logoImageUrlReview, setlogoImageUrlReview] = useState('')
    const [setorPrimario, setSetorPrimario] = useState('')
    const [setorSecundario, setSetorSecundario] = useState('')
    const [outroSetorSec, setOutroSetorSec] = useState('')
    const [companyCategory, setCompanyCategory] = useState('')
    const [regimeTributario, setRegimeTributario] = useState('')


    //Image crop
    const [selectFile, setSelectFile] = useState(null)
    const [selectCompanyFile, setSelectCompanyFile] = useState(null)


    //Loading 
    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)

    useEffect(() => {
        navbarHide(dispatch)
        dataFunction(token.sub)

    }, [])

    useEffect(() => {
        pageSection && setSection(pageSection)
    }, [pageSection])

    const dataFunction = async (user_id) => {

        await axios.get(`${baseUrl()}/api/editProfile`, {
            params: {
                user_id: user_id
            }
        }).then(res => {
            setLoadingPage(false)

            const companyData = res.data.companyData

            console.log("res.data?.profileImageUrl?.url", res.data?.profileImageUrl?.url)

            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setCpf(res.data.cpf)
            setCidade(res.data.cidade)
            setEstado(res.data.estado)
            setEmail(res.data.email)
            setCelular(res.data.celular)
            setProfileImageUrl(res.data?.profileImageUrl?.url ? res.data?.profileImageUrl?.url : res.data.profileImageUrl)
            setCompanyName(companyData?.companyName)
            setCompanyLogo(companyData?.companyLogo?.url ? companyData?.companyLogo?.url : companyData?.companyLogo)
            setCnpjPrincipal(companyData?.cnpjPrincipal)
            setCompanyCep(companyData?.cep)
            setCompanyBairro(companyData?.bairro)
            setCompanyLogradouro(companyData?.logradouro)
            setCompanyNumero(companyData?.numero)
            setCompanyCidade(companyData?.cidade)
            setCompanyEstado(companyData?.estado)
            setSetorPrimario(companyData?.setorPrimario)
            setSetorSecundario(companyData?.setorSecundario)
            setOutroSetorSec(companyData?.outroSetorSec)
            setCompanyCategory(companyData?.companyCategory)
            setRegimeTributario(companyData?.regimeTributario)
        })
    }





    const profileValidate = () => {

        removeInputError()

        // if (!firstName || !lastName || !celular || !cpf) {
        //     if (!firstName) document.getElementById("firstNameItem").classList.add('inputError')
        //     if (!lastName) document.getElementById("lastNameItem").classList.add('inputError')
        //     if (!celular) document.getElementById("celularItem").classList.add('inputError')
        //     if (!cpf) document.getElementById("cpfItem").classList.add('inputError')
        //     scrollTo('pageTop')
        //     return false
        // }
        // else return true

        return true
    }

    const companyValidate = () => {

        // removeInputError()

        // if (!firstName || !lastName || !celular || !cpf) {
        //     if (!firstName) document.getElementById("firstNameItem").classList.add('inputError')
        //     if (!lastName) document.getElementById("lastNameItem").classList.add('inputError')
        //     if (!celular) document.getElementById("celularItem").classList.add('inputError')
        //     if (!cpf) document.getElementById("cpfItem").classList.add('inputError')
        //     scrollTo('pageTop')
        //     return false
        // }

        // else return true


        return true
    }

    const handleSave = async (company_id) => {

        setLoadingSave(true)


        if (section === 'Meu perfil') {

            const profileIsValid = profileValidate()

            if (profileIsValid) {


                const blobFile = profileImageUrlReview ? await fetch(profileImageUrlReview).then(r => r.blob()) : '';

                const newProfileImage = profileImageUrlReview ? await createImageUrl([blobFile], "PRONTOLUCRO_PROFILE_IMAGES") : ''

                console.log("newProfileImage", profileImageUrlReview, blobFile, newProfileImage)

                await axios.patch(`${baseUrl()}/api/editProfile`, {
                    token: token,
                    user_id: token.sub,
                    profileImageUrl: newProfileImage ? newProfileImage[0] : profileImageUrl,
                    firstName,
                    lastName,
                    cpf,
                    cidade,
                    estado,
                    celular
                }).then(res => {
                    localStorage.setItem('auth', (Cookies.get('auth')))

                    const alert = {
                        type: 'alert',
                        message: 'Perfil atualizado.',
                    }

                    dispatch(addAlert(alertsArray, [alert]))

                    router.reload()

                    setLoadingSave(false)

                }).catch(e => {
                    setLoadingSave(false)

                })
            }
        }


        if (section === 'Minha empresa') {

            const companyIsValid = companyValidate()

            if (companyIsValid) {

                const blobFile = logoImageUrlReview ? await fetch(logoImageUrlReview).then(r => r.blob()) : '';

                const newProfileImage = logoImageUrlReview ? await createImageUrl([blobFile], "PRONTOLUCRO_LOGOS") : ''

                const companyData = {
                    companyName,
                    companyLogo: newProfileImage ? newProfileImage[0] : companyLogo,
                    cnpjPrincipal,
                    cep: companyCep,
                    bairro: companyBairro,
                    logradouro: companyLogradouro,
                    numero: companyNumero,
                    cidade: companyCidade,
                    estado: companyEstado,
                    setorPrimario,
                    setorSecundario,
                    outroSetorSec,
                    companyCategory,
                    regimeTributario
                }


                await axios.patch(`${baseUrl()}/api/editProfile/companyUpdate`, {
                    token: token,
                    user_id: token.sub,
                    companyData
                }).then(res => {
                    localStorage.setItem('auth', (Cookies.get('auth')))

                    const alert = {
                        type: 'alert',
                        message: 'Informações atualizadas.',
                    }

                    dispatch(addAlert(alertsArray, [alert]))
                    router.reload()


                    setLoadingSave(false)

                }).catch(e => {
                    setLoadingSave(false)

                })

            }

        }

    }


    return (
        <div id="pageTop">
            <Title title={'Meu Perfil'} backButton='/' subtitle='Mantenha o seu perfil atualizado' />
            {loadingPage ?
                <SpinnerLG />
                :
                <>
                    <div className="pagesContent shadow fadeItem ">
                        <div className="row">
                            <div className="col-12 ">
                                <div className=" carousel slide  " data-bs-touch="false" data-bs-interval='false' id="accoutSetupPages">

                                    <Sections section={section} idTarget="accoutSetupPages"
                                        setSection={value => setSection(value)}
                                        sections={["Meu perfil", "Minha empresa"]} />


                                    <div className="carousel-inner ">
                                        <div className="carousel-item active">
                                            <MyProfilePage
                                                firstName={firstName}
                                                setFirstName={setFirstName}
                                                lastName={lastName}
                                                setLastName={setLastName}
                                                cpf={cpf}
                                                setCpf={setCpf}
                                                cidade={cidade}
                                                setCidade={setCidade}
                                                estado={estado}
                                                setEstado={setEstado}
                                                email={email}
                                                setEmail={setEmail}
                                                celular={celular}
                                                setCelular={setCelular}
                                                profileImageUrl={profileImageUrl}
                                                setProfileImageUrl={setProfileImageUrl}
                                                profileImageUrlReview={profileImageUrlReview}
                                                setProfileImageUrlReview={setProfileImageUrlReview}
                                                selectFile={selectFile}
                                                setSelectFile={setSelectFile}
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <MyCompanyPage
                                                companyName={companyName}
                                                setCompanyName={setCompanyName}
                                                companyLogo={companyLogo}
                                                setCompanyLogo={setCompanyLogo}
                                                cnpjPrincipal={cnpjPrincipal}
                                                setCnpjPrincipal={setCnpjPrincipal}
                                                companyCep={companyCep}
                                                setCompanyCep={setCompanyCep}
                                                companyBairro={companyBairro}
                                                setCompanyBairro={setCompanyBairro}
                                                companyLogradouro={companyLogradouro}
                                                setCompanyLogradouro={setCompanyLogradouro}
                                                companyNumero={companyNumero}
                                                setCompanyNumero={setCompanyNumero}
                                                companyCidade={companyCidade}
                                                setCompanyCidade={setCompanyCidade}
                                                companyEstado={companyEstado}
                                                setCompanyEstado={setCompanyEstado}
                                                selectCompanyFile={selectCompanyFile}
                                                setSelectCompanyFile={setSelectCompanyFile}
                                                logoImageUrlReview={logoImageUrlReview}
                                                setlogoImageUrlReview={setlogoImageUrlReview}
                                                setorPrimario={setorPrimario}
                                                setSetorPrimario={setSetorPrimario}
                                                setorSecundario={setorSecundario}
                                                setSetorSecundario={setSetorSecundario}
                                                outroSetorSec={outroSetorSec}
                                                setOutroSetorSec={setOutroSetorSec}
                                                companyCategory={companyCategory}
                                                setCompanyCategory={setCompanyCategory}
                                                regimeTributario={regimeTributario}
                                                setRegimeTributario={setRegimeTributario}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <FixedTopicsBottom >
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-end">
                                        <Link href="/">

                                            <button className="btn btn-sm btn-secondary">Voltar</button>
                                        </Link>
                                        {loadingSave ?
                                            <button className="ms-2 btn btn-sm btn-success px-4" disabled><SpinnerSM /></button>
                                            :
                                            <button className="ms-2 btn btn-sm btn-success" onClick={() => handleSave(token.company_id)}>Salvar</button>
                                        }
                                    </div>
                                </div>

                            </FixedTopicsBottom>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}