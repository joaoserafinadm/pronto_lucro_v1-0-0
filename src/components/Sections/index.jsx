import { useEffect } from "react";
import isMobile from "../../../utils/isMobile";
export default function Sections(props) {


    useEffect(() => {

        setTimeout(() => {

            var myCarousel = document.querySelector("#" + props.idTarget)
            var carousel = myCarousel ? new bootstrap.Carousel(myCarousel) : ''
            if (carousel) {
                carousel?.to(props.sections.indexOf(props.section))

            }
        }, 200)
    }, [props.section])




    return (
        <div className="row  border-bottom mb-4" >
            <div className="col-12 d-flex align-items-end" style={{ overflowX: isMobile() ? "scroll" : 'auto' }}>
                {props.sections.map((elem, index) => {
                    return (
                        <span
                            className={`px-4 py-3 text-center ${isMobile() ? 'fs-small px-4' : ' px-5'} ${props.section === elem ? 'fw-bold text-primary  border-bottom border-2 ' : ''}`} type="button"
                            onClick={() => props.setSection(elem)} data-bs-target={"#" + props.idTarget} data-bs-slide-to={index}>
                            {elem}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}