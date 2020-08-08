import React, { useContext, useEffect, useState } from "react";
import { Divider, LinearProgress } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEmpty, isString } from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import { useAlert } from "react-alert";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardHeader,
} from "shards-react";
import RaceProvider, { RaceContext } from "../../providers/raceProvider";
import UserProvider, { UserContext } from "../../providers/userProvider";
import classes from "./league.module.scss";
import firebase from "../../firebase.js";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const database = firebase.firestore();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const InnerLeaguePage = () => {
  const userProvider = useContext(UserContext);
  const raceProvider = useContext(RaceContext);
  const { league } = useParams();
  const leagueData = raceProvider.fetchRace(league);
  const alert = useAlert();
  const [tabValue, setTabValue] = React.useState("one");
  const [eventData, setEventData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const joinRace = async () => {
    const user = await userProvider.user;

    const championshipRef = database
      .collection("championships")
      .doc(leagueData.name);

    const championshipData = (await championshipRef.get()).data();

    const driverAlreadyRegistered = !isEmpty(championshipData.drivers)
      ? championshipData.drivers.filter((driver) => driver.uid === user.uid)
      : false;

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
        drivers: [...championshipData.drivers, user],
      })
      .then(function() {
        alert.success("You have successfuly signed up!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  };

  const generateEventData = async () => {
    const tracks = [];
    const races = leagueData.races;
    const eventData = [];

    await database
      .collection("tracks")
      .get()
      .then((response) => {
        response.docs.forEach((track) => {
          tracks.push(track.data());
        });
      });

    races.forEach((race) => {
      const correctTrack = tracks.filter((track) => track.id === race.track);
      const obj = {
        track: correctTrack[0],
        race: race,
      };

      eventData.push(obj);
    });

    console.log(eventData, " event data");
    setEventData(eventData);
  };

  useEffect(() => {
    if (!isEmpty(leagueData)) {
      generateEventData();
    }
  }, [leagueData]);

  return (
    <React.Fragment>
      {!isEmpty(leagueData) ? (
        <div className={classes.tabs}>
          <AppBar position="static" className={classes.tabsAppBar}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab value="one" label="Info" className={classes.tab} />
              <Tab value="two" label="Races" className={classes.tab} />
              <Tab value="three" label="Drivers" className={classes.tab} />
            </Tabs>
          </AppBar>

          <TabPanel value={tabValue} index="one" className={classes.tabPanel}>
            <div className={classes.main}>
              <div className={classes.leagueData}>
                <div className={classes.title}>
                  <h3>{leagueData.title.toUpperCase()}</h3>
                  <h6>
                    {" "}
                    {isString(leagueData.raceDate)
                      ? leagueData.raceDate
                      : moment(leagueData.raceDate.toDate(), "en").format(
                          "LLLL, UTCZZ"
                        )}
                  </h6>
                </div>

                <span className={classes.markdown}>
                  {ReactHtmlParser(leagueData.markdown)}
                </span>
              </div>

              <div className={classes.information}>
                <Card>
                  <img src={leagueData.img} alt="league" />
                </Card>

                <Card className={classes.infoCard}>
                  <CardBody className={classes.cardBody}>
                    <p>
                      Start date:{" "}
                      <b>
                        {isString(leagueData.raceDate)
                          ? leagueData.raceDate
                          : moment(leagueData.raceDate.toDate(), "en").format(
                              "LLLL, UTCZZ"
                            )}
                      </b>
                    </p>
                    <Divider />
                    <p>
                      Availablity:{" "}
                      <b>
                        {leagueData.availability - leagueData.drivers.length}/
                        {leagueData.availability}
                      </b>
                    </p>
                    <Divider />
                    <p>
                      Max penalties allowed:{" "}
                      <b>{leagueData.maxAllowedPenalties}</b>
                    </p>
                    <Divider />
                    <p>
                      No show penalty: <b>{leagueData.noShowPenalty}</b>
                    </p>
                    <Divider />
                    <p>
                      Withdrawals Allowed:{" "}
                      <b>{leagueData.withdrawalsAllowed}</b>
                    </p>
                    <Divider />
                    <p>
                      Fixed setup: <b>{leagueData.fixedSetup ? "Yes" : "No"}</b>
                    </p>
                    <Divider />
                  </CardBody>
                </Card>

                <Card className={classes.driversAccordion}>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h6 className={classes.heading}>
                        Registered Racers ({leagueData.drivers.length})
                      </h6>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.driversWrapper}>
                        {!isEmpty(leagueData.drivers)
                          ? leagueData.drivers.map((driver) => (
                              <div
                                key={driver.name}
                                className={classes.driverName}
                              >
                                <img
                                  src={driver.img}
                                  alt="driver"
                                  className={classes.driverImg}
                                />
                                {driver.name}
                                <Divider className={classes.divider} />
                              </div>
                            ))
                          : null}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Card>
                <Button className={classes.btn} onClick={joinRace}>
                  Register
                </Button>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index="two" className={classes.tabPanel}>
            {!isEmpty(leagueData) && !isEmpty(eventData) ? (
              <React.Fragment>
                <div className={classes.racesMain}>
                  {eventData.map((event, i) => (
                    <Card key={i} className={classes.card}>
                      <CardHeader className={classes.cardHeader}>
                        <img src={event.track.flag} />
                        {event.track.name.toUpperCase()}
                      </CardHeader>
                      <CardImg src={event.track.img} />
                      <CardBody>
                        <CardTitle className={classes.cardTitle}>
                          Round {i + 1}
                        </CardTitle>

                        {event.race.raceDate.toDate() < new Date() ? (
                          <h6 style={{ color: "green", fontWeight: "700" }}>
                            Race Complete
                          </h6>
                        ) : (
                          <React.Fragment>
                            <span className={classes.row}>
                              <span>
                                <CalendarIcon />
                                Date:
                              </span>
                              {moment(
                                event.race.raceDate.toDate(),
                                "en"
                              ).format("MMM DD HH:mm UTCZZ")}
                            </span>
                            <span className={classes.row}>
                              <span>
                                <AccessTimeIcon />
                                Duration:
                              </span>
                              {event.race.raceLengthInMinutes} Minutes
                            </span>
                          </React.Fragment>
                        )}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              "No Data"
            )}
          </TabPanel>

          <TabPanel value={tabValue} index="three" className={classes.tabPanel}>
            <h2>Test</h2>
          </TabPanel>
        </div>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  );
};

const LeaguePage = () => {
  return (
    <RaceProvider>
      <UserProvider>
        <InnerLeaguePage />
      </UserProvider>
    </RaceProvider>
  );
};

export default LeaguePage;
