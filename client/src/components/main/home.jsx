import React, { useContext, useState } from "react";
import { SentenceContext } from "../../context/sentence";
import { UserContext } from "../../context/user";
import homeImg from "../../images/home.png";
import pencilIcon from "../../images/pencil-black.png";
import removeIcon from "../../images/remove.png";
const Home = () => {
  const { sentences, deleteSentence, changeSentence } =
    useContext(SentenceContext);
  const { user } = useContext(UserContext);
  const index = Math.floor(Math.random() * sentences.length);

  const [id, setId] = useState(); // the id of the sentence that is editing
  const [key, setKey] = useState(); // the key that is editing: title or content
  const [oldValue, setOldValue] = useState(); // the value that is editing
  const [value, setValue] = useState(); // the new value

  const dropdowns = document.getElementsByClassName("editor-dropdown"); // aray of all sentence editor-dropdown buttons
  const editorBtns = document.getElementsByClassName("editor-btn"); // aray of all sentence editor-btn buttons
  const saveOrCancel = document.getElementsByClassName("saveOrCancel-div"); // aray of all sentence saveOrCancel divs

  // function that change title/content or delete
  const edit = (id, key, value) => {
    setId(id);
    setKey(key);
    setValue(value);
    setOldValue(value);

    // loop that hide all the editors pencil and show the chosen sentence saveOrCancel div
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
    myTextarea.onchange = function (e) {
      setValue(e.target.value);
      this.id = this.value;
    };

    if (key === "title") {
      myTextarea.style.fontSize = "28px";
      myTextarea.style.fontWeight = "bold";
      myTextarea.style.marginTop = "40px";
      myTextarea.style.height = "100%";
    } else if (key === "content") {
      myTextarea.style.height = "200px";
    }

    myKey.replaceWith(myTextarea);
  };

  // save the admin changes on the title/content
  const save = () => {
    if (window.confirm("האם את בטוחה?")) {
      let myTextarea = document.getElementById(value);
      let myKey;
      if (key === "title") {
        myKey = document.createElement("h2");
        myKey.className = "home-title";
      } else if (key === "content") {
        myKey = document.createElement("p");
        myKey.className = "home-content";
      }

      changeSentence(id, { [key]: value });
      myKey.innerHTML = value;
      myKey.id = value;

      myTextarea.replaceWith(myKey);

      // loop that show all the editors pencil and hide the chosen sentence saveOrCancel div
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
      myKey.className = "home-title";
    } else if (key === "content") {
      myKey = document.createElement("p");
      myKey.className = "home-content";
    }

    myKey.innerHTML = oldValue;
    myKey.id = oldValue;

    myTextarea.replaceWith(myKey);

    // loop that show all the editors pencil and hide the chosen sentence saveOrCancel div
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
    <div className="home">
      <div style={{ flex: 1 }}>
        <img className="home-img" src={homeImg} alt="profile IMG" />

        <h2 className="home-description">
          ברוכים הבאים לסוף הטוב. באתר תמצאו תכנים הנוגעים בתקופה העדינה והעמוקה
          של סוף החיים.
          <br />
          המאמרים נכתבו מתוך העבודה שלי כאחות הוספיס בית , שם אני זוכה להיות חלק
          ממכלול שלם של מרחב הנוצר עבור מי שהגיעו לימיהם.ן האחרונים.
          <br />
          באתר תמצאו גם הרצאות העוסקות בסוף החיים כמרחב מעצים, ספרות רלוונטית
          וטקסטים שכתבו מי שחוו את חוויית הסף.
          <br />
          קבלת המוות מאפשרת לנו קיום נינוח יותר בחיים עצמם.
          <br />
          מאחלת לכם להתרווח, לקחת נשימה ולהסכים לגעת בעמקי נשמתכם,
          <br />
          עינת
        </h2>
      </div>
      <div style={{ flex: 1 }}>
        {user.role === "admin" ? (
          <div className="home-sentence-container">
            {sentences.map((sentence, index) => (
              <div key={index} className="home-sentence">
                <div className="editor">
                  <button
                    onClick={() => openEditor(sentence._id)}
                    className="editor-btn"
                    id={sentence._id}
                    style={{ backgroundImage: `url(${pencilIcon})` }}
                  ></button>

                  <div className="editor-dropdown" id={sentence._id}>
                    <button
                      onClick={() =>
                        edit(sentence._id, "title", sentence.title)
                      }
                    >
                      שינוי כותרת
                    </button>
                    <button
                      onClick={() =>
                        edit(sentence._id, "content", sentence.content)
                      }
                    >
                      שינוי תוכן
                    </button>
                  </div>
                  <div
                    className="saveOrCancel-div"
                    id={sentence._id}
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
                  onClick={() => deleteSentence(sentence._id)}
                  style={{ backgroundImage: `url(${removeIcon})` }}
                ></button>

                <h2 className="home-title" id={sentence.title}>
                  {sentence.title}
                </h2>
                <p className="home-content" id={sentence.content}>
                  {sentence.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h2 className="home-title">{sentences[index]?.title}</h2>
            <p className="home-content">{sentences[index]?.content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
