import React, { useContext, useState } from "react";
import { SentenceContext } from "../../../context/sentence";

const Sentence = () => {
  const { addNewSentence } = useContext(SentenceContext);

  const [newSentence, setNewSentence] = useState({}); // new sentence object

  // function that add new sentence and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addNewSentence(newSentence); // add newSentence to database
    document.getElementById("form").reset(); // reset the form
  };

  return (
    <div className="add-form">
      <h2>הוספת משפט חדש</h2>
      <form
        id="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* <input
        type="text"
        placeholder="כותרת:"
        required
        onChange={(e) =>
          setNewSentence({ ...newSentence, title: e.target.value })
        }
      /> */}
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
