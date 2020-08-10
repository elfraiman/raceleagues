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
import ChampionshipProvider, {
  ChampionshipContext,
} from "../../providers/championshipProvider";
import UserProvider, { UserContext } from "../../providers/userProvider";
import classes from "./singleRace.module.scss";
import { useAlert } from "react-alert";
import { Divider } from "@material-ui/core";
import TrackProvider, { TrackContext } from "../../providers/trackProvider.jsx";

const InnerRacePage = () => {
  const championshipProvider = useContext(ChampionshipContext);
  const trackProvider = useContext(TrackContext);
  const userProvider = useContext(UserContext);
  const [trackData, setTrack] = useState("");
  const { race } = useParams();
  const alert = useAlert();
  const raceData = championshipProvider.fetchChampionship(race);
  const [registeredDrivers, setRegisteredDrivers] = useState([]);

  const joinRace = async () => {
    const user = await userProvider.user;
    const championship = championshipProvider.fetchChampionship(raceData.id);

    const driverAlreadyRegistered = !isEmpty(championship.drivers)
      ? championship.drivers.filter((driver) => driver.uid === user.uid)
      : false;

    const noAvailableSlots =
      championship.drivers.length === championship.availability;

    if (!isEmpty(driverAlreadyRegistered)) {
      alert.success("You are already registered for this event!");
      return;
    }

    if (noAvailableSlots) {
      alert.error("No available slots!");
      return;
    }
    const event = raceData;
    const driverData = {
      uid: user.uid,
      car: "test"
    }
    championshipProvider.updateChampionshipDrivers(driverData, event);
  };

  const generatedRegisteredDrivers = async () => {
    const drivers = raceData.drivers;
    if (!isEmpty(drivers)) {
       const registeredDriversDocuments = [];

       for (let i = 0; i < drivers.length; i++) {
         await userProvider
           .fetchUsersDocument(drivers[i].uid)
           .then((userDoc) => {
             registeredDriversDocuments.push(userDoc);
           });
       }

       setRegisteredDrivers(registeredDriversDocuments);
    }
  };

  useEffect(() => {
    if (!isEmpty(raceData)) {
      const track = trackProvider.fetchTrack(raceData.track);
      setTrack(track);

      generatedRegisteredDrivers();
    }
  }, [championshipProvider, userProvider.fetchUsersDocument]);

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
                  {isString(raceData.races[0].raceDate)
                    ? raceData.races[0].raceDate
                    : moment(raceData.races[0].raceDate.toDate(), "en").format(
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
                    Registered Drivers ({raceData.drivers.length})
                  </h6>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.driversWrapper}>
                    {!isEmpty(registeredDrivers)
                      ? registeredDrivers.map((driver, i) => (
                        <div key={i} className={classes.driver}>
                          <img
                            src={driver.img}
                            alt="driver"
                            className={classes.driverImg}
                          />

                          <span className={classes.driversName}>
                            {driver.name}

                            <span className={classes.driverDiscord}>
                              {driver.discord}
                            </span>
                          </span>

                        </div>
                      ))
                      : null}
                    <Divider className={classes.divider} />
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
    <ChampionshipProvider>
      <TrackProvider>
        <UserProvider>
          <InnerRacePage />
        </UserProvider>
      </TrackProvider>
    </ChampionshipProvider>
  );
};

export default RacePage;
