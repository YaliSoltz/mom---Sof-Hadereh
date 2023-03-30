import React from "react";
import "../css/User.css";
import Header from "./header";
import Article from "./main/article";
import Bio from "./main/bio";
import Lecture from "./main/lecture";
import Sharing from "./main/sharing";
import Reading from "./main/reading";
import Footer from "./footer";
import Page404 from "./main/page404";
import Add from "./admin/add";
import Home from "./main/home";
import PersonalSharing from "./admin/personalSharing";
import AdminContactUs from "./admin/contactUs";
import ContactUs from "./main/contactUs";
const Interface = ({ id }) => {
  
  return (
    <div>
      <Header id={id} />
      <div className="Main">
        {(() => {
          switch (id) {
            case 'בלוג':
              return <Article />;
            case "מטופלים-משתפים":
              return <Sharing />;
            case "הרצאות":
              return <Lecture />;
            case "קצת-עליי":
              return <Bio />;
            case "המלצות-קריאה":
              return <Reading />;
            case "יצירת-קשר":
              return <ContactUs/>;
            case 1:
              return <Page404 />;
            case 2:
              return <Add />;
            case 3:
              return <AdminContactUs />;
            case 4:
              return <PersonalSharing />;
            default:
              return <Home />;
          }
        })()}
      </div>
      <Footer />
    </div>
  );
};

export default Interface;
