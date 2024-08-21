import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import reorganizeTags from "../../utils/reorganizeTags"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faGripLines, faList, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function IncomeTagsPage(props) {

    const { incomeTags } = props

    const tagsArray = reorganizeTags(incomeTags)

console.log("tagsArray", tagsArray)

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-end mb-3">
                <button className="btn btn-sm btn-custom-success">
                    + Adicionar categoria
                </button>
            </div>
            <hr />
            <DragDropContext>


                <Droppable droppableId="droppable" direction="vertical">
                    {(provided) => (
                        <div className="col-12" {...provided.droppableProps} ref={provided.innerRef}>


                            {tagsArray.map((elem, index) => {
                                return (

                                    <Draggable key={elem.id} draggableId={elem.id} index={index}  >
                                        {(provided) => (
                                            <div className="row" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={elem.id}>
                                                <span className="bold" type="button"><FontAwesomeIcon icon={faGripLines} className="me-2 text-secondary" />{elem?.category} </span>

                                                <div className="col-12 d-flex flex-wrap mb-2"> 
                                                    <div className="col">

                                                        {elem?.tags?.map((elem1, index1) => {
                                                            return (
                                                                <span type="button" key={elem1.tag + index1}
                                                                    className={`cardAnimation px-2 py-1 m-2  small mx-1 rounded-pill fw-bold `}
                                                                    style={{ backgroundColor: elem1.color, color: elem1.textColor }}>
                                                                    {elem1.tag}
                                                                </span>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                                        <span className="">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>

                                        )}

                                    </Draggable>

                                )
                            })}
                            {provided.placeholder}
                        </div>

                    )}

                </Droppable>

            </DragDropContext>

        </div>
    )
}