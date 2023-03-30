import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Interface from "./components/interface";
import { UserContext } from "./context/user";
import Login from "./login";
import "./css/User.css";
import "./css/Admin.css";
import "./css/Login.css";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Interface />} />
      <Route path="/בלוג" element={<Interface id={"בלוג"} />} />
      <Route
        path="/מטופלים-משתפים"
        element={<Interface id={"מטופלים-משתפים"} />}
      />
      <Route path="/הרצאות" element={<Interface id={"הרצאות"} />} />
      <Route path="/קצת-עליי" element={<Interface id={"קצת-עליי"} />} />
      <Route path="/המלצות-קריאה" element={<Interface id={"המלצות-קריאה"} />} />
      <Route path="/יצירת-קשר" element={<Interface id={"יצירת-קשר"} />} />
      <Route path="*" element={<Interface id={1} />} />
      {user.role === "admin" && (
        <Route path="/add" element={<Interface id={2} />} />
      )}
      {user.role === "admin" && (
        <Route path="/contact-us" element={<Interface id={3} />} />
      )}
      {user.role === "admin" && (
        <Route path="/personal-sharing" element={<Interface id={4} />} />
      )}
      <Route path="/l1o2g3i4n5" element={<Login />} />
    </Routes>
  );
};

export default App;
