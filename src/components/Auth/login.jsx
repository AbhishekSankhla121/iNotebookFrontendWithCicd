import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../context/createcontext";

export default function Login() {
  const host = process.env.REACT_APP_HOST;
  const { Alert } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${host}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json_data = await response.json();
      if (json_data.success) {
        localStorage.setItem("token", json_data.jwt_token);
        navigate("/");
      }
      if (!json_data.success && !json_data.validationError) {
        return Alert({
          alertMessage: "Error:" + json_data.error,
          alertColor: "#EC7063 ",
        });
      }
      if (json_data.validationError) {
        return Alert({
          alertMessage: "Error:" + json_data.validationError[0].msg,
          alertColor: "#EC7063 ",
        });
      }
    } catch (error) {
      return Alert({
        alertMessage: "Error:" + "Login Internal Server",
        alertColor: "#EC7063 ",
      });
    }
  };
  return (
    <>
      <div className="login column a-center  loginpage">
        <h3 className="margin">Login page</h3>
        <input
          type="email"
          placeholder="abc@gmail.com"
          className="margin"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="margin"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          onClick={handleSubmit}
          children={"Login"}
          className="modal-button login-width "
        ></button>
      </div>
    </>
  );
}
