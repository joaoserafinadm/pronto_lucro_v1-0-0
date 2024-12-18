import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function CategoryIcon(props) {

    const { color } = props

    return (
        <FontAwesomeIcon icon={faCircle} className="rounded-circle  me-2 " style={{ color: ` ${color}` }} />

    )
}

export function SubCategoryIcon(props) {

    const { color } = props

    return (
        <FontAwesomeIcon icon={faCircleDot} className="rounded-circle ms-2 me-2 small" style={{ color: ` ${color}` }} />
    )
}

// export default function CategoryIcon(props) {

//     const { color } = props

//     return (
//         <div style={{ height: '17px', width: '17px' }}>

//             <div style={{ backgroundColor: color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
//         </div>
//     )
// }

// export function SubCategoryIcon(props) {

//     const { color } = props

//     return (
//         <div style={{ height: "12px", width: "12px", border: `2px solid ${color}` }} className="rounded-circle ms-2 me-2"></div>
//     )
// }