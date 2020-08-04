import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase.js";

export const RaceContext = createContext(null);

const database = firebase.firestore();

const RaceProvider = ({ children }) => {
  const [races, setRaces] = useState(null);

  useEffect(() => {
    database
      .collection("races")
      .get()
      .then((response) => {
        const raceArray = [];

        response.docs.forEach((document) => {
          console.log(document.data());
          raceArray.push(document.data());
        });

        setRaces(raceArray);
        console.log(raceArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <RaceContext.Provider
      value={{
        races: races,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export default RaceProvider;
