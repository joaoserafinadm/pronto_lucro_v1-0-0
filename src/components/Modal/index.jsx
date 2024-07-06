import { useState } from 'react'
import styles from './Modal.module.scss'

export default function Modal({ id, title, size = '', children }) {


    return (
        <div id={id} className={`${styles.modal} ${styles[size]}`}>
            <div className={`${styles.background}`} onClick={() => hideModal(id)} />
            <div className={`${styles.modalArea}`}>
                {children}
            </div>
        </div>
    )
}

export function showModal(id) {
    const modal = document.getElementById(id)
    if (modal) {

        modal.style.display = 'block'
        modal.style.opacity = '1'
    }
}

export function hideModal(id) {
    const modal = document.getElementById(id)
    modal.style.opacity = '0'
    modal.style.transition = 'opacity 0.2s'

    setTimeout(() => {
        modal.style.display = 'none'
    }, 200)
}
