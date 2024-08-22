import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faEllipsis, faGripLines, faList, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import NewTagModal from "./NewTagModal"

export default function TagsPage(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const {dataFunction, tags, section } = props

    const [tagArray, setTagArray] = useState(tags || [])

    const handleOrderChange = async (res) => {
        const { source, destination } = res

        // Verifica se há um destino válido
        if (!destination) return

        // Cria uma cópia do array atual
        const newTagArray = Array.from(tagArray)

        // Remove o item da posição original
        const [movedItem] = newTagArray.splice(source.index, 1)

        // Insere o item na nova posição
        newTagArray.splice(destination.index, 0, movedItem)

        // Atualiza o estado com o array reorganizado
        setTagArray(newTagArray)

        const data = {
            user_id: token.sub,
            section: section,
            tags: newTagArray
        }

        await axios.patch('/api/tags', data)
            .then(res => {

            }).catch(e => {
                setTagArray(e.response.data)
            })
    }

    return (
        <div className="row">


            <NewTagModal tags={tagArray} section={section} dataFunction={() => dataFunction()} id={`newTagModal${section}`}/>



            <div className="col-12 d-flex justify-content-end mb-3">
                <button className="btn btn-sm btn-custom-success" data-bs-toggle="modal" data-bs-target={`#newTagModal${section}`}>
                    + Adicionar categoria
                </button>
            </div>
            <hr />
            <DragDropContext onDragEnd={res => handleOrderChange(res)}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided) => (
                        <div className="col-12" {...provided.droppableProps} ref={provided.innerRef}>
                            {tagArray.map((elem, index) => (
                                <Draggable key={elem._id} draggableId={elem._id} index={index}>
                                    {(provided) => (
                                        <div className="card my-1 bg-white p-3" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={elem.id}>
                                            <div className="col-12 d-flex  mb-2">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">

                                                            <span className="bold"><FontAwesomeIcon icon={faGripLines} className="me-2 text-secondary" />{elem?.category} </span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 d-flex flex-wrap">

                                                            {elem?.tags?.map((elem1, index1) => (
                                                                <span type="button" key={elem1._id}
                                                                    className={`cardAnimation px-2 py-1 m-2 small mx-1 rounded-pill fw-bold`}
                                                                    style={{ backgroundColor: elem1.color, color: elem1.textColor }}>
                                                                    {elem1.tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="d-flex align-items-center justify-content-end" style={{ width: "30px" }}>
                                                    <div>
                                                        <span className="optionsButton my-1">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </span>
                                                        <span className="optionsButton my-1">
                                                            <FontAwesomeIcon icon={faEllipsis} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
