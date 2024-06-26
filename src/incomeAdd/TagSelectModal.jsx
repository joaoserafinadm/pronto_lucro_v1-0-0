



export default function TagSelectModal(props) {

    const { tags } = props

    return (
        <div className="modal fade"
            id="tagSelectModal"
            tabIndex="-1"
            aria-labelledby="tagSelectModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title title-dark" id="tagSelectModalLabel">
                            Selecione o marcador
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row ">
                            <div className="col-12 d-flex flex-wrap">
                                {tags.map((elem, index) => {
                                    return (
                                        <span onClick={() => setTagSelected(elem._id)} data-bs-dismiss="modal"
                                            className={`cardAnimation px-2 py-1 m-2  small mx-1 rounded-pill fw-bold `}
                                            style={{ backgroundColor: elem.color, color: elem.textColor }}>
                                            {elem.description}
                                        </span>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}