import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { PersonalSharingContext } from "../../context/personalSharing";
import { ContactUsContext } from './../../context/contactUs';
import image from '../../images/logout2.png'

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

  return (
    <div>
      <div className="admin-navBar">
        <a className="active"  onClick={() => window.scrollTo(0, 0)}>היי {user.name}</a>

        <Link to="/קצת-עליי" onClick={() => window.scrollTo(0, 0)}>
          קצת עליי
        </Link>
        <Link to="/הרצאות" onClick={() => window.scrollTo(0, 0)}>
          הרצאות
        </Link>
        {/* <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          ייעוץ משפחתי להוספיס בית
        </Link>
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          ביקורי בית פרטיים
        </Link> */}
        <Link to="/בלוג" onClick={() => window.scrollTo(0, 0)}>
          בלוג
        </Link>
        <Link to="/המלצות-קריאה" onClick={() => window.scrollTo(0, 0)}>
          המלצות קריאה
        </Link>
        <Link to="/מטופלים-משתפים" onClick={() => window.scrollTo(0, 0)}>
          מטופלים משתפים
        </Link>
        <Link to="/add" onClick={() => window.scrollTo(0, 0)}>
          הוספה
        </Link>
        <Link to="/contact-us" onClick={() => window.scrollTo(0, 0)}>
          הודעות צור קשר
          <span className="badge"> {contactUs.length}</span>
        </Link>
        <Link to="/personal-sharing" onClick={() => window.scrollTo(0, 0)}>
          שיתופים חדשים
          <span className="badge"> {personalSharings.length}</span>
        </Link>
        <img src={image} className="adminLogout" onClick={() => logout()}></img>
      </div>
    </div>
  );
};

export default AdminNavBar;
