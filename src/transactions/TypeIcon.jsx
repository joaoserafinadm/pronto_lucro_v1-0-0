import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function TypeIcon(props) {

    const { elem } = props





    return (
        <FontAwesomeIcon icon={elem.type === 'income' ? faArrowUp : elem.type === 'expense' ? faArrowDown : '-'}
            className={` me-2  text-${elem.active === false ? 'secondary' : elem.type === 'income' ? 'success' : elem.type === 'expense' ? 'danger' : 'secondary'}`} />

    )
}