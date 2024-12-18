import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from 'swr'
import api from '../../../utils/api'
import { useEffect, useState } from "react";
import NotificationAlert from "./notificationAlert";




export default function NotificationsCard(props) {

    const { token } = props


    const [notifications, setNotifications] = useState([])
    // const [forceUpdate, setForceUpdate] = useState(0)


    const { data, error, isLoading } = useSWR(`/api/indexPage/notifications?user_id=${token?.sub}`, api)


    useEffect(() => {
        if (data) {
            console.log(data.data?.notifications)
            setNotifications(data.data?.notifications)
            // setForceUpdate(forceUpdate + 1)
        }
    }, [data])



    return (
        <div className={`row my-3 ${notifications?.filter(elem => !elem.checked).length === 0 ? 'd-none' : ''}`}>
            <div className="col-12">

                <div className="row mb-2">
                    <div className="col-12">

                        <FontAwesomeIcon icon={faBell} />
                        <span className="small fw-bold mb-2 ms-3">Notificações</span>
                    </div>
                </div>
                <div className="row">
                    {notifications?.map((elem, index) => (

                        <div className="col-12">
                            <NotificationAlert elem={elem} token={token} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )





}