import { useState } from "react"
import EstadosList from "../components/estadosList"
import StyledDropzone from "../components/styledDropzone/StyledDropzone"
import { maskCelular, maskCpf } from "../../utils/mask"
import CropperImageModal from "../companyEdit/CropperImageModal"
import { FixedTopicsBottom } from "../components/fixedTopics"
import Link from "next/link"
import { SpinnerSM } from "../components/loading/Spinners"



export default function MyProfilePage(props) {

    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        cpf,
        setCpf,
        cidade,
        setCidade,
        estado,
        setEstado,
        email,
        setEmail,
        celular,
        setCelular,
        profileImageUrl,
        setProfileImageUrl,
        profileImageUrlReview,
        setProfileImageUrlReview,
        selectFile,
        setSelectFile
    } = props







    const handleFileChange = file => {


        if (file) {
            setSelectFile(URL.createObjectURL(file))
            setTimeout(() => {
                var modal = document.getElementById('cropperProfileImageModal')
                var cropperModal = new bootstrap.Modal(modal)
                cropperModal.show()
            }, 20)
        } else {
            return
        }
    }





    return (
        <>

            <CropperImageModal id='cropperProfileImageModal' selectFile={selectFile} setResult={value => setProfileImageUrlReview(value)} aspect={1} />




            <div className="row">
                <div className="col-12 ">

                    <div className="d-flex justify-content-between">
                        <input type="file" name="image/*" id="profileImageItem" accept="image/*" onChange={e => handleFileChange(e.target.files[0])}
                            className="form-input" hidden />
                        <label className=" fw-bold">Imagem de perfil</label>
                        <label htmlFor="profileImageItem" className="span" type='button'>Editar</label>
                    </div>
                    <StyledDropzone setFiles={array => { handleFileChange(array[0]) }} img>
                        <div className="row mt-3 d-flex justify-content-center align-items-center" style={{ height: '150px' }}>

                            <div className="col-12 d-flex justify-content-center align-items-center" >
                                {profileImageUrlReview ?
                                    <img src={profileImageUrlReview} alt="logo" id="profileImageItem" className="editProfileImage fadeItem" />
                                    :
                                    <>
                                        {profileImageUrl ?
                                            <img src={profileImageUrl} alt="logo" id="profileImageItem" className="editProfileImage fadeItem" />
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

            <hr className="d-none d-lg-block" />

        </>

    )
}