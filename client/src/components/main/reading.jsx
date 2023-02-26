import React, { useContext } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ReadingContext } from "../../context/reading";

const Reading = () => {
  const { readings } = useContext(ReadingContext);

  return (
    <div className="closet-container">
      {readings.map((reading, index) => (
        <div key={index}>
          <div className="shelf-container">
            <h2 className="books-category">{reading.category}</h2>
            <div className="cuboid">
              <div className="cuboid__face cuboid__face--bottom"></div>
              <div className="cuboid__face cuboid__face--back"></div>
            </div>
          </div>
          <div className="books-container">
            <div className="carousel-container">
              <AliceCarousel
                responsive={{
                  0: { items: 1 },
                  700: { items: 4 },
                }}
                disableDotsControls="true"
                items={reading.books}
              />
            </div>
          </div>
          <div className="floor-thickness"></div>
        </div>
      ))}
    </div>
  );
};

export default Reading;
