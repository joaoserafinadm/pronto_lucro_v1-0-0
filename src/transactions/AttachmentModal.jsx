import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledDropzone from "../components/styledDropzone/StyledDropzone";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { createImageUrl } from "../../utils/createImageUrl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { newData } from "../../store/NewData/NewData.action";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import { showModalBs } from "../../utils/modalControl";
import { useStateContext } from "./context/transactionsContext";



export default function AttachmentModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const dispatch = useDispatch()


    const { incomeSelected } = useStateContext()



    const [files, setFiles] = useState(null)

    const [editMode, setEditMode] = useState(false)

    const [editError, setEditError] = useState('')

    useEffect(() => {

        if (!incomeSelected?.files[0]?.url) setEditMode(true)
        else setEditMode(false)

    }, [incomeSelected?._id])

    useEffect(() => {
        setEditError('')
    }, [files])

    const handleSaveFile = async () => {

        setEditError('')

        let attachment = ''

        if (files) attachment = await createImageUrl([files], 'ATTACHMENTS')

        const data = {
            user_id: token.sub,
            income_id: incomeSelected?._id,
            files: attachment
        };

        await axios.post(`/api/transactions/attachmentEdit`, data)
            .then(res => {
                dispatch(newData(true))
                setEditMode(false)
                setFiles(null)
                // initialValues()
            }).catch(e => {
                showModalBs("attachmentModal")
                setEditError('Ocorreu um erro ao salvar o anexo. Tente novamente mais tarde')
            });

    }



    return (
        <div class="modal fade" id="attachmentModal" tabindex="-1" aria-labelledby="attachmentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="attachmentModalLabel">Anexo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {!editMode ?
                                <div className="col-12">
                                    <img src={incomeSelected?.files[0]?.url} alt="" className="w-100" />
                                </div>
                                :
                                <div>
                                    <div className="col-12 mt-2 d-flex justify-content-between">

                                        <StyledDropzone setFiles={array => { setFiles(array[0]); console.log(array) }} >
                                            <div className="px-2 text-center fadeItem bg-light  py-5 text-secondary rounded " style={{ border: '1px dashed #ccc', width: "100%" }}>
                                                <span>
                                                    Clique aqui ou arraste o arquivo
                                                </span> <br />
                                                <span className="small">
                                                    Permitido apenas um arquivo. Formato: .PNG, .JPG, .PDF.
                                                </span><br />

                                            </div>
                                        </StyledDropzone>

                                    </div>
                                    {files && (
                                        <div className="col-12 mt-2 fadeItem">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12 d-flex">
                                                            <div className="d-flex align-items-center justify-content-center" style={{ width: "40px" }}>
                                                                {files?.type?.startsWith('image/') ?
                                                                    <div>
                                                                        <img src={URL.createObjectURL(files)} className="border border-rounded " height={40} alt="" />
                                                                    </div>
                                                                    :

                                                                    <FontAwesomeIcon icon={faFilePdf} className="fs-3 text-secondary" />
                                                                }

                                                            </div>
                                                            <div className="col">
                                                                <div className="row">
                                                                    <span className="small ms-3 bold">{files.name}</span>
                                                                    <span className="small ms-3 text-secondary">{(files.size / 1000000).toFixed(2)}Mb</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-center" style={{ width: "40px" }}>
                                                                <button
                                                                    type="button"
                                                                    className="btn-close"
                                                                    onClick={() => setFiles(null)}
                                                                    aria-label="Close"
                                                                ></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        {!editMode && (
                            <>
                                <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                                <button className="btn btn-success btn-sm" onClick={() => { setEditMode(true); setFiles(null) }}>
                                    Alterar Anexo
                                </button>
                            </>
                        )}
                        {editMode && (
                            <>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)} data-bs-dismiss={!incomeSelected?.files[0]?.url ? "modal" : ""}>
                                    Cancelar
                                </button>
                                <button className="btn btn-success btn-sm" data-bs-dismiss="modal" disabled={!files} onClick={() => handleSaveFile()} >
                                    Salvar
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}