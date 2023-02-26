import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SentenceContext = createContext(); // the sentence context

const SentenceProvider = ({ children }) => {
  const [sentences, setSentences] = useState([]); // all the sentences
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/sentences/";

  // function that pulls all the sentences from the server
  const getSentences = async () => {
    const { data } = await axios.get(url);
    setSentences(data);
  };

  // function that add new sentence
  const addNewSentence = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete sentence by id
  const deleteSentence = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change sentence
  const changeSentence = async (id, body) => {
    const result = await axios.patch(url + id, body);
    console.log(result);
    console.log(body);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getSentences(refresh);
  }, []);

  return (
    <SentenceContext.Provider
      value={{
        sentences,
        setSentences,
        addNewSentence,
        deleteSentence,
        changeSentence,
      }}
    >
      {children}
    </SentenceContext.Provider>
  );
};

export default SentenceProvider;
