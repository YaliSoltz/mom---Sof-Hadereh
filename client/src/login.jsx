import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

import "./css/Login.css";
const Login = () => {
  const { setToken } = useContext(UserContext);
  const [user, setUser] = useState({}); // user object with email and passwsord
  const [show, setShow] = useState(false); // invalid email or password
  const [showPassEye, setShowPassEye] = useState(false); // show password or not
  const navigate = useNavigate();

  // login function that add token to localstorage
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://backend-server-h1qj.onrender.com/login";
    try {
      const { data } = await axios.post(url, user);
      console.log(data);
      localStorage.setItem("x-auth-token", data);
      setToken(data);
      navigate("/");
    } catch (error) {
      setShow(true);
      console.log(error.message);
    }
  };

  // function that show the password
  const showPassword = () => {
    let input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      setShowPassEye(true);
    } else {
      input.type = "password";
      setShowPassEye(false);
    }
  };
  return (
    <div className="login-main">
      <div className="center">
        <h1>כניסת מנהלת </h1>
        <form
          id="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="txt_field">
            <input
              type="email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label>אימייל</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              id="password"
              minLength={8}
              max={64}
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label>סיסמא</label>
            <span className="password-eye" onClick={() => showPassword()}>
              {showPassEye ? <AiFillEye /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="forgot-invalid">
            <article className="invalid" hidden={!show}>
              סיסמא או אימייל שגויים
            </article>
          </div>
          <input type="submit" value="כניסה" className="login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
