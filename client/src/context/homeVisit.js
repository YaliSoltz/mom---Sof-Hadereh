import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const HomeVisitContext = createContext(); // the homeVisit context

const HomeVisitProvider = ({ children }) => {
  const [homeVisits, setHomeVisits] = useState([]); // all the homeVisits
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/homeVisits/";

  // function that pulls all the homeVisits from the server
  const getHomeVisits = async () => {
    const { data } = await axios.get(url);
    setHomeVisits(data);
  };

  // function that add new homeVisit
  const addNewHomeVisit = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete homeVisit by id
  const deleteHomeVisit = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change homeVisit
  const changeHomeVisit = async (id, body) => {
    const result = await axios.patch(url + id, body);
    console.log(result);
    console.log(body);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getHomeVisits(refresh);
  }, []);

  return (
    <HomeVisitContext.Provider
      value={{
        homeVisits,
        setHomeVisits,
        addNewHomeVisit,
        deleteHomeVisit,
        changeHomeVisit,
      }}
    >
      {children}
    </HomeVisitContext.Provider>
  );
};

export default HomeVisitProvider;
