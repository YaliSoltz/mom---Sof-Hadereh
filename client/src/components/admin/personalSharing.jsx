import React, { useContext } from "react";
import { PersonalSharingContext } from "../../context/personalSharing";
import { SharingContext } from "../../context/sharing";
import removeIcon from "../../images/remove-white.png";
import addIcon from "../../images/add.png";
import treeImg from "../../images/tree.jpg";

const PersonalSharing = () => {
  const { personalSharings, deletePersonalSharing } = useContext(
    PersonalSharingContext
  );
  const { addNewSharing } = useContext(SharingContext);
  console.log(personalSharings);

  return (
    <div className="personalSharing-container">
      {personalSharings.map((sharing, index) => (
        <div className="sharing-card" key={index}>
          <img src={treeImg} alt="error" className="sharing-card-img" />
          <div className="sharing-card-body">
            <button
              className="delete-btn"
              style={{ backgroundImage: `url(${removeIcon})` }}
              onClick={() => {
                deletePersonalSharing(sharing._id);
              }}
            ></button>

            <button
              className="add-btn"
              style={{ backgroundImage: `url(${addIcon})` }}
              onClick={() => {
                addNewSharing({
                  name: sharing.name,
                  age: sharing.age,
                  status: sharing.status,
                  content: sharing.content,
                });
                deletePersonalSharing(sharing._id);
              }}
            ></button>

            <h2 className="sharing-card-title">שם: {sharing.name}</h2>
            <h2 className="sharing-card-title">גיל: {sharing.age}</h2>
            <h2 className="sharing-card-title">מצב משפחתי: {sharing.status}</h2>
            <div className="sharing-card-info">
              {sharing.content.split(".").map((word, index, row) => (
                <p key={index}>{index === row.length - 1 ? "" : word + "."}</p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* {personalSharings.map((sharing, index) => (
        <div className="sharing-card" key={index}>
          <span
            className="delete-sharing"
            onClick={() => deletePersonalSharing(sharing._id)}
          >
            &times;
          </span>
          <button
            className="add-sharing"
            onClick={() => {
              addNewSharing({
                name: sharing.name,
                age: sharing.age,
                status: sharing.status,
                content: sharing.content,
              });
              deletePersonalSharing(sharing._id);
            }}
          >
            הוספה
          </button>
          <h3 className="sharing-card-title">שם: {sharing.name}</h3>
          <h3 className="sharing-card-title">גיל: {sharing.age}</h3>
          <h3 className="sharing-card-title">מצב משפחתי: {sharing.status}</h3>
          <h3 className="sharing-card-title">הסיפור שלי</h3>
          <div className="sharing-card-content">
            <p>{sharing.content}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default PersonalSharing;
