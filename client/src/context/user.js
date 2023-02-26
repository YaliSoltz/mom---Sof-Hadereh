import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext(); // the user context

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}); // user with name and role
  const [token, setToken] = useState(localStorage.getItem("x-auth-token")); // token

  useEffect(() => {
    if (token) setUser(jwtDecode(token));
    else setUser({});
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
