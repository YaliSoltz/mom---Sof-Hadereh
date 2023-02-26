import React, { useContext, useState } from "react";
import { PersonalSharingContext } from "../../context/personalSharing";
import { SharingContext } from "../../context/sharing";
import { UserContext } from "../../context/user";
import removeIcon from "../../images/remove-white.png";
import treeImg from "../../images/tree.jpg";

const Sharing = () => {
  const { addNewPersonalSharing } = useContext(PersonalSharingContext);
  const { sharings, deleteSharing } = useContext(SharingContext);
  const { user } = useContext(UserContext);

  const [newPersonalSharing, setNewPersonalSharing] = useState({}); // new PersonalSharing object
  const [sended, setSended] = useState(false); // change the modal if the sharing is sended
  const [open, setOpen] = useState(false); // show the modal or not

  // function that add new PersonalSharing and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    addNewPersonalSharing(newPersonalSharing);
    setSended(true);
  };

  // When the user clicks anywhere outside of the sharing form it close it
  window.onclick = function (e) {
    if (e.target === document.getElementsByClassName("modal")[0])
      setOpen(false);
  };

  return (
    <div className="sharing-container">
      {sharings.map((sharing, index) => (
        <div className="sharing-card" key={index}>
          <img src={treeImg} alt="" className="sharing-card-img" />
          <div className="sharing-card-body">
            {user.role === "admin" && (
              <button
                className="delete-btn"
                onClick={() => deleteSharing(sharing._id)}
                style={{ backgroundImage: `url(${removeIcon})` }}
              ></button>
            )}
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

      {user.role != "admin" && (
        <button className="modal-open" onClick={() => setOpen(true)}>
          הוספת שיתוף
        </button>
      )}
      {open ? (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setOpen(false)}>
              &times;
            </span>

            {sended ? (
              <div className="sharing-sended">
                <h1>השיתוף שלך הוא השראה לאנשים אחרים, תודה.</h1>
              </div>
            ) : (
              <form
                className="sharing-form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <input
                  name="name"
                  type="text"
                  onChange={(e) =>
                    setNewPersonalSharing({
                      ...newPersonalSharing,
                      name: e.target.value,
                    })
                  }
                  placeholder="שם: (מוזמן/ת להישאר אנונימי/ת)"
                />

                <input
                  name="age"
                  type="number"
                  placeholder="גיל:"
                  min={1}
                  required
                  onChange={(e) =>
                    setNewPersonalSharing({
                      ...newPersonalSharing,
                      age: parseInt(e.target.value),
                    })
                  }
                />
                <select
                  id="status-select"
                  name="status"
                  required
                  defaultValue=""
                  onChange={(e) =>
                    setNewPersonalSharing({
                      ...newPersonalSharing,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    מצב משפחתי:
                  </option>
                  <option value="נשוי/נשואה">נשוי/נשואה</option>
                  <option value="רווק/ה">רווק/ה</option>
                  <option value="גרוש/ה">גרוש/ה</option>
                  <option value="אלמן/ה">אלמן/ה</option>
                  <option value="ערירי/ת">ערירי/ת</option>
                </select>

                <textarea
                  placeholder="הסיפור שלך.."
                  required
                  onChange={(e) =>
                    setNewPersonalSharing({
                      ...newPersonalSharing,
                      content: e.target.value,
                    })
                  }
                ></textarea>
                <div>
                  <button type="submit" className="send">
                    שלח/י
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sharing;
