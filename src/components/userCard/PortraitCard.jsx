
import Cookies from 'js-cookie'
import styles from './userCard.module.scss'
import jwt from 'jsonwebtoken'


export default function PortraitCard(props) {

    const token = jwt.decode(Cookies.get('auth'))




    return (
        <div className={`${styles.main} shadow`}>
            <div className={`${styles.header}`} style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05)), url(${props.headerImg})` }}>

            </div>
            <div className={`${styles.profilePicRow}`}>

                <img className={`${styles.profilePicture}`} src={props.profileImageUrl} alt="" />
            </div>
            <div className={`${styles.body}`}>
                <div className="col-12 mt-2 d-flex justify-content-center">
                    <span className='fs-4'>{props.firstName} {props.lastName}</span>
                </div>
                <div className="col-12 mt-2 d-flex justify-content-center">
                    <span className='small'>

                        Creci: {props.creci} | {props.celular}
                    </span>
                </div>
                <div className="col-12 mt-2 d-flex justify-content-center">
                    <span className='small'>
                        {props.email}
                    </span>
                </div>
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <img src={props.logo} alt="" style={{
                        maxHeight: "50px",
                        maxWidth: "130px",
                        height: "auto",
                        width: "auto"
                    }} />
                </div>
            </div>
        </div>
    )
}