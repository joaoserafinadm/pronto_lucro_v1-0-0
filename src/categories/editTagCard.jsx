import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EditTagCard(props) {

    const { editCategoryName, setEditCategoryName, handleCategoryNameChange, categoryEdit } = props

    return (
        <div className="col-12 d-flex my-1 align-items-center">
            {editCategoryName ? (
                <div className="col-12 d-flex align-items-center">
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
                <div className="col-12 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div style={{ backgroundColor: categoryEdit?.color, height: "17px", width: "17px" }} className="rounded-circle me-2"></div>
                        <span className="bold">{categoryEdit?.category}</span>
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
    );
};

