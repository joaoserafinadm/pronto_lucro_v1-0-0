import { useState, useEffect } from "react";
import styles from './DatePicker.module.scss';
import { dateObject, reverseDateObject } from "../../../utils/handleDate";
import DatePicker from "./DatePicker";
import Modal, { hideModal } from "../Modal";


export default function DatePickerModal(props) {

    const { title, date, setDate } = props;

    const [newDate, setNewDate] = useState(dateObject(new Date()));

    useEffect(() => {

        setNewDate(date)
    }, [date.day, date.month, date.year])




    return (
        <Modal id={props.id} size='modal-md'>

            <div className="modal-body">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">

                        <DatePicker date={newDate} setDate={setNewDate} />

                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-outline-custom-tertiary"
                    onClick={() => { hideModal( props.id ) }}
                >
                    Cancelar
                </button>
                <button 
                    type="button"
                    className={`btn ${props.section === 'income' ? 'btn-outline-custom-success' : props.section === 'expense' ? 'btn-outline-custom-danger' : 'btn-outline-custom-tertiary'}`}
                    onClick={() => { hideModal( props.id ); setDate(newDate) }}
                >
                    Selecionar
                </button>
            </div>
        </Modal>
    );
}
