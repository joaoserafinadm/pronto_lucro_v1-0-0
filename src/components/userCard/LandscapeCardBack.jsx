
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './userCard.module.scss'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocation, faLocationArrow, faLocationDot } from '@fortawesome/free-solid-svg-icons'



export default function LandscapeCardBack(props) {


    return (
        <div id='landscapeCardItemBack'
        className={`${styles.mainBackLS} shadow`} 
        style={{ backgroundImage: ` url(${props.headerImg})` }}>
            <div className={`${styles.logoBackLS}`}>
                <img src={props.logo} alt="" height={50} className={`${styles.logoImgLS}`}/>

            </div>

        </div>
    )
}