import { useEffect, useState } from "react"
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faInfo,
} from '@fortawesome/free-solid-svg-icons'
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");

}


export default function CompanyLogo(props) {

    const [fileInputState, setFileInputState] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSorce] = useState(null)

    useEffect(() => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        })
    }, [])

    useEffect(() => {

        props.onChange(previewSource)
    }, [previewSource])

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {

        console.log("filefile", file)
        const reader = new FileReader()
        if (reader) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setPreviewSorce(reader.result)
                console.log("reader", reader.result)
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    {previewSource && (
                        <img src={previewSource} alt="chosen" height={70} className="fluid-image" />
                    )}
                    {!previewSource && (
                        <>
                            {
                                props.data ?
                                    <img src={props.data} alt="Company logo" className="fadeItem" style={{ "max-height": "70px", "max-width": "250px" }} />
                                    :
                                    <h5 className="h5_title">Logo da Instituição</h5>
                            }
                        </>
                    )
                    }

                </div>
            </div>

            <div className="row mt-3">
                <div className="d-flex justify-content-center">
                    <input type="file" name="image/*" id="inputButton" accept="image/*" onChange={handleFileInputChange}
                        value={fileInputState} className="form-input" hidden />
                    <label htmlFor="inputButton" className="btn btn-secondary btn-sm text-nowrap" type="button">Alterar Imagem</label>
                    <div className="d-flex align-items-center">
                        {/* <span
                            className="badge rounded-pill bg-success"
                            tabIndex="0" role="button" data-bs-toggle="popover" data-bs-trigger="focus"
                            data-bs-html="true" data-bs-placement="bottom"
                            data-bs-content="Remova o funda da imagem neste <a href='https://www.remove.bg/pt-br' target='_blank' title='Remover fundo da imagem'>link</a>">
                            <FontAwesomeIcon icon={faInfo} className="text-light" />
                        </span> */}
                    </div>

                </div>
            </div >
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    {/* <small><small>Utilizar imagem de no máximo 500 kb</small></small> */}
                </div>
            </div>

        </div >

    )
}