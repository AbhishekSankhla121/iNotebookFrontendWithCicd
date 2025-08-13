import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../../context/createcontext";
import { useContext } from "react";

export default function Register() {
  const host = process.env.REACT_APP_HOST;
  const { Alert } = useContext(userContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("user");
  const [dob, setDob] = useState("");
  const [rate, setRate] = useState(10);
  const [img, setImg] = useState("");
  const [imgprev, setImgprev] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgprev(reader.result);
        setImg(file);
      };
    } catch (error) {
      console.log("nothing to previwq");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("mobile", mobile);
    formdata.append("gender", gender);
    formdata.append("role", role);
    formdata.append("dob", dob);
    formdata.append("experience", rate);
    formdata.append("image", img);

    try {
      const response = await axios.post(`${host}/user/userdetail`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const json_data = response.data;

      if (json_data.success) {
        localStorage.setItem("token", json_data.jwt_token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.error) {
        return Alert({
          alertMessage: "Error: " + error.response.data.error,
          alertColor: "#EC7063 ",
        });
      }
      if (error.response.data.validationError) {
        return Alert({
          alertMessage: "Error: " + error.response.data.validationError[0].msg,
          alertColor: "#EC7063 ",
        });
      }
    }
  };

  return (
    <>
      <div className="Register">
        <form className={"column a-center margin"}>
          {imgprev && (
            <img className="margin" src={imgprev} alt="no img found"></img>
          )}
          <h3>Register</h3>
          <input
            className="margin"
            type="text"
            placeholder="Name: ABC"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="margin"
            type="email"
            placeholder="email: abc@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="margin"
            type="password"
            placeholder="*** password ***"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="margin"
            type="tel"
            placeholder="Number:0-9"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <div className="row margin">
            <label htmlFor="male" children="male" />
            <input
              type="radio"
              name="gender"
              value={"male"}
              id="male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label
              htmlFor="female"
              children={"Female"}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <input
              type="radio"
              name="gender"
              value={"female"}
              id="female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </div>
          <select
            className="margin"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value={"user"}>user</option>
            <option value={"admin"}>admin</option>
          </select>
          <div className="row margin">
            <label htmlFor="date" children={"Date of birth  : "}></label>
            <input
              type="date"
              id="date"
              onChange={(e) => {
                setDob(e.target.value);
              }}
            ></input>
          </div>
          <div className="row margin">
            <label htmlFor="range" children={"Experience"}></label>
            <input
              type="range"
              min={0}
              max={10}
              id="range"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
            <label htmlFor="range" children={rate}></label>
          </div>
          <input
            type={"file"}
            accept={"image/*"}
            onChange={(e) => {
              handleImage(e);
            }}
            name="upload image"
          ></input>
          <input
            className="margin modal-button"
            type={"button"}
            value={"Register"}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
}
