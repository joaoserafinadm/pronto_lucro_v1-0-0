import styles from './Title.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {
    faAngleLeft,
    faArrowLeft,
    faBookOpen,
    faChartLine,
    faClipboardList,
    faDiagramProject,
    faHome,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'
import baseUrl from '../../../utils/baseUrl'
import { useEffect, useState } from 'react'
import { AiOutlineLeft } from '@react-icons/all-files/ai/AiOutlineLeft'
import isMobile from '../../../utils/isMobile'
import { useRouter } from 'next/router'


export default function Title(props) {

    const router = useRouter()

    return (
        <div className={`${styles.headerBox} ${styles.headerBackground} shadow indexBackground`} >
            <div className={`${styles.headerContent}  fadeItem `} >
                <div className="d-inline-flex ">
                    {props.title && (

                        <span className={`${styles.headerTitle} fadeItem`}>{props.title}</span>
                    )}

                </div>
                {props.backButton && typeof props.backButton === 'boolean' && (
                    // <Link href='/'>
                    <span type="button" className={styles.backButton} onClick={() => router.back()}><AiOutlineLeft className="me-2" />Voltar</span>
                    // </Link>
                )}
                {props.backButton && typeof props.backButton === 'string' && (
                    <span type="button" className={styles.backButton} onClick={() => router.push(props.backButton)}><AiOutlineLeft className="me-2" />Voltar</span>
                )}
                {props.title && (

                    <div className={`${styles.headerSubtitle} fadeItem`}>{props.subtitle}</div>
                )}
            </div>
        </div>
    )
}