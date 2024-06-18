import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import styles from './DatePicker.module.scss';
import { dateObject, reverseDateObject } from "../../../utils/handleDate";
import { ptBR } from 'date-fns/locale/pt-BR';
import qs from 'qs';

registerLocale('pt-BR', ptBR);

export default function DatePickerModal(props) {
    const { title, date, setDate } = props;

    const [locale, setLocale] = useState('pt-BR');

    useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            const q = qs.parse(window.location.search, { ignoreQueryPrefix: true });
            setLocale(q.locale || 'en');
        }
    }, []);

    return (
        <div className="modal fade"
            id="datePickerModal"
            tabIndex="-1"
            aria-labelledby="datePickerModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
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
                            <div className="col-12">
                                <DatePicker
                                    locale={'pt-BR'}
                                    // calendarClassName={styles.datePickerContainer}
                                    calendarClassName="d-flex w-100 justify-content-center "                                    
                                    fixedHeight
                                    inline
                                    selected={reverseDateObject(date)}
                                    onChange={(date) => setDate(dateObject(date))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
