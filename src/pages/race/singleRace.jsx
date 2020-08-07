import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEmpty, isString } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody } from "shards-react";
import firebase from "../../firebase.js";
import RaceProvider, { RaceContext } from "../../providers/raceProvider";
import UserProvider, { UserContext } from "../../providers/userProvider";
import classes from "./singleRace.module.scss";
import { useAlert } from "react-alert";
import { Divider } from "@material-ui/core";

const database = firebase.firestore();

const InnerRacePage = () => {
  const raceProvider = useContext(RaceContext);
  const userProvider = useContext(UserContext);
  const [trackData, setTrack] = useState("");
  const { race } = useParams();
  const alert = useAlert();
  const raceData = raceProvider.fetchRace(race);

  useEffect(() => {
    if (!isEmpty(raceData)) {
      database
        .collection("tracks")
        .doc(raceData.track)
        .get()
        .then((response) => {
          setTrack(response.data());
        });
    }
  }, [raceProvider]);

  const joinRace = async () => {
    const user = await userProvider.user;
    const championshipRef = database
      .collection("championships")
      .doc(raceData.name);

    const championshipData = (await championshipRef.get()).data();

    const driverAlreadyRegistered = championshipData.drivers.filter(
      (driver) => driver.uid === user.uid
    );

    const noAvailableSlots =
      championshipData.drivers.length === championshipData.availability;

    if (!isEmpty(driverAlreadyRegistered)) {
      alert.success("You are already registered for this event!");
      return;
    }

    if (noAvailableSlots) {
      alert.error("No available slots!");
      return;
    }

    championshipRef
      .update({
        drivers: [
          ...championshipData.drivers,
         user
        ],
      })
      .then(function() {
        alert.success("You have successfuly signed up!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div>
      {raceData && trackData ? (
        <div className={classes.main}>
          <span className={classes.title}>
            <img src={trackData.flag} alt="track country flag" />{" "}
            <h2>{raceData.title}</h2>
          </span>

          <div className={classes.raceInfo}>
            <Card>
              <img src={raceData.img} alt="race" />
            </Card>

            <Card className={classes.infoCard}>
              <CardBody>
                <div className={classes.markdown}>
                  {ReactHtmlParser(raceData.markdown)}
                </div>
              </CardBody>
            </Card>
          </div>

          <div className={classes.trackData}>
            <Card className={classes.trackImgCard}>
              <img
                src={trackData.img}
                alt="track layout"
                className={classes.trackImg}
              />
            </Card>
            <Card>
              <CardBody>
                <h5>
                  <span>Track Length:</span> <br />
                  {trackData.trackLength}
                </h5>
                <h5>
                  <span>Number of turns:</span> <br />
                  {trackData.numberOfTurns}
                </h5>
                <h5>
                  <span>Real lap record:</span> <br />
                  {trackData.lapRealRecord}
                </h5>
                <h5>
                  <span>Availability:</span> <br />
                  {raceData.availability - raceData.drivers.length}/
                  {raceData.availability}
                </h5>
                <h5>
                  <span>Race length:</span> <br />
                  {raceData.raceLength / 60} Hours
                </h5>
                <h5>
                  <span>Race date:</span> <br />{" "}
                  {isString(raceData.raceDate)
                    ? raceData.raceDate
                    : moment(raceData.raceDate.toDate(), "en").format(
                        "LLLL, UTCZZ"
                      )}{" "}
                  <a href="https://time.is/UTC+2">Check UTC+2</a>
                </h5>
                <h5>
                  <span>Category:</span> <br />
                  {raceData.carClass.toUpperCase()}
                </h5>
              </CardBody>
            </Card>

            <Card className={classes.accordionCard}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h6 className={classes.heading}>
                    Registered Racers ({raceData.drivers.length})
                  </h6>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.driversWrapper}>
                    {raceData.drivers.map((driver) => (
                      <div key={driver.name} className={classes.driverName}>
                        <img
                          src={driver.img}
                          alt="driver"
                          className={classes.driverImg}
                        />
                        {driver.name}
                        <Divider className={classes.divider} />
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </Card>
            <Card className={classes.accordionCard}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h6 className={classes.heading}>Onboard Lap</h6>
                </AccordionSummary>

                <AccordionDetails>
                  <iframe
                    width="100%"
                    title="onboard"
                    height="315"
                    src={raceData.onboard}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </AccordionDetails>
              </Accordion>
            </Card>

            <Button className={classes.registerButton} onClick={joinRace}>
              Join Race
            </Button>
          </div>
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

const RacePage = () => {
  return (
    <RaceProvider>
      <UserProvider>
        <InnerRacePage />
      </UserProvider>
    </RaceProvider>
  );
};

export default RacePage;
