import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { PersonalSharingContext } from "../../context/personalSharing";
import { ContactUsContext } from "./../../context/contactUs";
import image from "../../images/logout2.png";

const AdminNavBar = () => {
  const { setToken, user } = useContext(UserContext);
  const { personalSharings } = useContext(PersonalSharingContext);
  const { contactUs } = useContext(ContactUsContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("x-auth-token");
    setToken();
    navigate("/");
  };

  // take the page up to the start
  function up() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div className="admin-navBar">
        <Link to="/" className="active" onClick={() => up()}>
          היי {user.name}
        </Link>

        <Link to="/קצת-עליי" onClick={() => up()}>
          קצת עליי
        </Link>

        <Link to="/הרצאות" onClick={() => up()}>
          הרצאות
        </Link>
        {/* <Link to="/" onClick={() =>   up()}>
          ייעוץ משפחתי להוספיס בית
        </Link>
        <Link to="/" onClick={() =>   up()}>
          ביקורי בית פרטיים
        </Link> */}
        <Link to="/בלוג" onClick={() => up()}>
          בלוג
        </Link>
        <Link to="/המלצות-קריאה" onClick={() => up()}>
          המלצות קריאה
        </Link>
        <Link to="/מטופלים-משתפים" onClick={() => up()}>
          מטופלים משתפים
        </Link>
        <Link to="/add" onClick={() => up()}>
          הוספה
        </Link>
        <Link to="/contact-us" onClick={() => up()}>
          הודעות צור קשר
          <span className="badge"> {contactUs.length}</span>
        </Link>
        <Link to="/personal-sharing" onClick={() => up()}>
          שיתופים חדשים
          <span className="badge"> {personalSharings.length}</span>
        </Link>
        <img src={image} className="adminLogout" onClick={() => logout()}></img>
      </div>
    </div>
  );
};

export default AdminNavBar;
