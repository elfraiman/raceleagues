import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase.js";
import { isEmpty } from "lodash";
import { useAlert } from "react-alert";
export const ChampionshipContext = createContext(null);

const database = firebase.firestore();

const ChampionshipProvider = ({ children }) => {
  const [championships, setChampionships] = useState(null);
  const alert = useAlert();

  useEffect(() => {
    database
      .collection("championships")
      .get()
      .then((response) => {
        const raceArray = [];

        response.docs.forEach((document) => {
          // checkes if the enabled boolean on the document is set to true
          // if false it doesn't push to championships.
          // this lets me add and create championships without worrying about them poping up in the 
          // front page.
          if (document.data().enabled) {
            raceArray.push(document.data());
          }
        });

        setChampionships(raceArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [database]);

  const fetchChampionship = (param) => {
    if (!isEmpty(championships)) {
      const raceFound = championships.find((race) => race.name === param);

      return raceFound;
    }
  };

  const updateChampionshipDrivers = (driverData, event) => {
    const championshipRef = database
      .collection("championships")
      .doc(event.name);

    championshipRef
      .update({
        drivers: [...event.drivers, driverData],
      })
      .then(function() {
        alert.success("You have successfuly signed up!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <ChampionshipContext.Provider
      value={{
        championships: championships,
        fetchChampionship: fetchChampionship,
        updateChampionshipDrivers: updateChampionshipDrivers,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
};

export default ChampionshipProvider;
