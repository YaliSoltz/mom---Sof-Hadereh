import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ContactUsContext = createContext(); // the contactUs context

const ContactUsProvider = ({ children }) => {
  const [contactUs, setContactUs] = useState([]); // all the contactUs
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-admin.onrender.com/api/contactUs/";

  // function that pulls all the contactUs from the server
  const getContactUs = async () => {
    const { data } = await axios.get(url);
    setContactUs(data);
  };

  // function that add new contactUs
  const addNewContactUs = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert(" נשלח בהצלחה");
    } catch (error) {}
  };

  // function that delete contactUs by id
  const deleteContactUs = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getContactUs();
  }, [refresh]);

  return (
    <ContactUsContext.Provider
      value={{
        contactUs,
        setContactUs,
        addNewContactUs,
        deleteContactUs,
      }}
    >
      {children}
    </ContactUsContext.Provider>
  );
};

export default ContactUsProvider;
