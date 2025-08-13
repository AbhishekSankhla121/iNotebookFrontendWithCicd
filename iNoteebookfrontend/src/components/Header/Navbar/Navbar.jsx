import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <>
      <nav>
        <div className="navLeft">
          <h3 className="nav-heading ">iNotebook</h3>
          {localStorage.token && (
            <ul className="mlr navLeft-column ">
              <li className={location.pathname === "/" ? "underline" : ""}>
                <Link to={"/"}>Home </Link>
              </li>

              <li
                className={location.pathname === "/profile" ? "underline" : ""}
              >
                <Link to={"/profile"}>Profile </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="navRight">
          {!localStorage.token ? (
            <ul>
              <li
                className={location.pathname === "/register" ? "underline" : ""}
              >
                <Link to={"/register"}>Register </Link>
              </li>
              <li className={location.pathname === "/login" ? "underline" : ""}>
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li
                className={location.pathname === "/register" ? "underline" : ""}
                onClick={handleLogout}
              >
                logout
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
