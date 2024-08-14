import { useEffect, useState } from "react"
import Modal, { hideModal } from "../components/Modal"
import NewTagAdd from "./NewTagAdd"
import TagSelect from "./TagSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"



export default function BankAccountsModal(props) {

    const { bankAccounts, setAccountSelected } = props

    console.log("bankAccounts", bankAccounts)

    return (
        <Modal id={props.id} size='modal-md'>
            <div className="modal-header">
                <h5 className="modal-title title-dark" id={props.id + "Label"}>
                    Selecione a conta
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => hideModal(props.id)}
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                {bankAccounts.map((elem, index) => (
                    <>
                        <span className="row d-flex py-2 hoverSelect" type="button" onClick={() => { setAccountSelected(elem); hideModal(props.id) }}>
                            <div style={{ width: "60px" }} className="d-flex justify-content-center align-items-center">

                                <img src={elem.bankSelected?.logoUrl} className="rounded-circle" alt="" width={40} height={40} />

                            </div>
                            <div className="col d-flex align-items-center">
                                <div>
                                    <span className="small bold">{elem.bankSelected?.name}</span><br />
                                    <span className="badge" style={{ backgroundColor: elem.color }}>{elem.description}</span>
                                </div>
                            </div>
                            <div style={{ width: "15px" }} className="d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>

                        </span>
                        <hr />
                    </>

                ))}
            </div>


        </Modal>

    )




}