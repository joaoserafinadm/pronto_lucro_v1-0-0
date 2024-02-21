import { useEffect } from "react";
import Title from "../src/components/title/Title2";
import navbarHide from "../utils/navbarHide.js";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { SpinnerLG, SpinnerSM } from "../src/components/loading/Spinners";
import StyledDropzone from "../src/components/styledDropzone/StyledDropzone";
import CropperImageModal from "../src/companyEdit/CropperImageModal";
import { FixedTopicsBottom, FixedTopicsTop } from "../src/components/fixedTopics";
import scrollTo from "../utils/scrollTo";
import removeInputError from "../utils/removeInputError";
import { createImageUrl } from "../utils/createImageUrl";
import { useRouter } from "next/router";
import { maskCelular, maskCpf } from "../utils/mask";
import EstadosList from "../src/components/estadosList";
import isMobile from "../utils/isMobile";
import { addAlert } from "../store/Alerts/Alerts.actions.js";




export default function EditProfile() {

    const token = jwt.decode(Cookies.get('auth'))
    const dispatch = useDispatch()
    const router = useRouter()
    const alertsArray = useSelector(state => state.alerts)


    //States
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cpf, setCpf] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileImageUrlReview, setProfileImageUrlReview] = useState('')

    //Image crop
    const [selectFile, setSelectFile] = useState(null)


    //Loading 
    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)

    useEffect(() => {
        navbarHide(dispatch)
        dataFunction(token.sub)

    }, [])

    const dataFunction = async (user_id) => {

        await axios.get(`${baseUrl()}/api/editProfile`, {
            params: {
                user_id: user_id
            }
        }).then(res => {
            setLoadingPage(false)

            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setCpf(res.data.cpf)
            setCidade(res.data.cidade)
            setEstado(res.data.estado)
            setEmail(res.data.email)
            setCelular(res.data.celular)
            setProfileImageUrl(res.data.profileImageUrl)

        })
    }


    const handleFileChange = file => {


        if (file) {
            setSelectFile(URL.createObjectURL(file))
            setTimeout(() => {
                var modal = document.getElementById('cropperImageModal')
                var cropperModal = new bootstrap.Modal(modal)
                cropperModal.show()
            }, 20)
        } else {
            return
        }
    }


    const validate = () => {

        removeInputError()

        if (!firstName || !lastName || !celular || !cpf) {
            if (!firstName) document.getElementById("firstNameItem").classList.add('inputError')
            if (!lastName) document.getElementById("lastNameItem").classList.add('inputError')
            if (!celular) document.getElementById("celularItem").classList.add('inputError')
            if (!cpf) document.getElementById("cpfItem").classList.add('inputError')
            scrollTo('pageTop')
            return false
        }
        else return true
    }

    const handleSave = async (company_id) => {

        setLoadingSave(true)

        const isValid = validate()

        if (isValid) {

            const blobFile = profileImageUrlReview ? await fetch(profileImageUrlReview).then(r => r.blob()) : '';

            const newProfileImage = profileImageUrlReview ? await createImageUrl([blobFile], "PROFILE_IMAGES").url : ''

            await axios.patch(`${baseUrl()}/api/editProfile`, {
                token: token,
                company_id,
                user_id: token.sub,
                profileImageUrl: newProfileImage ? newProfileImage[0].url : profileImageUrl,
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

                router.push('/')
                setLoadingSave(false)

            }).catch(e => {
                setLoadingSave(false)

            })

        }

    }


    return (
        <div id="pageTop">
            <Title title={'Editar Perfil'} backButton='/' />
            {loadingPage ?
                <SpinnerLG />
                :
                <>
                    <div className="pagesContent-sm shadow fadeItem ">

                        <div className="col-12 ">

                            <div className="row">
                                <div className="d-flex justify-content-between">
                                    <input type="file" name="image/*" id="logoItem" accept="image/*" onChange={e => handleFileChange(e.target.files[0])}
                                        className="form-input" hidden />
                                    <label className=" fw-bold">Imagem de perfil</label>
                                    <label htmlFor="logoItem" className="span" type='button'>Editar</label>
                                </div>
                                <StyledDropzone setFiles={array => { handleFileChange(array[0]) }} img>
                                    <div className="row mt-3 d-flex justify-content-center align-items-center" style={{ height: '150px' }}>

                                        <div className="col-12 d-flex justify-content-center align-items-center" >
                                            {profileImageUrlReview ?
                                                <img src={profileImageUrlReview} alt="logo" id="logoItem" className="editProfileImage fadeItem" />
                                                :
                                                <>
                                                    {profileImageUrl ?
                                                        <img src={profileImageUrl} alt="logo" id="logoItem" className="editProfileImage fadeItem" />
                                                        :
                                                        <img src="https://res.cloudinary.com/co2blue/image/upload/v1707242679/co2blue_profile_images/default-user-icon_bnrrug.jpg"
                                                            alt="" className="editProfileImage"
                                                            type="button" />
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                </StyledDropzone>

                            </div>
                        </div>
                        <div className="row mt-3">
                            <label for="firstNameItem" className="form-label fw-bold">Identificação*</label>
                            <div className="col-12 col-lg-4 my-2">
                                <label for="firstNameItem" className=" ">Nome*</label>
                                <input type="text" className="form-control" id="firstNameItem" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-12 col-lg-4 my-2">
                                <label for="lastNameItem" className=" ">Sobrenome*</label>
                                <input type="text" className="form-control" id="lastNameItem" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-12 col-lg-4 my-2">
                                <label for="cpfItem" className=" ">CPF*</label>
                                <input type="text" className="form-control" id="cpfItem" value={maskCpf(cpf)} onChange={e => setCpf(e.target.value)} placeholder="" />
                            </div>
                            <div className="d-flex col-12 my-2">

                                <div className="col-9 pe-4">
                                    <label for="cidadeItem" className=" ">Cidade</label>
                                    <input type="text" className="form-control" id="cidadeItem" value={cidade} onChange={e => setCidade(e.target.value)} placeholder="" />
                                </div>
                                <div className="col-3">
                                    <label for="estadoItem" className=" ">Estado</label>
                                    <select name="estadoItem" className="form-select" value={estado} onChange={e => setEstado(e.target.value)} placeholder="UF" id="estadoItem">
                                        <EstadosList />
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <label for="emailItem" className=" fw-bold">Contato</label>
                            <div className="col-12 d-flex justify-content-between flex-wrap">

                                <div className="col-12 col-xl-6 pe-xl-2 my-2">
                                    <label for="emailItem" className=" ">E-mail</label>
                                    <input type="text" className="form-control" id="emailItem" value={email} placeholder="" disabled />
                                </div>
                                <div className="col-12 col-xl-6 ps-xl-3 my-2">
                                    <label for="celularItem" className=" ">Celular*</label>
                                    <input type="text" className="form-control" id="celularItem" value={maskCelular(celular)} onChange={e => setCelular(e.target.value)} placeholder="" />
                                </div>
                            </div>
                        </div>
                        {
                            !isMobile() &&
                            <hr />
                        }
                        <FixedTopicsBottom >
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end">
                                    <Link href="/">

                                        <button className="btn btn-sm btn-secondary">Cancelar</button>
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



                    <CropperImageModal selectFile={selectFile} setResult={value => setProfileImageUrlReview(value)} aspect={1} />

                </>

            }
        </div >
    )
}