import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase.js";
import { isEmpty } from "lodash";

export const TrackContext = createContext(null);

const database = firebase.firestore();

const TrackProvider = ({ children }) => {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    database
      .collection("tracks")
      .get()
      .then((response) => {
        const trackArray = [];

        response.docs.forEach((document) => {
          trackArray.push(document.data());
        });

        setTracks(trackArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [database]);

  const fetchTrack = (param) => {
    if (!isEmpty(tracks)) {
      const trackFound = tracks.find((track) => track.id === param);

      return trackFound;
    }
  };

  return (
    <TrackContext.Provider
      value={{
        tracks: tracks,
        fetchTrack: fetchTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export default TrackProvider;
