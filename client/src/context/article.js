import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ArticleContext = createContext(); // the article context

const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]); // all the articles
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/articles/";

  // function that pulls all the articles from the server
  const getArticles = async () => {
    const { data } = await axios.get(url);
    setArticles(data);
  };

  // function that add new article
  const addNewArticle = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete article by id
  const deleteArticle = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change article
  const changeArticle = async (id, body) => {
    const result = await axios.patch(url + id, body);
    console.log(result);
    console.log(body);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getArticles();
  }, [refresh]);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        setArticles,
        addNewArticle,
        deleteArticle,
        changeArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleProvider;
