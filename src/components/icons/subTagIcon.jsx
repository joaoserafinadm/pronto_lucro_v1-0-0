import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function SubTagIcon(props) {

    const { color } = props

    return (
        <FontAwesomeIcon className="me-2 ms-2" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: color }} />


    )

}