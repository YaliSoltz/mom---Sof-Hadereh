import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page404">
      <h1>404 Error</h1>
      <h1>העמוד שאתם מחפשים לא קיים - לחזרה אל דף הבית לחצו על האוגר.</h1>
      <Link to="/">
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>

          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
      </Link>
    </div>
  );
};

export default Page404;
