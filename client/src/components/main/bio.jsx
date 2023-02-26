import React from "react";
import profile from "../../images/profile5.jpg";

const Bio = () => {
  let content = `עינת גוטפריד, אמא לארבעה, גרה בפרדס חנה. מלווה אנשים בשלבי חיים שונים בדיקור ורפואה טבעית, בקליניקה פרטית. אחות אחראית בקיבוץ משמרות. מלווה אנשים הנמצאים בסוף חייהם כאחות הוספיס ביחידת שקד (של קופ"ח כללית) ובשר"ן רפואה. מעבירה הרצאות על סוף החיים, מתוך רצון עמוק לייצר שיח פתוח על תקופה כל כך משמעותית. מדי יום, מודה על הזכות להיות חלק משמעותי בשלבים עמוקים ומרגשים בחיי אדם ❤️`

  content = content.split(".").map((word, index) => (
    <p key={index} className="bio-text">
      {word + "."}
    </p>
  ));

  return (
    <div className="bio">
      <div className="bio-container">
        <h1 className="bio-title">אז מי אני?</h1>
        <div>{content}</div>
      </div>
      <img className="bio-img" src={profile} alt="profile" />

    </div>
  );
};

export default Bio;
