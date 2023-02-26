import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import ContactUs from "./footer/contactUs";
import CreatedBy from "./footer/createdBy";

const Footer = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="Footer">
      {user.role === "admin" ? "" : <ContactUs />}
      <CreatedBy />
    </div>
  );
};

export default Footer;
