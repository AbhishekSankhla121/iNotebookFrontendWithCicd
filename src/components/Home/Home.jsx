import { useState, useContext, useEffect } from "react";
import "./Home.css";
import userContext from "../../context/createcontext";
import { Card } from "../Profile/Profile";
import Note from "./Notes";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const {
    userProfile,
    fetchUserProfile,
    fetchUserNote,
    addNote,
    userNote,
  } = useContext(userContext);

  useEffect(() => {
      if (localStorage.token === undefined) {
    navigate("/login");
  }
    fetchUserProfile();
    fetchUserNote();
  }, []);

  const handleCreatenote = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      tag: tag,
    };

    const a = await addNote({ data });
    if (a.success) {
      settitle("");
      setDescription("");
      setTag("");
    }
  };

  return (
    <>
      <div className="add-note row">
        <div className="add-left column a-center">
          {userProfile.success ? (
            <Card user={userProfile} />
          ) : (
            <p> profile loading...</p>
          )}
        </div>

        <div className="add-right">
          <div className="create-note column a-center">
            <h3 className={"margin"}> Create New Note</h3>
            <input
              type={"text"}
              placeholder={"Title"}
              className={"margin"}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              value={title}
            ></input>
            <input
              type="text"
              placeholder="description"
              className="margin"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            ></input>
            <input
              type="text"
              placeholder={"tag"}
              className="margin"
              onChange={(e) => {
                setTag(e.target.value);
              }}
              value={tag}
            ></input>
            <button
              className="margin  modal-button btn"
              onClick={handleCreatenote}
              children={"Create New note"}
            />
          </div>
          <div className="show-card ">
            <h2 className="notes-heading">Notes</h2>

            {userNote.success ? (
              <>
                <div className="note">
                  {userNote.note.map((note) => {
                    return <Note key={note._id} notes={note} />;
                  })}
                </div>
              </>
            ) : (
              <>loading</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
