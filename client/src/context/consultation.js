import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ConsultationContext = createContext(); // the consultation context

const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState([]); // all the consultations
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/consultations/";

  // function that pulls all the consultations from the server
  const getConsultations = async () => {
    const { data } = await axios.get(url);
    setConsultations(data);
  };

  // function that add new consultation
  const addNewConsultation = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete consultation by id
  const deleteConsultation = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change consultation
  const changeConsultation = async (id, body) => {
    const result = await axios.patch(url + id, body);
    console.log(result);
    console.log(body);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getConsultations();
  }, [refresh]);

  return (
    <ConsultationContext.Provider
      value={{
        consultations,
        setConsultations,
        addNewConsultation,
        deleteConsultation,
        changeConsultation,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export default ConsultationProvider;
