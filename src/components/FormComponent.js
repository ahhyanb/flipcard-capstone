import React from "react";

function FormComponent({ front, back, onFrontChange, onBackChange, onSubmit, onCancel, isEditMode }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front side
          </label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            value={front}
            onChange={onFrontChange}
            placeholder="Enter front of the card"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back side
          </label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            value={back}
            onChange={onBackChange}
            placeholder="Enter back of the card"
          />
        </div>

        <div className="d-flex justify-content-start gap-3">
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={onCancel}
          >
            <i className="bi bi-x-lg"></i> {isEditMode ? 'Cancel' : 'Done'}
          </button>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#8B4513', color: 'white' }}
          >
            <i className="bi bi-check-lg"></i> Save
          </button>
        </div>
      </form>
    </>
  );
}

export default FormComponent;
