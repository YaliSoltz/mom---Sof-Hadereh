import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // take the page up to the start
  function up() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="Navbar">
      <span
        className="nav-logo"
        onClick={() => {
          navigate("/");
            up();
        }}
      >
        הסוף הטוב
      </span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <Link
          to="/קצת-עליי"
          style={{ color: id === "קצת-עליי" && "white" }}
          onClick={() => {
              up();
          }}
        >
          קצת עליי
        </Link>
        <Link
          to="/הרצאות"
          style={{ color: id === "הרצאות" && "white" }}
          onClick={() => {
              up();
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
              up();
          }}
        >
          בלוג
        </Link>
        <Link
          to="/המלצות-קריאה"
          style={{ color: id === "המלצות-קריאה" && "white" }}
          onClick={() => {
            up();
          }}
        >
          המלצות קריאה
        </Link>
        <Link
          to="/מטופלים-משתפים"
          style={{ color: id === "מטופלים-משתפים" && "white" }}
          onClick={() => {
            up();
          }}
        >
          מטופלים משתפים
        </Link>
        <Link
          to="/יצירת-קשר"
          style={{ color: id === "יצירת-קשר" && "white" }}
          onClick={() => {
            up();
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
