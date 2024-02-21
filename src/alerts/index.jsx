import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './alerts.module.scss';
import { removeAlert } from '../../store/Alerts/Alerts.actions';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export default function Alerts() {

    const alertsArray = useSelector(state => state.alerts);
    const token = jwt.decode(Cookies.get('auth'));
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        alertsArray.forEach((elem, index) => {
            if (elem.type === 'alert') {

                const timeoutId = setTimeout(() => {
                    dispatch(removeAlert(alertsArray, index));
                }, 5000); // Aguarda 4 segundos antes de remover o alerta
                return () => clearTimeout(timeoutId); // Limpa o timeout se o componente for desmontado antes do tempo
            }
        });
    }, [alertsArray, dispatch]);



    return (
        <div className={`${styles.alertsPosition}`}>
            {alertsArray.map((elem, index) => (
                <div key={index} className="alert alert-secondary alert-dismissible fade show fadeItem" role="alert">
                    <span> {elem.message} </span>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => dispatch(removeAlert(alertsArray, index))}
                    ></button>
                    {elem.type === 'alert' && (

                        <div className="progress " style={{ height: '5px', position: 'absolute', bottom: '0px', left: '0', width: '100%', borderRadius: '0 0 3px  3px' }}>
                            <div className="progress-bar bg-success bg-opacity-50" role="progressbar" style={{ width: '100%', animation: 'progressAnimation 5s linear forwards', }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    )}
                </div>
            ))}
            <style jsx>{`
                @keyframes progressAnimation {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}