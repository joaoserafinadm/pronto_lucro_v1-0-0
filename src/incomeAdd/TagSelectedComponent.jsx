import { faArrowTurnUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal } from "../components/Modal";




export default function TagSelectedComponent(props) {

    const { tagSelected, type } = props




    return (
        <div className="col-12 mt-2 d-flex justify-content-between" onClick={() => showModal(`tagSelectModal${type}`)}>
            {!tagSelected ?
                <span type="button"
                    class=" px-2 py-1  small mx-1 rounded-pill border pulse shadow">
                    Selecionar Marcador
                </span>
                :
                <>
                    <div className="row">
                        <div>
                            <span type="button" onClick={() => showModal(`tagSelectModal${type}`)} style={{ color: tagSelected.color }}
                                className=" cardAnimation border rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                {!tagSelected.subTag_id ?
                                    <div style={{ height: "12px", width: "12px", border: `2px solid ${tagSelected.color}` }} className="rounded-circle ms-2 me-2"></div>
                                    :
                                    <FontAwesomeIcon className="me-2 ms-2" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: tagSelected.color }} />
                                }

                                {tagSelected.name}
                            </span>
                        </div>
                    </div>
                </>
            }
            <div className="text-center text-secondary" style={{ width: "40px" }}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    )
}