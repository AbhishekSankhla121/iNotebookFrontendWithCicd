import { useEffect, useState } from "react";
import userContext from "./createcontext";

const Userstate = (props) => {
    const host = process.env.REACT_APP_HOST;
    const [userProfile, setUserProfile] = useState({});
    const [userNote, setUserNote] = useState('');
    const [color, setColor] = useState("");
    const [message, setMessage] = useState("");

    const Alert = ({ alertMessage, alertColor }) => {
        setColor(alertColor);
        setMessage(alertMessage);

        setTimeout(() => {
            setMessage("");
            setColor("");
        }, 3000)
    }



    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${host}/user/userdetail`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.token
                }
            });
            const json_data = await response.json();
            setUserProfile(json_data);
        } catch (error) {
            console.log("frontend fetch -> /userprofile error", error)
        }
    }

    const addNote = async ({ data }) => {
        try {


            const response = await fetch(`${host}/notes/addnote`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            fetchUserNote();
            const json = await response.json();

            if (json.success) {
                Alert({ alertMessage: "Success: Note Add successfully", alertColor: "#148F77" });

            }

            if (json.message) {
                Alert({ alertMessage: `Error:${json.message.errors[0].msg}`, alertColor: "#EC7063" });
            }
            return json;

        } catch (error) {

            Alert({ alertMessage: `${error.errors}`, alertColor: "#148F77" });

        }
    }

    const fetchUserNote = async () => {
        try {
            const response = await fetch(`${host}/notes/fetchnote`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.token
                },
            });
            const notes = await response.json();
            setUserNote(notes);
        } catch (error) {
            console.log("frontend fetch -> /ftechnote error", error)
        }
    }

    const deleteNote = async ({ id }) => {
        try {
            const response = await fetch(`${host}/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json"
                }
            });
            fetchUserNote();
            const json = await response.json();

            if (json.success) {
                Alert({ alertMessage: "Success: Note Delete successfully", alertColor: "#148F77" });
            }
        } catch (error) {
            console.log("frontend fetch -> /deletenote error", error)
        }
    }

    const updateNote = async ({ data }) => {
        try {

            const { id, title, description, tag } = data;
            console.log(id, title, description, tag)
            const response = await fetch(`${host}/notes/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.token,
                },
                body: JSON.stringify({
                    "title": title.length === 0 ? " " : title,
                    "description": description.length === 0 ? ' ' : description,
                    "tag": tag.trim().length === 0 ? "Genral" : tag,
                })
            });
            const json = await response.json();

            fetchUserNote();
            if (json.success) {
                Alert({ alertMessage: "Success: Note updated successfully", alertColor: "#148F77" });

            }

        } catch (error) {
            console.log("frontend fetch -> /Updatenote error", error)
        }
    }

    return (<>
        <userContext.Provider value={{
            fetchUserProfile,
            userProfile,
            fetchUserNote,
            addNote,
            userNote,
            deleteNote,
            updateNote,
            color,
            message,
            Alert
        }}>
            {props.children}
        </userContext.Provider>
    </>)
}

export default Userstate;