import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./user";

export const ReadingContext = createContext(); // the reading context

const ReadingProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [readings, setReadings] = useState([]); // all the readings
  const [refresh, setRefresh] = useState(false); // active useEffect on each axios
  const url = "https://backend-server-h1qj.onrender.com/api/Readings/";

  // function that pulls all the readings from the server
  const getReadings = async () => {
    const { data } = await axios.get(url);

    // books category
    let accompanyingChildren = { category: "ליווי ילדים", books: [] };
    let elderly = { category: "הגיל השלישי", books: [] };
    let death = { category: "מה קורה ברגע המוות ואחרי", books: [] };
    let inspiration = { category: "ספרי השראה", books: [] };

    //organize books by category
    data.map((reading) => {
      switch (reading.category) {
        case "ליווי ילדים":
          accompanyingChildren.books.push(
            <div
              className="book"
              style={{ backgroundImage: `url(${reading.imgUrl.url})` }}
            >
              {user.role === "admin" && (
                <span
                  className="delete-book"
                  onDoubleClick={() => deleteReading(reading._id)}
                >
                  &times;
                </span>
              )}
            </div>
          );
          break;
        case "הגיל השלישי":
          elderly.books.push(
            <div
              className="book"
              style={{ backgroundImage: `url(${reading.imgUrl.url})` }}
            >
              {user.role === "admin" && (
                <span
                  className="delete-book"
                  onDoubleClick={() => deleteReading(reading._id)}
                >
                  &times;
                </span>
              )}
            </div>
          );
          break;
        case "מה קורה ברגע המוות ואחרי":
          death.books.push(
            <div
              className="book"
              style={{ backgroundImage: `url(${reading.imgUrl.url})` }}
            >
              {user.role === "admin" && (
                <span
                  className="delete-book"
                  onDoubleClick={() => deleteReading(reading._id)}
                >
                  &times;
                </span>
              )}
            </div>
          );
          break;
        case "ספרי השראה":
          inspiration.books.push(
            <div
              className="book"
              style={{ backgroundImage: `url(${reading.imgUrl.url})` }}
            >
              {user.role === "admin" && (
                <span
                  className="delete-book"
                  onDoubleClick={() => deleteReading(reading._id)}
                >
                  &times;
                </span>
              )}
            </div>
          );
          break;
        default:
          break;
      }
    });

    setReadings([accompanyingChildren, elderly, death, inspiration]);
  };

  // function that add new reading
  const addNewReading = async (body) => {
    try {
      const { data } = await axios.post(url, body);
      console.log(data);
      setRefresh(!refresh);
      alert("נוסף בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that delete reading by id
  const deleteReading = async (id) => {
    try {
      const { data } = await axios.delete(url + id);
      console.log(data);
      setRefresh(!refresh);
      alert("נמחק בהצלחה");
    } catch (error) {
      alert(error.message);
    }
  };

  // function that change reading
  const changeReading = async (id, body) => {
    const result = await axios.patch(url + id, body);
    console.log(result);
    console.log(body);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getReadings();
  }, [user, refresh]);

  return (
    <ReadingContext.Provider
      value={{
        readings,
        setReadings,
        addNewReading,
        deleteReading,
        changeReading,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export default ReadingProvider;
