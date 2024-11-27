import isMobile from "../../../utils/isMobile";
export default function Sections(props) {
    return (
        <div className="row  border-bottom mb-4 mx-1" >
            <div className="col-12 d-flex align-items-end" style={{ overflowX: isMobile() ? "scroll" : 'auto' }}>
                {props.sections.map((elem, index) => {
                    return (
                        <span
                            className={`px-4 py-3 text-center ${isMobile() ? 'small px-4' : ' px-5'} ${props.section === elem ? 'fw-bold text-secondary  border-bottom border-primary border-2 ' : ''}`} type="button"
                            onClick={() => props.setSection(elem)} data-bs-target={"#" + props.idTarget} data-bs-slide-to={index}>
                            {elem}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}