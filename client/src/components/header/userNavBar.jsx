import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="Navbar">
      <span
        className="nav-logo"
        onClick={() => {
          navigate("/");
          window.scrollTo(0, 0);
        }}
      >
        הסוף הטוב
      </span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <Link
          to="/קצת-עליי"
          style={{ color: id === "קצת-עליי" && "white" }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          קצת עליי
        </Link>
        <Link
          to="/הרצאות"
          style={{ color: id === "הרצאות" && "white" }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          הרצאות
        </Link>

        {/* <Link to="/" className="labelNav" onClick={() => {setChosenLink('bio') ;window.scrollTo(0, 0)}}>
          ייעוץ משפחתי להוספיס בית
        </Link>
        <Link to="/" className="labelNav" onClick={() => {setChosenLink('bio') ;window.scrollTo(0, 0)}}>
          ביקורי בית פרטיים
        </Link> */}

        <Link
          to="/בלוג"
          style={{ color: id === "בלוג" && "white" }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          בלוג
        </Link>
        <Link
          to="/המלצות-קריאה"
          style={{ color: id === "המלצות-קריאה" && "white" }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          המלצות קריאה
        </Link>
        <Link
          to="/מטופלים-משתפים"
          style={{ color: id === "מטופלים-משתפים" && "white" }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          מטופלים משתפים
        </Link>
        <Link
          to="/יצירת-קשר"
          style={{ color: id === "יצירת-קשר" && "white" }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          יצירת קשר
        </Link>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default UserNavBar;
