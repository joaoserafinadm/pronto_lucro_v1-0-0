import Title from "../src/components/title/Title2";
import { useEffect, useState } from "react";
import { SpinnerSM, SpinnerLG } from "../src/components/loading/Spinners";
import isMobile from "../utils/isMobile";
import { FixedTopicsBottom } from "../src/components/fixedTopics";
import Link from "next/link";
import StyledDropzone from "../src/components/styledDropzone/StyledDropzone";
import EstadosList from "../src/components/estadosList";
import CropperImageModal from "../src/companyEdit/CropperImageModal";
import styles from "../src/companyEdit/index.module.scss";
import { maskCnpj, maskBloco, maskCep, maskNumero } from "../utils/mask";
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import Router from 'next/router'
import scrollTo from "../utils/scrollTo";
import removeInputError from "../utils/removeInputError";
import { createImageUrl } from "../utils/createImageUrl";
import { useDispatch, useSelector } from "react-redux";
import navbarHide from "../utils/navbarHide";
import { addAlert } from "../store/Alerts/Alerts.actions";




export default function CompanyEdit() {

    const token = jwt.decode(Cookie.get('auth'))
    const dispatch = useDispatch()
    const alertsArray = useSelector(state => state.alerts)

    //Loading 
    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)

    //States
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileImageUrlReview, setProfileImageUrlReview] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [cnpjPrincipal, setCnpjPrincipal] = useState('')
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [email, setEmail] = useState('')
    const [blocoProdutorRural, setBlocoProdutorRural] = useState('')


    //Error states
    const [companyNameError, setCompanyNameError] = useState('')
    const [cnpjPrincipalError, setCnpjPrincipalError] = useState('')
    const [cidadeError, setCidadeError] = useState('')
    const [estadoError, setEstadoError] = useState('')
    const [responsavelError, setResponsavelError] = useState('')
    const [emailError, setEmailError] = useState('')

    //Page elements
    const [cnpjPrincipalOption, setCnpjPrincipalOption] = useState(true)

    //Image crop
    const [selectFile, setSelectFile] = useState(null)


    useEffect(() => {
        navbarHide(dispatch)

        if (token.company_id) {
            dataFunction(token.company_id, token.userStatus)
        } else {
            setLoading(false)
        }
    }, [])

    const dataFunction = async () => {

        await axios.get(`${baseUrl()}/api/companyEdit`, {
            params: {
                company_id: token.company_id
            }
        }).then(res => {
            setCompanyName(res.data.companyName)
            setProfileImageUrl(res.data.profileImageUrl)
            setCnpjPrincipal(res.data.cnpjPrincipal)
            setBlocoProdutorRural(res.data.blocoProdutorRural)
            setCep(res.data.cep)
            setLogradouro(res.data.logradouro)
            setNumero(res.data.numero)
            setCidade(res.data.cidade)
            setEstado(res.data.estado)
            setResponsavel(res.data.responsavel)
            setEmail(res.data.email)
            setLoadingPage(false)
        }).catch(e => {
            console.log(e)
        })
    }




    const handleSave = async (company_id) => {

        setLoadingSave(true)

        const isValid = validate()

        if (isValid) {

            const blobFile = profileImageUrlReview ? await fetch(profileImageUrlReview).then(r => r.blob()) : '';

            const imageUrl = profileImageUrlReview ? await createImageUrl([blobFile], "LOGO_IMAGES") : profileImageUrl

            const data = {
                token: token,
                company_id: company_id,
                companyName,
                profileImageUrl: imageUrl[0]?.url ? imageUrl[0]?.url : '',
                user_id: token.sub,
                cnpjPrincipal,
                blocoProdutorRural,
                cep,
                logradouro,
                numero,
                cidade,
                estado,
                responsavel,
                email,
            }

            await axios.patch(`${baseUrl()}/api/companyEdit`, data)
                .then(async res => {
                    
                    const alert = {
                        type: 'alert',
                        message: 'Instituição atualizada com sucesso.',
                    }

                    dispatch(addAlert(alertsArray, [alert]))

                    Router.push('/')
                    setLoadingSave(false)
                }).catch(e => {
                    setCompanyNameError('Houve um problema na atualização dos dados da instituição')
                    setLoadingSave(false)
                })
        } else {
            setLoadingSave(false)

        }


    }

    const onBlurCep = (event) => {

        const { value } = event.target

        const cep = value?.replace(/[^0-9]/g, '');

        if (cep?.length !== 8) {
            return;
        }

        axios.get(`https://viacep.com.br/ws/${value}/json/`)
            .then(res => {

                const data = res.data

                setLogradouro(data.logradouro)
                setCidade(data.localidade)
                setEstado(data.uf)
            })
    }

    const validate = () => {

        removeInputError()

        setCompanyNameError('')
        setCnpjPrincipalError('')
        setCidadeError('')
        setEstadoError('')
        setResponsavelError('')
        setEmailError('')

        let companyNameError = ''
        let cnpjPrincipalError = ''
        let cidadeError = ''
        let estadoError = ''
        let responsavelError = ''
        let emailError = ''


        if (!companyName) companyNameError = '* Campo obrigatório'
        if (!cnpjPrincipal && !blocoProdutorRural) cnpjPrincipalError = '* Campo obrigatório'
        if (!cidade) cidadeError = '* Campo obrigatório'
        if (!estado) estadoError = '* Campo obrigatório'
        if (!responsavel) responsavelError = '* Campo obrigatório'
        if (!email) emailError = '* Campo obrigatório'



        if (companyNameError || cnpjPrincipalError || cidadeError || estadoError || responsavelError || emailError) {
            if (companyNameError) { setCompanyNameError(companyNameError); document.getElementById("companyNameInput").classList.add('inputError') }
            if (cnpjPrincipalError) { setCnpjPrincipalError(cnpjPrincipalError); document.getElementById("cnpjPrincipalInput").classList.add('inputError') }
            if (cidadeError) { setCidadeError(cidadeError); document.getElementById("cidadeInput").classList.add('inputError') }
            if (estadoError) { setEstadoError(estadoError); document.getElementById("estadoInput").classList.add('inputError') }
            if (responsavelError) { setResponsavelError(responsavelError); document.getElementById("responsavelInput").classList.add('inputError') }
            if (emailError) { setEmailError(emailError); document.getElementById("emailInput").classList.add('inputError') }
            scrollTo('pageTop')
            return false
        } else {
            return true
        }
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



    return (
        <div id="pageTop">
            <Title title={'Editar Instituição'} backButton='/' />
            {loadingPage ?
                <SpinnerLG />
                :
                <>

                    <div className="pagesContent-sm shadow fadeItem">
                        <div className="row d-flex justify-content-center overflow-auto ">
                            <div className="col-12 col-md-12 ">
                                <div className="row">
                                    <div className="d-flex justify-content-between">
                                        <input type="file" name="image/*" id="logoItem" accept="image/*" onChange={e => handleFileChange(e.target.files[0])}
                                            className="form-input" hidden />
                                        <label className="form-label fw-bold">Logotipo da Instituição</label>
                                        <label htmlFor="logoItem" className="form-label span" type='button'>Editar</label>
                                    </div>
                                    <StyledDropzone setFiles={array => { handleFileChange(array[0]) }} img>
                                        <div className="row mt-3 d-flex justify-content-center align-items-center" style={{ height: '150px' }}>

                                            <div className="col-12 d-flex justify-content-center align-items-center" >
                                                {profileImageUrlReview ?
                                                    <img src={profileImageUrlReview} alt="logo" id="logoItem" className={`${styles.companyLogo} fadeItem`} />
                                                    :
                                                    <>
                                                        {profileImageUrl ?
                                                            <img src={profileImageUrl} alt="logo" id="logoItem" className={`${styles.companyLogo} fadeItem`} />
                                                            :
                                                            <img src="https://res.cloudinary.com/co2blue/image/upload/v1707401711/co2blue_profile_images/company_logo_default_qda7fo.png"
                                                                alt="" className={`${styles.companyLogo} fadeItem`}
                                                                type="button" />
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </StyledDropzone>
                                </div>
                                <div className="row mb-2 mt-4">
                                    <label for="companyNameItem" className="form-label fw-bold">Dados Cadastrais</label>
                                    <div className="col-12">
                                        <label for="companyNameItem" className=" ">Nome da Instituição*</label>
                                        <input type="text" className="form-control" id="companyNameInput" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="" />
                                        <small className="text-danger error_font_size">{companyNameError}</small>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="row d-flex-inline mb-2">
                                        <div className="col-12 col-md-6">
                                            <div className="form-check form-switch fadeItem">
                                                <input type="radio" role="switch" className="form-check-input" name="cnpjPrincipalOption" onClick={() => { setCnpjPrincipalOption(true) }} checked={cnpjPrincipalOption} />
                                                <label for="cnpjPrincipal" className="" disabled>CNPJ Principal{cnpjPrincipalOption && (<>*</>)}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-check form-switch fadeItem">
                                                <input type="radio" role="switch" className="form-check-input" name="cnpjPrincipalOption" onClick={() => { setCnpjPrincipalOption(false) }} />
                                                <label for="blocoProdutorRural" className="">Bloco do Produtor Rural{!cnpjPrincipalOption && (<>*</>)}</label>
                                            </div>
                                        </div>
                                    </div>
                                    {cnpjPrincipalOption ?
                                        <div className="col-12 col-md-6">
                                            <input type="text" className="form-control fadeItem"
                                                name="cnpjPrincipal" value={maskCnpj(cnpjPrincipal)} id="cnpjPrincipalInput"
                                                onChange={e => setCnpjPrincipal(e.target.value)} placeholder={isMobile() && 'CNPJ'} />
                                            <small className="text-danger error_font_size">{cnpjPrincipalError}</small>
                                        </div>
                                        :
                                        <div className="row px-0 m-0">
                                            <div className="col-12 col-md-6">

                                            </div>
                                            <div className="col-12 col-md-6 ps-md-0 m-0">
                                                <input type="text" className="form-control fadeItem"
                                                    name="blocoProdutorRural" value={maskBloco(blocoProdutorRural)} id="blocoProdutorRuralInput"
                                                    onChange={e => setBlocoProdutorRural(e.target.value)} placeholder={isMobile() && 'Bloco do Produtor Rural'} />
                                                <small className="text-danger error_font_size">{cnpjPrincipalError}</small>
                                            </div>

                                        </div>

                                    }
                                </div>

                                <div className="row">
                                    <label for="cepItem" className="form-label fw-bold mb-1 mt-4">Endereço</label>
                                    <div className="col-xl-2 col-6 pe-xl-1 my-1">
                                        <label for="cepInput" className=" ">CEP</label>
                                        <input type="text" className="form-control" id="cepInput" value={maskCep(cep)}
                                            onChange={e => setCep(e.target.value)} placeholder=""
                                            onBlur={e => onBlurCep(e)} />
                                    </div>
                                    <div className="col-xl-3 col-6 px-xl-1 my-1">
                                        <label for="cidadeInput" className=" ">Cidade*</label>
                                        <input type="text" className="form-control" id="cidadeInput" value={cidade} onChange={e => setCidade(e.target.value)} placeholder="" />
                                        <small className="text-danger error_font_size">{cidadeError}</small>
                                    </div>
                                    <div className="col-xl-4 col-12 px-xl-1 my-1">
                                        <label for="logradouroInput" className=" ">Logradouro</label>
                                        <input type="text" className="form-control" id="logradouroInput" value={logradouro} onChange={e => setLogradouro(e.target.value)} placeholder="" />
                                    </div>
                                    <div className="col-xl-2 col-6 px-xl-1 my-1">
                                        <label for="numeroInput" className=" ">Número</label>
                                        <input type="text" className="form-control" id="numeroInput" value={maskNumero(numero)} onChange={e => setNumero(e.target.value)} placeholder="" />
                                    </div>
                                    <div className="col-xl-1 col-6 ps-xl-1 my-1">
                                        <label for="estadoInput" className=" ">Estado*</label>
                                        {/* <input type="text" className="form-control"  value={estado} onChange={e => setEstado(e.target.value)} placeholder="" /> */}
                                        <select name="estadoInput" className="form-select" value={estado} onChange={e => setEstado(e.target.value)} placeholder="UF" id="estadoInput">
                                            <EstadosList />
                                        </select>
                                        <small className="text-danger error_font_size">{estadoError}</small>
                                    </div>

                                </div>
                                <div className="col-12">
                                    <label for="responsavelInput" className="form-label fw-bold mb-1 mt-4">Responsável pelo Inventário</label>
                                    <div className="col d-flex flex-wrap">
                                        <div className="col-xl-6 col-12 pe-xl-1 my-1">
                                            <label for="responsavelInput" className=" ">Nome do Responsável*</label>
                                            <input type="text" className="form-control" id="responsavelInput" value={responsavel} onChange={e => setResponsavel(e.target.value)} placeholder="" />
                                            <small className="text-danger error_font_size">{responsavelError}</small>
                                        </div>
                                        <div className="col-xl-6 col-12 ps-xl-1 my-1">
                                            <label htmlFor="emailInput" className=" ">Email para contato*</label>
                                            <input type="text" className="form-control" id="emailInput" value={email} onChange={e => setEmail(e.target.value)} placeholder="" />
                                            <small className="text-danger error_font_size">{emailError}</small>
                                        </div>
                                    </div>
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

                    <CropperImageModal selectFile={selectFile} setResult={value => setProfileImageUrlReview(value)} aspect={false} />
                </>
            }
        </div>
    )
}