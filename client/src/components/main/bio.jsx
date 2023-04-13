import React from "react";
import profile from "../../images/profile5.jpg";

const Bio = () => {
  const content = "עינת גוטפריד, אמא לארבעה, גרה בפרדס חנה.\n\n מלווה אנשים בשלבי חיים שונים בדיקור ורפואה טבעית, בקליניקה פרטית.\n\n אחות אחראית בקיבוץ משמרות.\n\n מלווה אנשים הנמצאים בסוף חייהם כאחות הוספיס ביחידת שקד (של קופ\"ח כללית) ובשר\"ן רפואה.\n\n מעבירה הרצאות על סוף החיים, מתוך רצון עמוק לייצר שיח פתוח על תקופה כל כך משמעותית.\n\n מדי יום, מודה על הזכות להיות חלק משמעותי בשלבים עמוקים ומרגשים בחיי אדם❤️"

;

  return (
    <div className="bio">
      <div className="bio-container">
        <p className="bio-text">{content}</p>
      </div>
      <img className="bio-img" src={profile} alt="profile" />

    </div>
  );
};

export default Bio;
