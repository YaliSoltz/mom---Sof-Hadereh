import React, { useContext } from "react";
import { ArticleContext } from "../../context/article";
import { UserContext } from "../../context/user";
import pencilIcon from "../../images/pencil-black.png";
import removeIcon from "../../images/remove.png";
const Article = () => {
  const { articles, deleteArticle, changeArticle } = useContext(ArticleContext);
  const { user } = useContext(UserContext);

  const dropdowns = document.getElementsByClassName("editor-dropdown"); // aray of all card editor-dropdown buttons

  // funcion that change title/content or delete
  const edit = (id, key, value) => {
    let text;
    if (key === "title") text = "הכניסי כותרת חדשה";
    else if (key === "content") text = "הכניסי תוכן חדש";
    value = prompt(text, value);
    if (value) changeArticle(id, { [key]: value });
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
                  style={{ backgroundImage: `url(${pencilIcon})` }}
                ></button>
                <div id={article._id} className="editor-dropdown">
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
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteArticle(article._id)}
                style={{ backgroundImage: `url(${removeIcon})` }}
              ></button>
            </>
          )}
          <div className="card-content">
            <h2 className="card-title">{article.title}</h2>
            <div className="card-body">
              {article.content?.split(".").map((word, index, row) => (
                <p key={index}>{index === row.length - 1 ? "" : word + "."}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;
