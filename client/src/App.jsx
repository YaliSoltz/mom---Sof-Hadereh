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
      <Route path="/בלוג" element={<Interface id={0} />} />
      <Route path="/מטופלים-משתפים" element={<Interface id={1} />} />
      <Route path="/הרצאות" element={<Interface id={2} />} />
      <Route path="/קצת-עליי" element={<Interface id={3} />} />
      <Route path="/המלצות-קריאה" element={<Interface id={4} />} />
      <Route path="*" element={<Interface id={5} />} />
      {user.role === 'admin' && <Route path="/add" element={<Interface id={6} />} />}
      {user.role === 'admin' && <Route path="/contact-us" element={<Interface id={7} />} />}
      {user.role === 'admin' && <Route path="/personal-sharing" element={<Interface id={8} />} />}
      <Route path="/l1o2g3i4n5" element={<Login/>} />

    </Routes>
  );
};

export default App;
