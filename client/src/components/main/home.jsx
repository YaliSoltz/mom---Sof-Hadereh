import React, { useContext } from "react";
import { SentenceContext } from "../../context/sentence";
import homeImg from "../../images/home.png";
const Home = () => {
  const { sentences } = useContext(SentenceContext);
  const index = Math.floor(Math.random() * sentences.length);

  return (
    <div className="home">
      <div style={{ flex: 1 }}>
        <img className="home-img" src={homeImg} alt="profile IMG" />
        <h2 className="home-description">
          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קונסקטורר
          אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם.
          וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום
          בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך
          תצטריק לרטי. ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש.
          תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס. סחטיר בלובק.
          תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם
          גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. קולהע צופעט
          למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי להאמית קרהשק סכעיט דז מא,
          מנכם למטכין נשואי מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר
          גק ליץ, ושבעגט. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית.
          סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט
          דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק.
          קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.
        </h2>
      </div>
      <div style={{ flex: 1 }}>
        <h2 className="home-title">{sentences[index]?.title}</h2>
        <p className="home-sentence">{sentences[index]?.content}</p>
      </div>
    </div>
  );
};

export default Home;
