import React, { memo, useState, useContext } from "react";
import "./EditNoteModal.css";
import userContext from "../../context/createcontext";
import { useNavigate } from "react-router-dom";

const EditNoteModal = ({ note, close }) => {
  const navigate = useNavigate();
  const [updateTitle, setUpdateTitile] = useState(note.title);
  const [updateDescription, setUpdateDescription] = useState(note.description);
  const [updateTag, setUpdateTag] = useState(note.tag);
  const { updateNote } = useContext(userContext);
  const handleUpdateNote = (e) => {
    e.preventDefault();
    let data = {
      title: updateTitle,
      description: updateDescription,
      tag: updateTag,
      id: note._id,
    };
    updateNote({ data });
    close();
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        className="modalBackground"
        onClick={() => {
          close();
        }}
      >
        <div className="modalContainer" onClick={handleModalClick}>
          <button
            className="x-button"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            X
          </button>
          <div className="modalTitle">
            <h3>
              Edit:{" "}
              <input
                type={"text"}
                placeholder={"Title"}
                className={"margin input-title-box"}
                onChange={(e) => {
                  setUpdateTitile(e.target.value);
                }}
                value={updateTitle}
              ></input>
            </h3>
          </div>
          <hr />
          <div className="modalBody margin">
            <textarea
              rows="100"
              cols={"100"}
              placeholder="description"
              className="margin"
              onChange={(e) => {
                setUpdateDescription(e.target.value);
              }}
              value={updateDescription}
            ></textarea>
            <input
              type="text"
              placeholder={"tag"}
              className="margin tag-btn"
              onChange={(e) => {
                setUpdateTag(e.target.value);
              }}
              value={updateTag}
            ></input>
            <button
              className="margin modal-button width"
              onClick={handleUpdateNote}
              children={"Update Note"}
            />
          </div>
          <hr />
          <div className="modalFooter">
            <button
              className={"modal-button close-btn"}
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(EditNoteModal);
