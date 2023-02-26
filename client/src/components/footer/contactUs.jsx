import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ContactUsContext } from "../../context/contactUs";
import Validation from "../validation";

const ContactUs = () => {
  const { addNewContactUs } = useContext(ContactUsContext);

  // new ContactUs object
  const [newContactUs, setNewContactUs] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  // function that add new ContactUs and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(Validation(newContactUs)); // validate the inputs
    if (Object.keys(errors).length > 0) return;
    await addNewContactUs(newContactUs); // add newContactUs to database
    document.getElementById("form").reset(); // reset the form
  };

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      newContactUs.name !== "" &&
      newContactUs.phoneNumber !== "" &&
      newContactUs.email !== "" &&
      newContactUs.subject !== "" &&
      newContactUs.content !== ""
    );
  }, [errors]);

  return (
    <div className="contact-box">
      <h2> נשמח לשמוע ממך</h2>
      <form
        id="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-wrapper">
          <input
            type="text"
            className="field"
            placeholder="שם:"
            name="name"
            value={newContactUs.name}
            onChange={(e) =>
              setNewContactUs({ ...newContactUs, name: e.target.value })
            }
          />
          {errors.name && <span className="error"> {errors.name}</span>}
        </div>

        <div className="input-wrapper">
          <input
            id="phone"
            type="number"
            className="field"
            placeholder="טלפון:"
            minLength={10}
            name="phoneNumber"
            value={newContactUs.phoneNumber}
            onChange={(e) =>
              setNewContactUs({
                ...newContactUs,
                phoneNumber: e.target.value,
              })
            }
          />
          {errors.phoneNumber && (
            <span className="error"> {errors.phoneNumber}</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            className="field"
            placeholder="אימייל:"
            name="email"
            value={newContactUs.email}
            onChange={(e) =>
              setNewContactUs({ ...newContactUs, email: e.target.value })
            }
          />
          {errors.email && <span className="error"> {errors.email}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            className="field"
            placeholder="נושא:"
            name="subject"
            value={newContactUs.subject}
            onChange={(e) =>
              setNewContactUs({ ...newContactUs, subject: e.target.value })
            }
          />
          {errors.subject && <span className="error"> {errors.subject}</span>}
        </div>

        <div className="input-wrapper">
          <textarea
            cols="30"
            rows="6"
            type="text"
            className="field"
            id="content"
            placeholder="תוכן:"
            name="content"
            value={newContactUs.content}
            onChange={(e) =>
              setNewContactUs({ ...newContactUs, content: e.target.value })
            }
          />
          {errors.content && <span className="error"> {errors.content}</span>}
        </div>
        <button className="send" type="submit">
          שליחת הודעה
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
