import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "./context/resultsContext";
import { faChevronLeft, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { SpinnerSM } from "../components/loading/Spinners";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CategoryIcon from "../categories/categoryIcon";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import scrollCarouselTo from "../../utils/scrollCarouselTo";




export default function PlanoDeContasShuffleCategories(props) {

    const token = jwt.decode(Cookie.get("auth"));


    const { planoDeContasEdit,
        setPlanoDeContasEdit,
        dataFunction } = props

    const {
        incomeCategories,
        expenseCategories
    } = useStateContext();

    const [categories, setCategories] = useState([])


    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        setCategories(planoDeContasEdit?.selectedCategories || [])
    }, [planoDeContasEdit])


    const handleOrderChange = (res) => {

        if (!res.destination) return;

        const items = Array.from(categories);
        const [reorderedItem] = items.splice(res.source.index, 1);
        items.splice(res.destination.index, 0, reorderedItem);

        setCategories(items);
    }


    const handleSave = async () => {
        setLoadingSave(true);

        const data = {
            user_id: token.sub,
            id: planoDeContasEdit._id,
            selectedCategories: categories
        }

        await axios.patch(`/api/results/planoDeContasShuffleCategories`, data)
            .then(res => {
                dataFunction(token.sub)
                scrollCarouselTo("planoDeContasConfigCarousel", 0)
                setLoadingSave(false)
                setCategories([])
            }).catch(e => {
                setLoadingSave(false)
                console.log(e)
            })

    }



    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between fadeItem2s mt-0">
                <span className="cardAnimation  " type="button" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={0}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
            </div>


            <DragDropContext onDragEnd={res => handleOrderChange(res)} >
                <Droppable droppableId="droppable" direction="vertical">

                    {(provided) => (
                        <div className="row" {...provided.droppableProps} ref={provided.innerRef}>

                            {categories.length > 0 && categories.map((catId, index) => (
                                <div className="col-12">
                                    <Draggable key={catId} draggableId={catId} index={index}>
                                        {(provided) => {

                                            const incomeCategory = incomeCategories.find(category => category._id === catId);
                                            const expenseCategory = expenseCategories.find(category => category._id === catId);

                                            if (incomeCategory) {
                                                return (
                                                    <div className="card my-2" key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={catId}>
                                                        <div className="card-body">

                                                            <div className="d-flex align-items-center my-1" key={index}>
                                                                <FontAwesomeIcon icon={faGripLines} className="me-1" />
                                                                <span className="bold me-2 text-c-success">(+)</span>
                                                                <div className="d-flex align-items-center">
                                                                    <CategoryIcon color={incomeCategory.color} />
                                                                    <span className="bold text-muted ms-1">{incomeCategory.categoryName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            if (expenseCategory) {
                                                return (
                                                    <div className="card my-2" key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={catId}>
                                                        <div className="card-body">
                                                            <div className="d-flex align-items-center my-1" key={index}>
                                                                <FontAwesomeIcon icon={faGripLines} className="me-1" />

                                                                <span className="bold me-2 text-c-danger">(-)</span>
                                                                <div className="d-flex align-items-center">
                                                                    <CategoryIcon color={expenseCategory.color} />
                                                                    <span className="bold text-muted ms-1">{expenseCategory.categoryName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }}

                                    </Draggable>

                                </div>
                            ))}
                        </div>


                    )}

                </Droppable>

            </DragDropContext>



            <hr className="mt-5" />

            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-sm btn-c-outline-tertiary me-2" data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={0}>
                    Cancelar
                </button>
                <button className="btn btn-sm btn-c-outline-success" onClick={handleSave}>
                    {loadingSave ? <SpinnerSM className="mx-2" /> : " Salvar"}
                </button>

            </div>


        </div>
    )
}