import React, { useContext, useState } from "react";
import userContext from "../../context/createcontext";
import EditNoteModal from "./EditNoteModal";

const Note = ({ notes }) => {
  const [showModal, setShowModal] = useState(false);

  const { deleteNote } = useContext(userContext);
  const handleDeleteNote = (e, id) => {
    e.preventDefault();
    deleteNote((id = { id }));
  };
  const handleEditNote = (e, noteDetails) => {
    e.preventDefault();
    setShowModal(true);
  };
  const closemodal = () => setShowModal(false);
  return (
    <>
      {showModal && <EditNoteModal note={notes} close={closemodal} />}
      <div className="note-card margin">
        <div className="row j-btw note-head">
          <div className="note-card-heading">
            <h5> {notes.title} </h5>
          </div>
          <div>
            <i
              className="fa-solid fa-pen-to-square mr"
              onClick={(e) => {
                handleEditNote(e, { notes });
              }}
            ></i>
            <i
              className="fa-solid fa-trash mr"
              onClick={(e) => {
                handleDeleteNote(e, notes._id);
              }}
            ></i>
          </div>
        </div>
        <div
          className="note-card-description"
          onClick={(e) => {
            handleEditNote(e, { notes });
          }}
        >
          <p className="note-description">{notes.description}</p>
        </div>
        <div className="note-card-details">
          {"[ "}
          <p className="tag">{notes.tag.replace(/\s/g, "")}</p>
          <p>
            {"-"}
            {notes.date.split("T")[0]}
            {" ]"}
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(Note);
