import userContext from "../../context/createcontext";
import { useContext, useEffect } from "react";
import "./Profile.css";
// eslint-disable-next-line
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { fetchUserProfile, userProfile } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token === undefined) {
      navigate("/login");
    }
    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="profile">
        {userProfile.success ? (
          <Card user={userProfile} />
        ) : (
          <p> profile loading...</p>
        )}
      </div>
    </>
  );
}
const Card = ({ user }) => {
  const host = process.env.REACT_APP_HOST;
  return (
    <>
      {user.success && (
        <div className=" column a-center">
          <h1>User Profile</h1>
          {user.user.map((item, index) => (
            <div className="column a-center" key={index}>
              <img src={`${host}/image/${item.profile}`} alt="" />
              <h3 className="margin">Name: {item.name}</h3>
              <div className="details">
                <p className="margin">Email: {item.email}</p>
                <p className="margin">Mobile: {item.mobile}</p>
                <p className="margin">
                  Date of birth: {item.dob.split("T")[0]}
                </p>
                <p className="margin">Experience: {item.experience} years</p>
                <p className="margin">Gender: {item.gender}</p>
                <p className="margin">Role as: {item.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { Card };
