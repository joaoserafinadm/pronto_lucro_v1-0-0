
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './InputButton.module.scss'
import { faArrowTrendDown, faArrowTrendUp, faCreditCard, faCreditCardAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'



export default function InputButton(props) {

    const [open, setOpen] = useState(false)

    return (
        <div>

            <span className={`${styles.button} cardAnimation`}
                onClick={() => setOpen(!open)} >
                <FontAwesomeIcon icon={faPlus} className={`text-light fs-5 ${open ? styles.buttonClose : styles.buttonOpen}`} />
            </span>


            <div className={` ${open ? styles.buttonGroupShow : styles.buttonGroupHide}`} >


                <div className={`${styles.buttonSectionPosition1}`}>
                    <div className={`${styles.buttonSection} cardAnimation`} type='button' onClick={() => setOpen(!open)}>
                        <span className={`${styles.buttonIcon} shadow`}>
                            <FontAwesomeIcon icon={faArrowTrendUp} className='text-success' />
                        </span>
                        <span className='text-center small bold' style={{ fontSize: '10px' }}>
                            Receita
                        </span>
                    </div>
                </div>
                <div className={`${styles.buttonSectionPosition2}`}>
                    <div className={`${styles.buttonSection} cardAnimation`} type='button' onClick={() => setOpen(!open)}>
                        <span className={`${styles.buttonIcon} shadow`}>
                            <FontAwesomeIcon icon={faArrowTrendDown} className='text-danger' />
                        </span>
                        <span className='text-center small bold' style={{ fontSize: '10px' }}>
                            Despesa
                        </span>
                    </div>
                </div>
                <div className={`${styles.buttonSectionPosition3}`}>
                    <div className={`${styles.buttonSection} cardAnimation`} type='button' onClick={() => setOpen(!open)}>
                        <span className={`${styles.buttonIcon} shadow`}>
                            <FontAwesomeIcon icon={faCreditCardAlt} className='text-primary' />
                        </span>
                        <span className='text-center small bold' style={{ fontSize: '10px' }}>
                            Cartão
                        </span>
                    </div>
                </div>




            </div>
        </div>
    )


}