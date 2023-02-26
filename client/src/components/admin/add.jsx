import React, { useState } from "react";
import Article from "./add/article";
import Lecture from "./add/lecture";
import Reading from "./add/reading";
import Sentence from "./add/sentence";
import Sharing from "./add/sharing";

const Add = () => {
  const [comp, setComp] = useState();
  const compSelector = (value) => {
    switch (value) {
      case "lecture":
        setComp(<Lecture />);
        break;
      case "article":
        setComp(<Article />);
        break;
      case "reading":
        setComp(<Reading />);
        break;
      case "sharing":
        setComp(<Sharing />);
        break;
      case "sentence":
        setComp(<Sentence />);
        break;

      default:
        break;
    }
  };

  return (
    <div className="add">
      <select defaultValue="" onChange={(e) => compSelector(e.target.value)}>
        <option value="" hidden>
          מה תרצי להוסיף?
        </option>
        <option value="lecture">הרצאה</option>
        <option value="article">מאמר</option>
        <option value="reading">המלצת קריאה</option>
        <option value="sharing">שיתוף חדש</option>
        <option value="sentence">משפט חדש</option>
      </select>
      
      {comp}
    </div>
  );
};

export default Add;
