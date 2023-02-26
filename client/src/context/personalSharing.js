import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PersonalSharingContext = createContext(); // the personalSharing context

const PersonalSharingProvider = ({ children }) => {
  const [personalSharings, setPersonalSharings] = useState([]); // all the personalSharings
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-admin.onrender.com/api/personalSharings/";

  // function that pulls all the personalSharings from the server
  const getPersonalSharing = async () => {
    const { data } = await axios.get(url);
    setPersonalSharings(data);
  };

  // function that add new personalSharing
  const addNewPersonalSharing = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
    } catch (error) {
      alert("שיתוף לא בוצע בהצלחה, אנא נסה שנית.");
    }
  };

  // function that delete personalSharing by id
  const deletePersonalSharing = async (id) => {
    const { data } = await axios.delete(url + id);
    console.log(data);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getPersonalSharing();
  }, [refresh]);

  return (
    <PersonalSharingContext.Provider
      value={{
        personalSharings,
        setPersonalSharings,
        addNewPersonalSharing,
        deletePersonalSharing,
      }}
    >
      {children}
    </PersonalSharingContext.Provider>
  );
};

export default PersonalSharingProvider;
