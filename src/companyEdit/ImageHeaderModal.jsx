import { faBars, faDownload, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { createImageUrl } from "../../utils/createImageUrl"
import axios from "axios"
import baseUrl from "../../utils/baseUrl"
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import tippy from "tippy.js"
import { useEffect } from "react"



export default function ImageHeaderModal(props) {

    const token = jwt.decode(Cookies.get("auth"));

    const [headerImgPreview, setHeaderImgPreview] = useState('')

    useEffect(() => {

        setTimeout(() => {
            tooltipFunction()
        }, 500)

    }, [])

    const tooltipFunction = () => {

        tippy('#addHeaderImagBtn', {
            content: "Adicionar foto de capa",
            placement: "bottom",
        })

    }


    const handleUploadImage = async (company_id, file) => {


        const newHeaderImgUrl = await createImageUrl([file], "AVALIAIMOBI_HEADER_IMG")

        const data = {
            company_id: company_id,
            user_id: token.sub,
            imageUrl: newHeaderImgUrl[0].url
        }

        await axios.post(`${baseUrl()}/api/companyEdit/headerImg`, data)
            .then(res => {
                props.backgroundImagesData()
                setHeaderImgPreview(res.data.newId)
            }).catch(e => {

            })


    }


    const handleDeleteImg = async (company_id, id) => {

        if (headerImgPreview === id) {
            setHeaderImgPreview('')
        }


        await axios.delete(`${baseUrl()}/api/companyEdit/headerImg`, {
            params: {
                company_id,
                backgroundImg_id: id
            }
        }).then(res => {
            props.backgroundImagesData()
        })

    }

    return (
        <div class="modal fade" id="ImageHeaderModal" tabindex="-1" aria-labelledby="ImageHeaderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title-dark" id="ImageHeaderModalLabel">Imagem de capa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="col-12">

                            <span className="">Selecione um dos modelos pré-definidos ou importe uma imagem de capa personalizada. Esta imagem será usada em seu cartão de visitas e nas suas apresentações.</span>
                        </div>
                        <div className="row d-flex justify-content-center">

                            {props.backgroundImages.map((elem, index) => {
                                return (
                                    <div className="col-12 col-md-6 d-flex justify-content-center">



                                        <img
                                            src={elem.imageUrl} onClick={() => setHeaderImgPreview(elem._id)}
                                            className={` m-2 p-2  rounded justify-content-center align-items-center cardAnimation headerImgEdit ${headerImgPreview === elem._id ? 'border border-3 border-selected ' : ''}`} alt="" type="button" />

                                        <div className="dropdown">
                                            <button
                                                className="btn btn-light btn-sm  mt-2"
                                                type="button"
                                                id="downloadDropdownButton"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <FontAwesomeIcon icon={faBars} className="icon" />
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="downloadDropdownButton">
                                                <li>
                                                    <button onClick={() => setHeaderImgPreview(elem._id)}
                                                        className="dropdown-item">
                                                        Selecionar
                                                    </button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleDeleteImg(token.company_id, elem._id)}
                                                        className="dropdown-item text-danger">
                                                        Deletar
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                            <input type="file" name="image/*" id="headerItem" accept="image/*"
                                className="form-input" hidden onChange={e => handleUploadImage(token.company_id, e.target.files[0])} />
                            <div className="col-12 col-md-6 d-flex justify-content-center">

                                <label type="button" htmlFor="headerItem" id="addHeaderImagBtn"
                                    className=" card  m-2 p-2  rounded justify-content-center align-items-center cardAnimation " style={{ width: "300px", height: "150px" }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="icon  " />
                                </label>

                            </div>
                        </div>



                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-orange btn-sm" data-bs-dismiss="modal" onClick={() => props.setBackgroundImg_id(headerImgPreview)}>Selecionar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}