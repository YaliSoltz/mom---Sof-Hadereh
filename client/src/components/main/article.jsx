import React, { useContext, useState } from "react";
import { ArticleContext } from "../../context/article";
import { UserContext } from "../../context/user";
import pencilIcon from "../../images/pencil-black.png";
import removeIcon from "../../images/remove.png";
const Article = () => {
  const { articles, deleteArticle, changeArticle } = useContext(ArticleContext);
  const { user } = useContext(UserContext);

  const [id, setId] = useState(); // the id of the card that is editing
  const [key, setKey] = useState(); // the key that is editing: title or content
  const [oldValue, setOldValue] = useState(); // the value that is editing
  const [value, setValue] = useState(); // the new value

  const dropdowns = document.getElementsByClassName("editor-dropdown"); // aray of all card editor-dropdown buttons
  const editorBtns = document.getElementsByClassName("editor-btn"); // aray of all card editor-btn buttons
  const saveOrCancel = document.getElementsByClassName("saveOrCancel-div"); // aray of all card saveOrCancel divs

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

      changeArticle(id, { [key]: value });
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
      {articles.map((article, index) => (
        <div
          key={index}
          className="card"
          style={{
            backgroundImage: `url(${article.imgUrl.url})`,
          }}
        >
          {user.role === "admin" && (
            <>
              <div className="editor">
                <button
                  onClick={() => openEditor(article._id)}
                  className="editor-btn"
                  id={article._id}
                  style={{ backgroundImage: `url(${pencilIcon})` }}
                ></button>

                <div className="editor-dropdown" id={article._id}>
                  <button
                    onClick={() => edit(article._id, "title", article.title)}
                  >
                    שינוי כותרת
                  </button>
                  <button
                    onClick={() =>
                      edit(article._id, "content", article.content)
                    }
                  >
                    שינוי תוכן
                  </button>
                </div>
                <div
                  className="saveOrCancel-div"
                  id={article._id}
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
                onClick={() => deleteArticle(article._id)}
                style={{ backgroundImage: `url(${removeIcon})` }}
              ></button>
            </>
          )}
          <div className="card-content">
            <h2 className="card-title" id={article.title}>
              {article.title}
            </h2>
            <div className="card-body">
              <p id={article.content}>{article.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;
