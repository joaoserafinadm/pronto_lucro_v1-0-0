import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEdit, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function EditSubTagCard(props) {

    const { tag, index, editTagIndex, editTagName, setEditTagIndex, setEditTagName, handleTagNameChange, editSubTagIndex, setEditSubTagIndex, setEditSubTagName, handleSubTagNameChange, handleSubTagOrderChange } = props


    return (
        <div className="bg-white rounded">
            {editTagIndex === index ?
                <div className="col-12 d-flex align-items-center">
                    <div style={{ height: "12px", width: "12px", border: `2px solid ${tag.color}` }} className="rounded-circle ms-2 me-2"></div>
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
                            onClick={() => handleTagNameChange(tag, index, editTagName)}
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
                        <div style={{ height: "12px", width: "12px", border: `2px solid ${tag.color}` }} className="rounded-circle ms-2 me-2"></div>
                        <span className="fw-bold fadeItem" style={{ color: tag.color }}>{tag.name}</span>
                    </div>
                    <span
                        className="ms-2 text-c-secondary"
                        type="button"
                        onClick={() => { setEditTagIndex(index); setEditSubTagIndex({ tagIndex: '', subTagIndex: '' }); setEditTagName(tag.name) }}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </span>
                </div>
            }
            <hr />
            <DragDropContext onDragEnd={(res) => handleSubTagOrderChange(res, index)}>
                <Droppable droppableId={`subtags-droppable-${index}`}>
                    {(provided, snapshot) => (
                        <div
                            className="rounded"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                backgroundColor: snapshot.isDraggingOver ? '#f4f4f4' : 'transparent',
                                padding: 4,
                                width: '100%',
                            }}
                        >
                            {tag.subTags?.map((subTag, subIndex) => (
                                <EditSubTagCard
                                    key={subIndex}
                                    subTag={subTag}
                                    subIndex={subIndex}
                                    tagIndex={index}
                                    editSubTagIndex={editSubTagIndex}
                                    editSubTagName={editSubTagName}
                                    setEditSubTagIndex={setEditSubTagIndex}
                                    setEditSubTagName={setEditSubTagName}
                                    handleSubTagNameChange={handleSubTagNameChange}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
