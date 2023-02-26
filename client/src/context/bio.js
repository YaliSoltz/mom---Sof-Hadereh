import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BioContext = createContext(); // the bio context

const BioProvider = ({ children }) => {
  const [bio, setBio] = useState([]); // all the bio
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/bio/";

  // function that pulls the bio from the server
  const getBio = async () => {
    const { data } = await axios.get(url);
    setBio(data);
  };

  // function that add new bio
  const addNewBio = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete bio by id
  const deleteBio = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change bio
  const changeBio = async (id, body) => {
    const result = await axios.patch(url + id, body);
    console.log(result);
    console.log(body);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getBio();
  }, [refresh]);

  return (
    <BioContext.Provider
      value={{
        bio,
        setBio,
        addNewBio,
        deleteBio,
        changeBio,
      }}
    >
      {children}
    </BioContext.Provider>
  );
};

export default BioProvider;
