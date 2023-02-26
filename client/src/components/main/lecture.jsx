import React, { useContext } from "react";
import { LectureContext } from "../../context/lecture";
import { UserContext } from "../../context/user";
import whatsApp from "../../images/whatsApp-white.png";
import email from "../../images/email-white.png";
import phone from "../../images/phone-white.png";
import pencilIcon from "../../images/pencil-black.png";
import removeIcon from "../../images/remove.png";

const Lecture = () => {
  const { lectures, deleteLecture, changeLecture } = useContext(LectureContext);
  const { user } = useContext(UserContext);

  const dropdowns = document.getElementsByClassName("editor-dropdown"); // aray of all card editor-dropdown buttons

  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=972543997375&text=היי%20יה-לי,%20אני%20מתעניין%20בהרצאת%20כותרת%20והייתי%20שמח%20לשמוע%20עוד%20פרטים.";
  const emailUrl =
    "mailto:yali.soltz11@gmail.com?subject=כותרת&body=היי%20יה-לי,%20אני%20מתעניין%20בהרצאת%20כותרת%20והייתי%20שמח%20לשמוע%20עוד%20פרטים.";

  // funcion that change title/content or delete
  const edit = (id, key, value) => {
    let text;
    if (key === "title") text = "הכניסי כותרת חדשה";
    else if (key === "content") text = "הכניסי תוכן חדש";
    value = prompt(text, value);
    if (value) changeLecture(id, { [key]: value });
    console.log(value);
  };

  // function that open the editor dropdown
  function openEditor(id) {
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].id == id) dropdowns[i].style.display = "block";
      else dropdowns[i].style.display = "none";
    }
  }

  // close all the dropdowns menu if the user clicks outside of them
  window.onclick = function (e) {
    if (e.target.className != "editor-btn") {
      for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].style.display === "block")
          dropdowns[i].style.display = "none";
      }
    }
  };

  return (
    <div className="card-container">
      {lectures.map((lecture, index) => (
        <div
          key={index}
          className="card"
          style={{
            backgroundImage: `url(${lecture.imgUrl.url})`,
          }}
        >
          {user.role === "admin" && (
            <>
              <div className="editor">
                <button
                  onClick={() => openEditor(lecture._id)}
                  className="editor-btn"
                  style={{ backgroundImage: `url(${pencilIcon})` }}
                ></button>
                <div id={lecture._id} className="editor-dropdown">
                  <button
                    onClick={() => edit(lecture._id, "title", lecture.title)}
                  >
                    שינוי כותרת
                  </button>
                  <button
                    onClick={() =>
                      edit(lecture._id, "content", lecture.content)
                    }
                  >
                    שינוי תוכן
                  </button>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteLecture(lecture._id)}
                style={{ backgroundImage: `url(${removeIcon})` }}
              ></button>
            </>
          )}
          <div className="card-content">
            <h2 className="card-title">{lecture.title}</h2>
            <div className="card-body">
              {lecture.content.split(".").map((word, index, row) => (
                <p key={index}>{index === row.length - 1 ? "" : word + "."}</p>
              ))}
            </div>
            <div className="order">
              <span className="btn">להזמנה</span>
              <a
                className="icon"
                href="tel:+972543997375"
                dir="ltr"
                style={{ backgroundImage: `url(${phone})` }}
              ></a>
              <a
                className="icon"
                href={emailUrl.replace(/כותרת/g, lecture.title)}
                style={{ backgroundImage: `url(${email})` }}
              ></a>
              <a
                className="icon"
                href={whatsappUrl.replace("כותרת", lecture.title)}
                target="_blank"
                style={{ backgroundImage: `url(${whatsApp})` }}
              ></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lecture;
