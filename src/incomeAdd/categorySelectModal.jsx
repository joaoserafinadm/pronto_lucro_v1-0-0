import { useEffect, useState } from "react"
import Modal, { hideModal } from "../components/Modal"
import NewTagAdd from "./NewTagAdd"
import TagSelect from "./TagSelect"
import CategorySelect from "./categorySelect"



export default function CategorySelectModal(props) {

    const { categories, setSubCategorySelected, dataFunction } = props

    const [section, setSection] = useState('')





    return (
        <Modal id={props.id} size='modal-md'>

            <div className="modal-header">
                <h5 className="modal-title title-dark" id="categorySelectModalLabel">
                    Selecione o categoria
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => hideModal(props.id)}
                    aria-label="Close"
                ></button>
            </div>
            {/* {section === 'tagAdd' ?
                <NewTagAdd
                    tags={tags}
                    setSection={setSection}
                    setSubCategorySelected={setSubCategorySelected}
                    dataFunction={() => props.dataFunction()}
                    transactionSection={props.section}
                    id={props.id}

                />
                : */}
            <CategorySelect
                dataFunction={dataFunction}
                categories={categories}
                setSection={setSection}
                setSubCategorySelected={setSubCategorySelected}
                id={props.id}
                section={props.section} />
            {/* } */}




        </Modal>
    )

}