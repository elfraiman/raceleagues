import React, { useEffect, useState } from 'react';
import classes from './race.module.scss';
import firebase from '../../firebase.js';
import { useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
const database = firebase.firestore();

const RacePage = () => {
  const [trackData, setTrack] = useState('');
  const [raceData, setRaceData] = useState(null);
  const { race } = useParams();

  useEffect(() => {
    console.log(race);
    database.collection('races').get()
      .then(response => {
        response.docs.forEach(document => {
          if (document.data().name === race) {
            const race = document.data();
            setRaceData(race);
            setTrack(race.track);
          }
          console.log(document.data());
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div className={classes.racePage}>
      {raceData ?
        <h2>{raceData.title}</h2>
        : <LinearProgress />}
    </div>
  );
}

export default RacePage;