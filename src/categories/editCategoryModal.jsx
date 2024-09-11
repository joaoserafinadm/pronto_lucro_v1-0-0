import { faArrowTurnUp, faCheck, faEdit, faGripLines, faPlus, faTag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import Cookie from 'js-cookie';
import axios from "axios";
import { showModalBs } from "../../utils/modalControl";
import scrollTo from "../../utils/scrollTo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function EditCategoryModal(props) {

    const token = jwt.decode(Cookie.get('auth'));
    const { categorySelected, categories, section, dataFunction, id } = props;

    const [categoryEdit, setCategoryEdit] = useState(categorySelected);
    const [editTagIndex, setEditTagIndex] = useState('');
    const [editSubTagIndex, setEditSubTagIndex] = useState({ tagIndex: '', subTagIndex: '' });

    const [editTagName, setEditTagName] = useState('');
    const [editSubTagName, setEditSubTagName] = useState('');
    const [editCategoryName, setEditCategoryName] = useState(''); // Estado para o nome da categoria
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        setCategoryEdit(categorySelected); 
    }, [categorySelected]);

    const initialValues = () => {
        setEditTagIndex('');
        setEditTagName('');
        setEditSubTagIndex({ tagIndex: '', subTagIndex: '' });
        setEditSubTagName('');
        setEditCategoryName(''); // Reconfigurar o estado do nome da categoria
    };

    const handleTagNameChange = (elem, index, newTagName) => {
        let updatedCategory = { ...categoryEdit };
        updatedCategory.tags[index].tag = newTagName;
        setCategoryEdit(updatedCategory);
        setEditTagIndex('');
        setEditTagName('');
    };

    const handleSubTagNameChange = (elem1, tagIndex, subTagIndex, newSubTagName) => {
        let updatedCategory = { ...categoryEdit };
        updatedCategory.tags[tagIndex].subTags[subTagIndex].subTag = newSubTagName;
        setCategoryEdit(updatedCategory);
        setEditSubTagIndex('');
        setEditSubTagName('');
    };

    const handleCategoryNameChange = () => {
        let updatedCategory = { ...categoryEdit };
        updatedCategory.category = editCategoryName;
        setCategoryEdit(updatedCategory);
        setEditCategoryName('');
    };

    const handleDisableSave = () => {
        if (categorySelected === categoryEdit) return true
        else return false
    }

    const handleSave = async () => {
        const data = {
            user_id: token.sub,
            section: section,
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

        let updatedTags = Array.from(categoryEdit.tags);
        const [movedTag] = updatedTags.splice(source.index, 1);
        updatedTags.splice(destination.index, 0, movedTag);

        setCategoryEdit({ ...categoryEdit, tags: updatedTags });
    };

    const handleSubTagOrderChange = (res, tagIndex) => {
        const { source, destination } = res;
        if (!destination) return;

        let updatedTags = [...categoryEdit.tags];
        let subTags = Array.from(updatedTags[tagIndex].subTags);
        const [movedSubTag] = subTags.splice(source.index, 1);
        subTags.splice(destination.index, 0, movedSubTag);

        updatedTags[tagIndex].subTags = subTags;
        setCategoryEdit({ ...categoryEdit, tags: updatedTags });
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
                                    {editCategoryName ? (
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
                                                    onClick={() => setEditCategoryName('')}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-12 d-flex my-1 align-items-center justify-content-between">
                                            <div className="d-flex my-1 align-items-center">

                                                <div style={{ backgroundColor: categoryEdit?.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>

                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className="bold">{categoryEdit?.category}</span>

                                                </div>
                                            </div>
                                            <span
                                                className="ms-2 text-c-secondary"
                                                type="button"
                                                onClick={() => setEditCategoryName(categoryEdit?.category)}
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
                                            <div className="rounded"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{
                                                    backgroundColor: snapshot.isDraggingOver ? '#f4f4f4' : 'transparent',
                                                    padding: 4,
                                                    width: '100%',
                                                }}
                                            >
                                                {categoryEdit?.tags?.map((elem1, index1) => (
                                                    <Draggable key={index1} draggableId={`tag-${index1}`} index={index1}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="bg-white rounded"
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    backgroundColor: snapshot.isDragging ? '#f4f4f4' : 'white'
                                                                }}
                                                            >
                                                                {/* Renderização das tags */}
                                                                <div>
                                                                    {editTagIndex === index1 ?
                                                                        <div className="col-12 d-flex align-items-center">
                                                                            <div style={{ height: "12px", width: "12px", border: `2px solid ${categoryEdit?.color}` }} className="rounded-circle ms-2 me-2"></div>
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
                                                                                <div style={{ height: "12px", width: "12px", border: `2px solid ${categoryEdit?.color}` }} className="rounded-circle ms-2 me-2"></div>
                                                                                <span className="fw-bold fadeItem" style={{ color: categoryEdit?.color }}>{elem1.tag}</span>
                                                                            </div>
                                                                            <span
                                                                                className="ms-2 text-c-secondary"
                                                                                type="button"
                                                                                onClick={() => { setEditTagIndex(index1); setEditSubTagIndex({ tagIndex: '', subTagIndex: '' }); setEditTagName(elem1.tag) }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faEdit} />
                                                                            </span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <hr />

                                                                {/* SubTags Drag and Drop */}
                                                                <DragDropContext onDragEnd={(res) => handleSubTagOrderChange(res, index1)}>
                                                                    <Droppable droppableId={`subtags-droppable-${index1}`}>
                                                                        {(provided, snapshot) => (
                                                                            <div className=" rounded"
                                                                                ref={provided.innerRef}
                                                                                {...provided.droppableProps}
                                                                                style={{
                                                                                    backgroundColor: snapshot.isDraggingOver ? '#f4f4f4' : 'transparent',
                                                                                    padding: 4,
                                                                                    width: '100%',
                                                                                }}
                                                                            >
                                                                                {elem1.subTags?.map((elem2, index2) => (
                                                                                    <Draggable key={index2} draggableId={`subtag-${index1}-${index2}`} index={index2}>
                                                                                        {(provided, snapshot) => (
                                                                                            <div
                                                                                                ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                className="bg-white rounded"
                                                                                                style={{
                                                                                                    ...provided.draggableProps.style,
                                                                                                    backgroundColor: snapshot.isDragging ? '#f4f4f4' : 'white'
                                                                                                }}
                                                                                            >
                                                                                                {/* Renderização das subTags */}
                                                                                                {(editSubTagIndex.tagIndex === index1 && editSubTagIndex.subTagIndex === index2) ?
                                                                                                    <div className="col-12 d-flex align-items-center">
                                                                                                        <FontAwesomeIcon
                                                                                                            className="me-2 ms-4"
                                                                                                            icon={faArrowTurnUp}
                                                                                                            style={{ transform: 'rotate(90deg)', color: categoryEdit?.color }}
                                                                                                        />
                                                                                                        <div className="input-group">
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                value={editSubTagName}
                                                                                                                onChange={(e) => setEditSubTagName(e.target.value)}
                                                                                                            />
                                                                                                            <button
                                                                                                                disabled={!editSubTagName}
                                                                                                                className="btn btn-outline-secondary"
                                                                                                                onClick={() => handleSubTagNameChange(elem1, index1, index2, editSubTagName)}
                                                                                                            >
                                                                                                                <FontAwesomeIcon icon={faCheck} className="pulse text-c-success" />
                                                                                                            </button>
                                                                                                            <button
                                                                                                                className="btn btn-outline-secondary"
                                                                                                                onClick={() => { setEditSubTagIndex({ tagIndex: '', subTagIndex: '' }); setEditSubTagName('') }}
                                                                                                            >
                                                                                                                <FontAwesomeIcon icon={faXmark} className="pulse text-c-danger" />
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    :
                                                                                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                                                                                        <div className="d-flex align-items-center small fadeItem">
                                                                                                            <FontAwesomeIcon icon={faGripLines} className="small text-secondary" />
                                                                                                            <FontAwesomeIcon
                                                                                                                className="me-2 ms-4"
                                                                                                                icon={faArrowTurnUp}
                                                                                                                style={{ transform: 'rotate(90deg)', color: categoryEdit?.color }}
                                                                                                            />
                                                                                                            <span className="bold fadeItem" style={{ color: categoryEdit?.color }}>{elem2.subTag}</span>
                                                                                                        </div>
                                                                                                        <span
                                                                                                            className="ms-2 text-c-secondary"
                                                                                                            type="button"
                                                                                                            onClick={() => { setEditSubTagIndex({ tagIndex: index1, subTagIndex: index2 }); setEditTagIndex(''); setEditSubTagName(elem2.subTag) }}
                                                                                                        >
                                                                                                            <FontAwesomeIcon icon={faEdit} />
                                                                                                        </span>
                                                                                                    </div>
                                                                                                }
                                                                                                <hr />
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
                                                        )}
                                                    </Draggable>
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
