import { useState, useEffect } from "react";
import styles from './DatePicker.module.scss';
import { dateObject, reverseDateObject } from "../../../utils/handleDate";
import DatePicker from "./DatePicker";


export default function DatePickerModal(props) {

    const { title, date, setDate } = props;




    return (
        <div className="modal fade"
            id="datePickerModal"
            tabIndex="-1"
            aria-labelledby="datePickerModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title title-dark" id="datePickerModalLabel">
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">

                                <DatePicker date={date} setDate={setDate} />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
