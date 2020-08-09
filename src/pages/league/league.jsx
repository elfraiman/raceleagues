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
import ChampionshipProvider, { ChampionshipContext } from "../../providers/championshipProvider";
import UserProvider, { UserContext } from "../../providers/userProvider";
import classes from "./league.module.scss";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TrackProvider, { TrackContext } from "../../providers/trackProvider";

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
  const championshipProvider = useContext(ChampionshipContext);
  const trackProvider = useContext(TrackContext);
  const { league } = useParams();
  const leagueData = championshipProvider.fetchChampionship(league);
  const alert = useAlert();
  const [tabValue, setTabValue] = React.useState("one");
  const [eventData, setEventData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const joinRace = async () => {
    const user = await userProvider.user;
    const championship = championshipProvider.fetchChampionship(leagueData.id);
  
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
    const event = leagueData;
    championshipProvider.updateChampionshipDrivers(user, event)
  };

  const generateEventData = async () => {
    const races = leagueData.races;
    const eventData = [];

    races.forEach((race) => {
      const correctTrack = trackProvider.fetchTrack(race.track);

      const obj = {
        track: correctTrack,
        race: race,
      };

      eventData.push(obj);
    });

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
                    {isString(leagueData.races[0].raceDate)
                      ? leagueData.races[0].raceDate
                      : moment(
                          leagueData.races[0].raceDate.toDate(),
                          "en"
                        ).format("LLLL, UTCZZ")}
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
                        {isString(leagueData.races[0].raceDate)
                          ? leagueData.races[0].raceDate
                          : moment(
                              leagueData.races[0].raceDate.toDate(),
                              "en"
                            ).format("LLLL, UTCZZ")}
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
                          ? leagueData.drivers.map((driver, i) => (
                              <div
                                key={i}
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
                        <img src={event.track.flag} alt="country flag" />
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
            <div className={classes.driversMain}>
              {!isEmpty(leagueData) ? (
                <React.Fragment>
                  {leagueData.drivers.map((driver, i) => (
                    <Card className={classes.driverCard} key={i}>
                      <span className={classes.row}>
                        <img src={driver.img} alt="driver" />
                        <h3>{driver.name}</h3>
                        <p>Discord: {driver.discord}</p>
                      </span>
                    </Card>
                  ))}
                </React.Fragment>
              ) : (
                <h2>No Data</h2>
              )}
            </div>
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
    <ChampionshipProvider>
      <TrackProvider>
        <UserProvider>
          <InnerLeaguePage />
        </UserProvider>
      </TrackProvider>
    </ChampionshipProvider>
  );
};

export default LeaguePage;
