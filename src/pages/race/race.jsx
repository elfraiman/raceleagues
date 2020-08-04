import React, { useEffect, useState } from 'react';
import classes from './race.module.scss';
import firebase from '../../firebase.js';
import { useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import moment from 'moment';
import { Button } from "shards-react";

const database = firebase.firestore();

const RacePage = () => {
  const [trackData, setTrack] = useState('');
  const [raceData, setRaceData] = useState(null);
  const { race } = useParams();

  useEffect(() => {
    database.collection('races').get()
      .then(response => {
        response.docs.forEach(document => {
          if (document.data().name === race) {
            const race = document.data();
            setRaceData(race);

            database.collection('tracks').doc(race.track).get().then(response => {
              setTrack(response.data());
            })
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div className={classes.racePage}>
      {raceData && trackData ?
        <div className={classes.main}>
          <span className={classes.title}>
            <img src={trackData.flag} alt="track country flag" /> {raceData.title}
          </span>


          <div className={classes.trackMap}>
            <img src={trackData.img} alt="track layout" />
          </div>

          <div className={classes.trackData}>
            <h5><span>Track Length:</span> <br />{trackData.trackLength}</h5>
            <h5><span>Number of turns:</span> <br />{trackData.numberOfTurns}</h5>
            <h5><span>Real lap record:</span> <br />{trackData.lapRealRecord}</h5>
            <h5><span>Max perticipants:</span> <br />{raceData.availability}</h5>
            <h5><span>Race length:</span> <br />{raceData.raceLengthMinutes / 60} Hours</h5>
            <h5><span>Race date:</span> <br /> {moment(raceData.raceDate.toDate(), "en").format("LLLL, UTCZZ")} <a href="https://time.is/UTC+2">Check UTC+2</a></h5>
            <h5><span>Category:</span> <br />{raceData.carClass.toUpperCase()}</h5>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <h6 className={classes.heading}>Registered Racers</h6>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  #88 Elan Fraiman <br />
                  #76 Bob Hayje <br />
                  #12 Kelly van der laan <br />
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h6 className={classes.heading}>Onboard Lap</h6>
              </AccordionSummary>

              <AccordionDetails>
              <iframe width="100%" title="onboard" height="315" src={raceData.onboard} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </AccordionDetails>
            </Accordion>
          </div>

          <Button className={classes.registerButton}>Join Race</Button>
        </div>

        : <LinearProgress />}
    </div>
  );
}

export default RacePage;