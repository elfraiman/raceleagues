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

  console.log(trackData, raceData);

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
            <h5><span>Race date:</span> <br /> {moment(raceData.raceDate.toDate(), "en").format("LLLL, UTCZZ")}</h5>
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
                <iframe width="100%" height="400px" src="https://www.youtube.com/embed/xXa8Ltr_rOo?controls=0&amp;start=6" frameBorder="0" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        : <LinearProgress />}
    </div>
  );
}

export default RacePage;