import { faGripLines, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import CategoryIcon from "./categoryIcon"
import { useEffect, useState } from "react"
import axios from "axios"
import scrollTo from "../../utils/scrollTo"
import { showModalBs } from "../../utils/modalControl"
import { newData } from "../../store/NewData/NewData.action"
import { useDispatch } from "react-redux"




export default function CategoriesOrderModal(props) {

    const { id, categories, token, type, dataFunction } = props

    const [categoriesEdit, setCategoriesEdit] = useState([])

    const [saveError, setSaveError] = useState('')

    const dispatch = useDispatch()


    useEffect(() => {
        if (categories.length > 0) {
            setCategoriesEdit(categories)
        }
    }, [categories.length])


    const handleOrderChange = (res) => {
        const { source, destination } = res

        if (!destination) return

        const newTagArray = Array.from(categoriesEdit)

        const [movedItem] = newTagArray.splice(source.index, 1)

        newTagArray.splice(destination.index, 0, movedItem)

        setCategoriesEdit(newTagArray)

    }


    const handleSave = async () => {

        const data = {
            user_id: token.sub,
            type: type,
            categories: categoriesEdit
        }

        await axios.patch(`/api/categories/categoriesOrder`, data)
            .then(res => {
                dataFunction()
                                            dispatch(newData(true))
                
            }).catch(e => {
                showModalBs(id)
                setSaveError("Houve um problema ao salvar. Por favor, tente novamente.")
                scrollTo(id)
            })



    }

    return (
        <div class="modal fade" id={id} tabindex="-1" aria-labelledby={id + 'Label'} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id={id + 'Label'}>Nova categoria</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {saveError && (
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="alert alert-danger">{saveError}</div>
                                </div>
                            </div>
                        )}
                        <DragDropContext onDragEnd={res => handleOrderChange(res)} >
                            <Droppable droppableId="droppable" direction="vertical">
                                {(provided) => (
                                    <div className="row" {...provided.droppableProps} ref={provided.innerRef}>
                                        {categoriesEdit?.map((elem, index) => (
                                            <div className="col-12 my-2">
                                                <Draggable key={elem._id} draggableId={elem._id} index={index}>
                                                    {(provided) => (
                                                        <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={elem.id}>
                                                            <div className="card-body">

                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center">
                                                                        <FontAwesomeIcon icon={faGripLines} className="text-muted me-2" />
                                                                        <CategoryIcon color={elem.color} />
                                                                        <span className="bold mx-2">{elem.categoryName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-c-tertiary"
                            data-bs-dismiss="modal"
                            onClick={() => { setCategoriesEdit(categories); setSaveError('') }}>
                            Cancelar
                        </button>
                        <button className="btn btn-c-success"
                            data-bs-dismiss="modal"
                            onClick={() => handleSave()}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )




}