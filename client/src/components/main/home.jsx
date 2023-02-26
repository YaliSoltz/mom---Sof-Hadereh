import React, { useContext } from "react";
import { SentenceContext } from "../../context/sentence";
import homeImg from "../../images/home.png";
const Home = () => {
  
  // const { sentences } = useContext(SentenceContext);
  // const index = Math.floor(Math.random() * sentences.length);

  return (
    <div className="home">
      {/* <h2 className="home-sentence">{sentences[index]?.content}</h2> */}
      <img className="home-img" src={homeImg} alt="profile" />
      <div>
        <h2 className="home-title">יש כוכבים / חנה סנש</h2>
        <p className="home-sentence">
          יש כוכבים שאורם מגיע ארצה, רק כשהם עצמם אבדו ואינם. יש אנשים שזיו זכרם
          מאיר. כאשר הם עצמם אינם יותר בתוכנו. אורות אלה המבהיקים בחשכת הליל -
          הם הם שמראים לאדם את הדרך.
        </p>
      </div>
    </div>
  );
};

export default Home;
