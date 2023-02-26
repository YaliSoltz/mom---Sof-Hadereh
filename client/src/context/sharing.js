import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SharingContext = createContext(); // the sharing context

const SharingProvider = ({ children }) => {
  const [sharings, setSharings] = useState([]); // all the sharings
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/sharings/";

  // function that pulls all the sharings from the server
  const getSharings = async () => {
    const { data } = await axios.get(url);
    setSharings(data);
  };

  // function that add new sharing
  const addNewSharing = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete sharing by id
  const deleteSharing = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change Sharing
  const changeSharing = async (id, body) => {
    try {
      const result = await axios.patch(url + id, body);
      console.log(result);
      console.log(body);
      setRefresh(!refresh);
    } catch (error) {}
  };

  useEffect(() => {
    getSharings();
  }, [refresh]);

  return (
    <SharingContext.Provider
      value={{
        sharings,
        setSharings,
        addNewSharing,
        deleteSharing,
        changeSharing,
      }}
    >
      {children}
    </SharingContext.Provider>
  );
};

export default SharingProvider;
