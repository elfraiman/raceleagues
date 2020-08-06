import React, { useContext } from "react";
import RaceProvider, { RaceContext } from "../../providers/raceProvider";
import classes from "./league.module.scss";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { LinearProgress, Divider } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { Card, CardBody, Button } from "shards-react";
import moment from "moment";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserProvider, { UserContext } from "../../providers/userProvider";
import firebase from "../../firebase.js";
import { useAlert } from "react-alert";

const database = firebase.firestore();

const InnerLeaguePage = () => {
  const userProvider = useContext(UserContext);
  const raceProvider = useContext(RaceContext);
  const { league } = useParams();
  const leagueData = raceProvider.fetchRace(league);
  const alert = useAlert();

  const joinRace = async () => {
    const user = await userProvider.user;

    const championshipRef = database
      .collection("championships")
      .doc(leagueData.name);

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
    <React.Fragment>
      {!isEmpty(leagueData) ? (
        <div className={classes.main}>
          <div className={classes.leagueData}>
            <div className={classes.title}>
              <h3>{leagueData.title.toUpperCase()}</h3>
              <h6>
                {" "}
                {moment(leagueData.raceDate.toDate(), "en").format(
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
                    {moment(leagueData.raceDate.toDate(), "en").format(
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
                  Max penalties allowed: <b>{leagueData.maxAllowedPenalties}</b>
                </p>
                <Divider />
                <p>
                  No show penalty: <b>{leagueData.noShowPenalty}</b>
                </p>
                <Divider />
                <p>
                  Withdrawals Allowed: <b>{leagueData.withdrawalsAllowed}</b>
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
                    {leagueData.drivers.map((driver) => (
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
            <Button className={classes.btn} onClick={joinRace}>
              Register
            </Button>
          </div>
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
