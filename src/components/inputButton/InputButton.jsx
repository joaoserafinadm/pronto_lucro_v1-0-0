
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './InputButton.module.scss'
import { faArrowTrendDown, faArrowTrendUp, faCreditCard, faCreditCardAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import isMobile from '../../../utils/isMobile'
import Link from 'next/link'



export default function InputButton(props) {

    const [open, setOpen] = useState(false)

    return (
        <div>

            {open === true && (
                <div className={`fadeItem ${styles.background}`} onClick={() => setOpen(false)}>

                </div>
            )}

            <span className={`${props.menubar ? styles.buttonMenubar : styles.button} cardAnimation`}
                onClick={() => setOpen(!open)} >
                <FontAwesomeIcon icon={faPlus} className={`text-light fs-5 ${open ? styles.buttonClose : styles.buttonOpen}`} />
            </span>


            <div className={` ${props.menubar ? open ? styles.buttonGroupShowMenubar : styles.buttonGroupHideMenubar : open ? styles.buttonGroupShow : styles.buttonGroupHide}`} >
                {/* <div className={` ${ open ? styles.buttonGroupShow : styles.buttonGroupHide}`} > */}


                <div className={`${!props.menubar ? styles.buttonSectionPosition1 : styles.buttonSectionPosition1Menubar}`}>
                    <Link href="/incomeAdd">
                        <div className={`${styles.buttonSection} cardAnimation`} type='button' onClick={() => setOpen(!open)}>
                            <span className={`${styles.buttonIcon} shadow`}>
                                <FontAwesomeIcon icon={faArrowTrendUp} className='text-success' />
                            </span>
                            <span className='text-center small bold text-white' style={{ fontSize: '10px' }}>
                                Receita
                            </span>
                        </div>
                    </ Link>
                </div>
                <div className={`${!props.menubar ? styles.buttonSectionPosition2 : styles.buttonSectionPosition2Menubar}`}>
                    <div className={`${styles.buttonSection} cardAnimation`} type='button' onClick={() => setOpen(!open)}>
                        <span className={`${styles.buttonIcon} shadow`}>
                            <FontAwesomeIcon icon={faArrowTrendDown} className='text-danger' />
                        </span>
                        <span className='text-center small bold text-white' style={{ fontSize: '10px' }}>
                            Despesa
                        </span>
                    </div>
                </div>
                <div className={`${!props.menubar ? styles.buttonSectionPosition3 : styles.buttonSectionPosition3Menubar}`}>
                    <div className={`${styles.buttonSection} cardAnimation`} type='button' onClick={() => setOpen(!open)}>
                        <span className={`${styles.buttonIcon} shadow`}>
                            <FontAwesomeIcon icon={faCreditCardAlt} className='text-primary' />
                        </span>
                        <span className='text-center small bold text-white' style={{ fontSize: '10px' }}>
                            Cartão
                        </span>
                    </div>
                </div>



            </div>

        </div >
    )


}