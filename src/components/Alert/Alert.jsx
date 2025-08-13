import "./Alert.css";
import userContext from "../../context/createcontext";
import { useContext, useState } from "react";

export default function Alert() {
  const { color, message } = useContext(userContext);

  return (
    <>
      {message && (
        <div className="alert" style={{ background: color }}>
          <h3 className="ml">{message}</h3>
        </div>
      )}
    </>
  );
}
