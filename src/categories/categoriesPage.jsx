import axios from "axios"
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp, faEllipsis, faGear, faGripLines, faPlus } from "@fortawesome/free-solid-svg-icons";
import NewCategorieModal from "./newCategorieModal";
import NewTagModal from "./newTagModal";



export default function CategoriesPage(props) {

    const token = jwt.decode(Cookie.get('auth'));


    const { dataFunction, categories, section } = props

    const [categoriesArray, setCategoriesArray] = useState(categories || [])
    const [categorySelected, setCategorySelected] = useState(null)

    const handleOrderChange = async (res) => {
        const { source, destination } = res

        // Verifica se há um destino válido
        if (!destination) return

        // Cria uma cópia do array atual
        const newTagArray = Array.from(categoriesArray)

        // Remove o item da posição original
        const [movedItem] = newTagArray.splice(source.index, 1)

        // Insere o item na nova posição
        newTagArray.splice(destination.index, 0, movedItem)

        // Atualiza o estado com o array reorganizado
        setCategoriesArray(newTagArray)

        const data = {
            user_id: token.sub,
            section: section,
            tags: newTagArray
        }

        await axios.patch('/api/categories', data)
            .then(res => {

            }).catch(e => {
                setCategoriesArray(e.response.data)
            })
    }


    return (
        <div className="row ">

            <NewCategorieModal categories={categoriesArray} section={section} dataFunction={() => dataFunction()} id={`newCategorieModal${section}`} />

            <NewTagModal categorySelected={categorySelected} categories={categoriesArray} section={section} dataFunction={() => dataFunction()} id={`newTagModal${section}`} />


            <div className="col-12 d-flex justify-content-end mb-2">
                <button className={`btn py-2 btn-sm ${section === 'incomeTags' ? "btn-c-success" : "btn-c-danger"} `} data-bs-toggle="modal" data-bs-target={`#newCategorieModal${section}`}>
                    + Adicionar categoria
                </button>
            </div>
            {/* <hr /> */}

            <DragDropContext onDragEnd={res => handleOrderChange(res)}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided) => (
                        <div className="col-12" {...provided.droppableProps} ref={provided.innerRef}>
                            {categoriesArray.map((elem, index) => (
                                <Draggable key={elem._id} draggableId={elem._id} index={index}>
                                    {(provided) => (
                                        <div className="card my-3 bg-white p-3" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={elem.id}>
                                            <div className="row d-flex">
                                                <div className="col-12 d-flex justify-content-between">

                                                    <span>
                                                        <FontAwesomeIcon icon={faGripLines} className="me-2 text-secondary" />
                                                    </span>
                                                    <span className="optionsButton  text-c-secondary" >
                                                        <FontAwesomeIcon icon={faGear} />
                                                    </span>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-12 d-flex my-1 align-items-center">
                                                    <div style={{ backgroundColor: elem.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
                                                    <span className="bold">{elem.category}</span>

                                                </div>
                                            </div>
                                            <hr />
                                            {/* <div className="row"> */}
                                            {elem?.tags?.map((elem1, index1) => (
                                                <>
                                                    <div className="row ">

                                                        <div className="col-12 d-flex  align-items-center">
                                                            <div style={{ height: "12px", width: "12px", border: `2px solid ${elem.color}` }} className="rounded-circle ms-2 me-2"></div>
                                                            <span className="fw-bold" style={{ color: elem.color }}>{elem1.tag}</span>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    {elem1.subTags?.map((elem2, index2) => (
                                                        <>
                                                            <div className="row">

                                                                <div className="col-12  d-flex small align-items-center">
                                                                    <FontAwesomeIcon className="me-2 ms-4" icon={faArrowTurnUp} style={{ transform: 'rotate(90deg)', color: elem.color }} />
                                                                    <span className="bold" style={{ color: elem.color }}>{elem2.subTag}</span>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </>

                                                    ))}
                                                </>
                                            ))}
                                            <div className="col-12 d-flex my-1 align-items-center mt-3">
                                                <span type="button" className="px-2 small bold cardAnimation" onClick={() => setCategorySelected(elem)}
                                                    data-bs-toggle="modal" data-bs-target={`#newTagModal${section}`}
                                                    style={{ border: `2px solid ${elem.color}`, borderRadius: '20px', color: elem.color }}>
                                                    + subcategoria
                                                </span>
                                            </div>
                                        </div>


                                        // </div>
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