import { faArrowTurnUp, faCheck, faEdit, faGripLines, faPlus, faTag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import Cookie from 'js-cookie';
import axios from "axios";
import { showModalBs } from "../../utils/modalControl";
import scrollTo from "../../utils/scrollTo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CategoryIcon, { SubCategoryIcon } from "./categoryIcon";

export default function EditCategoryModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const { categorySelected, categories, type, dataFunction, id } = props;

    const [categoryEdit, setCategoryEdit] = useState(categorySelected);
    const [editCategory, setEditCategory] = useState(false)
    const [editTagIndex, setEditTagIndex] = useState('');

    const [editTagName, setEditTagName] = useState('');
    const [editCategoryName, setEditCategoryName] = useState(''); // Estado para o nome da categoria
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        setCategoryEdit(categorySelected);
    }, [categorySelected]);

    const initialValues = () => {
        setEditTagIndex('');
        setEditTagName('');
        setEditCategoryName(''); // Reconfigurar o estado do nome da categoria
    };

    const handleTagNameChange = (elem, index, newTagName) => {
        let updatedCategory = { ...categoryEdit };
        updatedCategory.subCategories[index].name = newTagName;
        setCategoryEdit(updatedCategory);
        setEditTagIndex('');
        setEditTagName('');
    };


    const handleCategoryNameChange = () => {
        let updatedCategory = { ...categoryEdit };
        updatedCategory.categoryName = editCategoryName;
        setCategoryEdit(updatedCategory);
        setEditCategoryName('');
        setEditCategory(false)
    };

    const handleDisableSave = () => {
        if (categorySelected === categoryEdit) return true
        else return false
    }

    const handleSave = async () => {
        const data = {
            user_id: token.sub,
            type: type,
            category: categoryEdit
        };

        await axios.patch(`/api/categories/categoryEdit`, data)
            .then(res => {
                dataFunction();
            }).catch(e => {
                showModalBs(id);
                setSaveError("Houve um problema ao editar a categoria. Por favor, tente novamente.");
                scrollTo(id);
            });
    };

    const handleTagOrderChange = (res) => {
        const { source, destination } = res;
        if (!destination) return;

        let updatedTags = Array.from(categoryEdit.subCategories);
        const [movedTag] = updatedTags.splice(source.index, 1);
        updatedTags.splice(destination.index, 0, movedTag);

        setCategoryEdit({ ...categoryEdit, subCategories: updatedTags });
    };


    return (
        <div className="modal fade" id={id} tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={id + 'Label'} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={id + 'Label'}>Configurar categoria</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {saveError && (
                                <div className="col-12">
                                    <div className="alert alert-danger">{saveError}</div>
                                </div>
                            )}
                            <div className="col-12">
                                <div className="row">
                                    {editCategory ? (
                                        <div className="col-12 d-flex my-1 align-items-center">
                                            <div style={{ backgroundColor: categoryEdit?.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>

                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editCategoryName}
                                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                                />
                                                <button
                                                    disabled={!editCategoryName}
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleCategoryNameChange()}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} className="pulse text-c-success" />
                                                </button>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => { setEditCategoryName(''); setEditCategory(false) }}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-12 d-flex my-1 align-items-center justify-content-between">
                                            <div className="d-flex my-1 align-items-center">

                                                <CategoryIcon color={categoryEdit?.color} />

                                                <div className="d-flex align-items-center justify-content-between ms-2">
                                                    <span className="bold">{categoryEdit?.categoryName}</span>
                                                </div>
                                            </div>
                                            <span
                                                className="ms-2 text-c-secondary"
                                                type="button"
                                                onClick={() => { setEditCategoryName(categoryEdit?.categoryName); setEditCategory(true) }}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <hr />

                                <DragDropContext onDragEnd={handleTagOrderChange}>
                                    <Droppable droppableId="tags-droppable">
                                        {(provided, snapshot) => (
                                            <div className="rounded "
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{
                                                    backgroundColor: snapshot.isDraggingOver ? '#f4f4f4' : 'transparent',
                                                    padding: 4,
                                                    width: '100%',
                                                }}
                                            >
                                                {categoryEdit?.subCategories?.map((elem1, index1) => (
                                                    <div className="col-12 border-bottom">

                                                        <Draggable key={index1} draggableId={`tag-${index1}`} index={index1}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="bg-white rounded  py-3 px-1"
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                        backgroundColor: snapshot.isDragging ? '#f4f4f4' : 'white'
                                                                    }}
                                                                >
                                                                    {/* Renderização das tags */}
                                                                    <div>
                                                                        {editTagIndex === index1 ?
                                                                            <div className="col-12 d-flex align-items-center">
                                                                                <SubCategoryIcon color={categoryEdit?.color} />
                                                                                <div className="input-group">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        value={editTagName}
                                                                                        onChange={(e) => setEditTagName(e.target.value)}
                                                                                    />
                                                                                    <button
                                                                                        disabled={!editTagName}
                                                                                        className="btn btn-outline-secondary"
                                                                                        onClick={() => handleTagNameChange(elem1, index1, editTagName)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} className="pulse text-c-success" />
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-outline-secondary"
                                                                                        onClick={() => { setEditTagIndex(''); setEditTagName('') }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <div className="col-12 d-flex justify-content-between align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <FontAwesomeIcon icon={faGripLines} className="small text-secondary" />
                                                                                    <SubCategoryIcon color={categoryEdit?.color} />
                                                                                    <span className="fw-bold fadeItem" style={{ color: categoryEdit?.color }}>{elem1.name}</span>
                                                                                </div>
                                                                                <span
                                                                                    className="ms-2 text-c-secondary"
                                                                                    type="button"
                                                                                    onClick={() => { setEditTagIndex(index1); setEditTagName(elem1.name) }}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                                </span>
                                                                            </div>
                                                                        }
                                                                    </div>


                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        {/* <hr /> */}
                                                    </div>

                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => initialValues()}>Fechar</button>
                        <button onClick={() => handleSave()} type="button" className="btn btn-c-success" data-bs-dismiss="modal" disabled={handleDisableSave()}>Salvar</button>
                    </div>
                </div>
            </div>
        </div >
    );
}
