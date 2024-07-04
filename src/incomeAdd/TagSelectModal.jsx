import { useEffect, useState } from "react"
import Modal, { hideModal } from "../components/Modal"
import NewTagAdd from "./NewTagAdd"
import TagSelect from "./TagSelect"



export default function TagSelectModal(props) {

    const { tags, setTagSelected, dataFunction } = props

    const [section, setSection] = useState('')





    return (
        <Modal id='tagSelectModal' size='modal-md'>

            <div className="modal-header">
                <h5 className="modal-title title-dark" id="tagSelectModalLabel">
                    Selecione o marcador
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => hideModal('tagSelectModal')}
                    aria-label="Close"
                ></button>
            </div>
                {section === 'tagAdd' ?
                    <NewTagAdd tags={tags} setSection={setSection} setTagSelected={setTagSelected} dataFunction={dataFunction} />
                    :
                    <TagSelect tags={tags} setSection={setSection} setTagSelected={setTagSelected} />
                }




        </Modal>
    )

}