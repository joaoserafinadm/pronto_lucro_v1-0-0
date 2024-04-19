
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './InputButton.module.scss'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



export default function InputButton(props) {

    return (
        <div>

            <span className={`${styles.button} cardAnimation`}>
                <FontAwesomeIcon icon={faPlus} className='text-light fs-5' />
            </span>
        </div>
    )


}