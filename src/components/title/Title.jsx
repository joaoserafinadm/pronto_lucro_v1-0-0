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


export default function Title(props) {

    return (
        <div className={`${styles.headerBox} shadow ${styles.headerBackground}`}>
            <div className={`${styles.headerContent} fadeItem`}>
                <div className="d-inline-flex">
                    <span className={styles.headerTitle}>{props.title}</span>
                    {props.statusView && (
                        <>
                            {
                                props.status ?
                                    <div className={`d-flex align-items-center ${styles.badg}`}>
                                        <span className={`badge bg-success ms-3 ${styles.badg}`}>Ativo</span>
                                    </div>
                                    :
                                    <div className='d-flex align-items-center'>
                                        <span className="badge bg-danger ms-3">Inativo</span>
                                    </div>
                            }
                        </>
                    )}
                </div>
                <div className={styles.headerSubtitle}>{props.subtitle}</div>
                {props.backButton && (
                    // <Link href='/'>
                        <span type="button" className={styles.backButton} onClick={() => history.back()}><FontAwesomeIcon icon={faArrowLeft} className="me-2" />Voltar</span>
                    // </Link>
                )}
            </div>
        </div>
    )
}