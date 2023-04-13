import React, { useContext, useState } from "react";

import { SharingContext } from "../../../context/sharing";

const Sharing = () => {
  const { addNewSharing } = useContext(SharingContext);

  const [newSharing, setNewSharing] = useState({}); // new sharing object

  const loader = document.getElementById("loader"); // the circle loader

  // function that add new sharing and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    loader.style.display = "block";
    await addNewSharing(newSharing); // add newSharing to database
    loader.style.display = "none";
    document.getElementById("form").reset(); // reset the form
  };

  return (
    <div>
      <div className="add-form">
        <svg id="loader" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
        <h2>הוספת שיתוף חדש</h2>
        <form
          id="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            name="name"
            type="text"
            onChange={(e) =>
              setNewSharing({
                ...newSharing,
                name: e.target.value,
              })
            }
            placeholder="שם:"
            required
          />
          <input
            name="age"
            type="number"
            placeholder="גיל:"
            min={1}
            required
            onChange={(e) =>
              setNewSharing({
                ...newSharing,
                age: e.target.value,
              })
            }
          />
          <select
            id="status-select"
            name="status"
            required
            defaultValue=""
            onChange={(e) =>
              setNewSharing({
                ...newSharing,
                status: e.target.value,
              })
            }
          >
            <option value="" disabled>
              סטטוס:
            </option>
            <option value="נשוי/נשואה">נשוי/נשואה</option>
            <option value="רווק/ה">רווק/ה</option>
            <option value="גרוש/ה">גרוש/ה</option>
            <option value="אלמן/ה">אלמן/ה</option>
            <option value="ערירי/ת">ערירי/ת</option>
          </select>

          <textarea
            name="content"
            cols="30"
            rows="10"
            placeholder="תוכן:"
            required
            onChange={(e) =>
              setNewSharing({
                ...newSharing,
                content: e.target.value,
              })
            }
          ></textarea>
          <button type="submit">הוספה</button>
        </form>
      </div>
    </div>
  );
};

export default Sharing;
