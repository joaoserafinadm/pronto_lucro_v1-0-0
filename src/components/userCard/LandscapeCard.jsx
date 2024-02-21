
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './userCard.module.scss'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocation, faLocationArrow, faLocationDot } from '@fortawesome/free-solid-svg-icons'



export default function LandscapeCard(props) {


    return (
        <div id='landscapeCardItem'
        className={`${styles.mainLS} shadow`} 
        style={{ backgroundImage: `linear-gradient(to right,#fff0, #fff 40%), ${props.headerImg ? `url(${props.headerImg})` : "#f5874f"}`, backgroundColor: props.headerImg ? '' : "#f5874f" }}>
            {/* <div className={`${styles.headerLS}`} >

            </div> */}
            <div className={`${styles.profilePicRowLS}`}>

                <img className={`${styles.profilePictureLS}`} src={props.profileImageUrl} alt="" />
            </div>
            <div className={`${styles.bodyLS}`}>
                <div className="col-12 mt-3 py-0 ">
                    <span className='fs-5'>{props.firstName} {props.lastName}</span>
                </div>
                <div className={`col-12 mt-0  py-0 ${styles.fontSize}`}>
                    <span className='small'>
                        Creci: {props.creci}
                    </span>
                </div>
                <div className={` ${styles.fontSize}`}>

                    <div className={`col-12 mt-2 `}>
                        <div className='small d-flex'>
                            <div className="d-flex justify-content-center align-items-center" style={{ width: "25px" }}>
                                <FontAwesomeIcon icon={faWhatsapp} className='icon small' />
                            </div>
                            <div>
                                <span>
                                    {props.telefone}
                                </span> <br />
                                <span>
                                    {props.celular}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-2 ">
                        <div className='small d-flex'>
                            <div className="d-flex justify-content-center align-items-center" style={{ width: "25px" }}>

                                <FontAwesomeIcon icon={faEnvelope} className='icon small ' style={{height: "5px !important"}} />
                            </div>
                            <span>
                                {props.email}
                            </span>
                        </div>
                    </div>

                    <div className="col-12 mt-2 ">
                        <div className='small d-flex'>
                            <div className="d-flex justify-content-center align-items-center" style={{ width: "25px" }}>

                                <FontAwesomeIcon icon={faLocationDot} className='icon small' />
                            </div>
                            <div>
                                <span>
                                    {props.logradouro}, {props.numero}
                                </span> <br />
                                <span>
                                    {props.cidade} - {props.estado}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <div className={`${styles.logoLS}`}>
                    <span className='small'>
                        <img src={props.logo} alt="" className={`${styles.logoImgLS}`} />
                    </span>
                </div> */}
                </div>

            </div>
            {/* <div className={`${styles.bodyLS}`}>
                <div className="col-12  d-flex justify-content-center">
                    <span className='fs-5'>{props.firstName} {props.lastName}</span>
                </div>
                <div className="col-12  d-flex justify-content-center">
                    <span className='small'>

                        Creci: {props.creci} | {props.celular}
                    </span>
                </div>
                <div className="col-12  d-flex justify-content-center">
                    <span className='small'>
                        {props.email}
                    </span>
                </div>
                <div className="col-12  d-flex justify-content-center">
                    <img src={props.logo} alt="" style={{
                        maxHeight: "50px",
                        maxWidth: "130px",
                        height: "auto",
                        width: "auto"
                    }} />
                </div>
            </div> */}

        </div>
    )
}