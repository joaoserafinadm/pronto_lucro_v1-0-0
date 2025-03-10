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
    }, [date?.day, date?.month, date?.year])




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
                    className="btn btn-c-outline-tertiary"
                    onClick={() => { hideModal( props.id ) }}
                >
                    Cancelar
                </button>
                <button 
                    type="button"
                    className={`btn ${props.section === 'income' ? 'btn-c-outline-success' : props.section === 'expense' ? 'btn-c-outline-danger' : 'btn-c-outline-tertiary'}`}
                    onClick={() => { hideModal( props.id ); setDate(newDate) }}
                >
                    Selecionar
                </button>
            </div>
        </Modal>
    );
}
