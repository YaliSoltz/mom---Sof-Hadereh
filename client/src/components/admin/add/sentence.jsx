import React, { useContext, useState } from "react";
import { SentenceContext } from "../../../context/sentence";

const Sentence = () => {
  const { addNewSentence } = useContext(SentenceContext);

  const [newSentence, setNewSentence] = useState({}); // new sentence object

  const loader = document.getElementById("loader"); // the circle loader

  // function that add new sentence and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    loader.style.display = "block";
    await addNewSentence(newSentence); // add newSentence to database
    loader.style.display = "none";
    document.getElementById("form").reset(); // reset the form
  };

  return (
    <div className="add-form">
      <svg id="loader" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
      <h2>הוספת משפט חדש</h2>
      <form
        id="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="כותרת:"
          required
          onChange={(e) =>
            setNewSentence({ ...newSentence, title: e.target.value })
          }
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="תוכן:"
          required
          onChange={(e) =>
            setNewSentence({ ...newSentence, content: e.target.value })
          }
        ></textarea>
        <button type="submit">הוספה</button>
      </form>
    </div>
  );
};

export default Sentence;
