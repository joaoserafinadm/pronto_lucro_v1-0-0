import { faChevronLeft, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpinnerSM } from "../components/loading/Spinners";
import { useEffect, useState } from "react";
import { useStateContext } from "./context/resultsContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import scrollCarouselTo from "../../utils/scrollCarouselTo";



export default function PlanoDeContasShuffleResults(props) {

    const token = jwt.decode(Cookie.get("auth"));


    const { incomeCategories, expenseCategories, planoDeContasConfig } = useStateContext();

    const [config, setConfig] = useState([])

    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        setConfig(planoDeContasConfig)
    }, [planoDeContasConfig])


    const handleOrderChange = (res) => {

        if (!res.destination) return;

        const newTagArray = Array.from(config)

        const [movedItem] = newTagArray.splice(res.source.index, 1)

        newTagArray.splice(res.destination.index, 0, movedItem)

        setConfig(newTagArray)

    }

    const handleSave = async () => {

        const data = {
            user_id: token.sub,
            planoDeContasConfig: config,
        }

        await axios.patch(`/api/results/planoDeContasResultsShuffle`, data)
            .then(res => {
                props.dataFunction(token.sub)
                scrollCarouselTo("planoDeContasConfigCarousel", 0)

                setConfig([])
            }).catch(e => {
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

                            {config.length > 0 && config.map((elem, index) => (
                                <div className="col-12">
                                    <Draggable key={elem._id} draggableId={elem._id} index={index}>
                                        {(provided) => (

                                            <div className="card my-2" key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={elem.id}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <span className="small fw-bold "><FontAwesomeIcon icon={faGripLines} className="me-2" /> {elem.resultName}</span>
                                                    </div>
                                                </div>
                                            </div >
                                        )}

                                    </Draggable>

                                </div>
                            ))}
                        </div>


                    )}

                </Droppable>

            </DragDropContext>



            <hr className="mt-5" />

            <div className="col-12 d-flex justify-content-end ">
                <button className="btn btn-sm btn-c-outline-tertiary me-2" onClick={() => setConfig(planoDeContasConfig)} data-bs-target="#planoDeContasConfigCarousel" data-bs-slide-to={0}>
                    Cancelar
                </button>
                <button className="btn btn-sm btn-c-outline-success" onClick={handleSave} >
                    {loadingSave ? <SpinnerSM className="mx-2" /> : " Salvar"}
                </button>

            </div>
        </div>
    )


}