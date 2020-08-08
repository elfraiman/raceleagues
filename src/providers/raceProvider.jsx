import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase.js";
import { isEmpty } from "lodash";

export const RaceContext = createContext(null);

const database = firebase.firestore();

const RaceProvider = ({ children }) => {
  const [races, setRaces] = useState(null);
  
  useEffect(() => {
    database
      .collection("championships")
      .get()
      .then((response) => {
        const raceArray = [];

        response.docs.forEach((document) => {
          raceArray.push(document.data());
        });

        setRaces(raceArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [database]);

  const fetchRace = (param) => {
    if (!isEmpty(races)) {
      const raceFound = races.find(race => race.name === param);

      return raceFound;
    }
  }

  return (
    <RaceContext.Provider
      value={{
        races: races,
        fetchRace: fetchRace
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export default RaceProvider;
