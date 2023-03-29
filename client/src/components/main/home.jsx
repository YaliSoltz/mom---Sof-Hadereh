import React, { useContext } from "react";
import { SentenceContext } from "../../context/sentence";
import homeImg from "../../images/home.png";
const Home = () => {
  const { sentences } = useContext(SentenceContext);
  const index = Math.floor(Math.random() * sentences.length);

  return (
    <div className="home">
      {/* <h2 className="home-sentence">{sentences[index]?.content}</h2> */}
      <img className="home-img" src={homeImg} alt="profile" />
      <div>
        <h2 className="home-title">{sentences[index]?.title}</h2>
        <p className="home-sentence">{sentences[index]?.content}</p>
      </div>
    </div>
  );
};

export default Home;
