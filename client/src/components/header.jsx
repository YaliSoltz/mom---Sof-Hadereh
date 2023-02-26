import React, { useContext } from "react";
import { UserContext } from "../context/user";
import AdminNavBar from "./header/adminNavBar";
import UserNavBar from "./header/userNavBar";
const Header = () => {
  const { user } = useContext(UserContext);
  return <div>{user.role === 'admin' ? <AdminNavBar /> : <UserNavBar />}</div>;
};

export default Header;
