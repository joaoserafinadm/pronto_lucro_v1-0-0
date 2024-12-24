import axios from "axios"
import { useRouter } from "next/router"




export default function NotificationAlert(props) {

    const router = useRouter()

    const { elem, token } = props

    const handleRedirect = async (not) => {

        if (not.link) {

            axios.patch(`/api/indexPage/notifications`, { user_id: token.sub, notification_id: not._id })

            router.push(not.link )
        }
    }

    const handleClose = async (not) => {
        axios.patch(`/api/indexPage/notifications`, { user_id: token.sub, notification_id: not._id })

    }

    if (!elem.checked) {
        return (
            <div className="alert alert-secondary alert-dismissible small fadeItem" >
                <span className="small fw-bold"> {elem.title} </span> <br />
                <span> {elem.message} </span> <br />
                <button className="btn btn-outline-secondary btn-sm mt-1" onClick={() => handleRedirect(elem)}>{elem.button}</button>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleClose(elem)}></button>
            </div >
        )
    }

}