import { faArrowDown, faArrowUp, faChevronCircleDown, faChevronCircleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function TypeIcon(props) {

    const { elem } = props





    return (
        <FontAwesomeIcon icon={elem.type === 'income' ? faChevronCircleUp : elem.type === 'expense' ? faChevronCircleDown : '-'}
            className={` me-2  text-${elem.active === false ? 'muted' : elem.type === 'income' ? 'c-success' : elem.type === 'expense' ? 'c-danger' : 'secondary'}`} />

    )
}