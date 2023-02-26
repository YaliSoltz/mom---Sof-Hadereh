import React, { useContext, useState } from "react";
import { LectureContext } from "../../../context/lecture";

const Lecture = () => {
  const { addNewLecture } = useContext(LectureContext);

  const [newLecture, setNewLecture] = useState({}); // new lecture object

  // function that add new lecture and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addNewLecture(newLecture); // add newLecture to database
    document.getElementById("form").reset(); // reset the form
  };

  // function that set the newLecture obj with imgUrl
  const setImgUrl = (e) => {
    const file = e.target.files[0]; // defines file as an object who contain image data
    const reader = new FileReader(); // defines new instance from FileReader class
    reader.readAsDataURL(file); // converts the file to base64

    //func that get the image in base64 and add it to newLecture object
    reader.onloadend = () => {
      console.log(reader.result);
      setNewLecture({ ...newLecture, imgUrl: reader.result });
    };
  };

  return (
    <div className="add-form">
      <h2>הוספת הרצאה חדשה</h2>
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
            setNewLecture({ ...newLecture, title: e.target.value })
          }
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="תוכן:"
          required
          onChange={(e) =>
            setNewLecture({ ...newLecture, content: e.target.value })
          }
        ></textarea>
        <input type="file" required onChange={(e) => setImgUrl(e)} />
        <button type="submit">הוספה</button>
      </form>
    </div>
  );
};

export default Lecture;
