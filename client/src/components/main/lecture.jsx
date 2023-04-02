import React, { useContext, useState } from "react";
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

  const [id, setId] = useState(); // the id of the card that is editing
  const [key, setKey] = useState(); // the key that is editing: title or content
  const [oldValue, setOldValue] = useState(); // the value that is editing
  const [value, setValue] = useState(); // the new value

  const dropdowns = document.getElementsByClassName("editor-dropdown"); // aray of all card editor-dropdown buttons
  const editorBtns = document.getElementsByClassName("editor-btn"); // aray of all card editor-btn buttons
  const saveOrCancel = document.getElementsByClassName("saveOrCancel-div"); // aray of all card saveOrCancel divs

  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=972504060456&text=היי%20עינת,%20אני%20מתעניין/ת%20בהרצאת%20כותרתואשמח%20לשמוע%20עוד%20פרטים.";
  const emailUrl =
    "mailto:micasita102@gmail.com?subject=כותרת&body=היי%20עינת,%20אני%20מתעניין/ת%20בהרצאת%20כותרתואשמח%20לשמוע%20עוד%20פרטים.";

  // function that change title/content or delete
  const edit = (id, key, value) => {
    setId(id);
    setKey(key);
    setValue(value);
    setOldValue(value);

    // loop that hide all the editors pencil and show the chosen card saveOrCancel div
    for (let i = 0; i < editorBtns.length; i++) {
      editorBtns[i].style.display = "none";
      if (editorBtns[i].id === id) {
        saveOrCancel[i].style.display = "block";
      }
    }

    let myKey = document.getElementById(value);
    let myTextarea = document.createElement("textarea");
    myTextarea.innerHTML = value;
    myTextarea.id = value;
    myTextarea.style.width = "100%";
    myTextarea.style.height = "100%";
    myTextarea.onchange = function (e) {
      setValue(e.target.value);
      this.id = this.value;
    };
    myKey.replaceWith(myTextarea);
  };

  // save the admin changes on the title/content
  const save = () => {
    if (window.confirm("האם את בטוחה?")) {
      let myTextarea = document.getElementById(value);
      let myKey;
      if (key === "title") {
        myKey = document.createElement("h2");
        myKey.className = "card-title";
      } else if (key === "content") myKey = document.createElement("p");

      changeLecture(id, { [key]: value });
      myKey.innerHTML = value;
      myKey.id = value;

      myTextarea.replaceWith(myKey);

      // loop that show all the editors pencil and hide the chosen card saveOrCancel div
      for (let i = 0; i < editorBtns.length; i++) {
        editorBtns[i].style.display = "block";
        if (editorBtns[i].id === id) {
          saveOrCancel[i].style.display = "none";
        }
      }
    }
  };

  // cancel the admin cahnges on the title/content
  const cancel = () => {
    let myTextarea = document.getElementById(value);
    let myKey;
    if (key === "title") {
      myKey = document.createElement("h2");
      myKey.className = "card-title";
    } else if (key === "content") myKey = document.createElement("p");

    myKey.innerHTML = oldValue;
    myKey.id = oldValue;

    myTextarea.replaceWith(myKey);

    // loop that show all the editors pencil and hide the chosen card saveOrCancel div
    for (let i = 0; i < editorBtns.length; i++) {
      editorBtns[i].style.display = "block";
      if (editorBtns[i].id === id) {
        saveOrCancel[i].style.display = "none";
      }
    }
  };

  // function that open the editor dropdown
  function openEditor(id) {
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].id === id) dropdowns[i].style.display = "block";
      else dropdowns[i].style.display = "none";
    }
  }

  // close all the dropdowns menu if the user clicks outside of them
  window.onclick = function (e) {
    if (e.target.className !== "editor-btn") {
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
                  id={lecture._id}
                  style={{ backgroundImage: `url(${pencilIcon})` }}
                ></button>

                <div className="editor-dropdown" id={lecture._id}>
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
                <div
                  className="saveOrCancel-div"
                  id={lecture._id}
                  style={{ display: "none" }}
                >
                  <button className="cancel-btn" onClick={() => cancel()}>
                    ביטול
                  </button>
                  <button className="save-btn" onClick={() => save()}>
                    שמירת שינויים
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
            <h2 className="card-title" id={lecture.title}>
              {lecture.title}
            </h2>
            <div className="card-body">
              <p id={lecture.content}>{lecture.content}</p>
            </div>
            <div className="order">
              <span className="btn">להזמנה</span>
              <a
                className="icon"
                href="tel:+972504060456"
                style={{ backgroundImage: `url(${phone})` }}
                rel="noreferrer"

              ></a>
              <a
                className="icon"
                href={emailUrl.replace(/כותרת/g, lecture.title)}
                rel="noreferrer"

                style={{ backgroundImage: `url(${email})` }}
              ></a>
              <a
                href={whatsappUrl.replace("כותרת", lecture.title)}
                target="_blank"
                rel="noreferrer"
                className="icon" 
                style={{ backgroundImage: `url(${whatsApp})` }}
              >
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lecture;
