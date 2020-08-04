import React, { useContext } from "react";
import RaceProvider, { RaceContext } from "../../providers/raceProvider";
import classes from "./league.module.scss";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { LinearProgress, Divider } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { Card, CardBody, Button} from "shards-react";
import moment from "moment";

const InnerLeaguePage = () => {
  const raceProvider = useContext(RaceContext);
  const { league } = useParams();
  const leagueData = raceProvider.fetchRace(league);

  console.log(leagueData);
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
              <img src={leagueData.img} alt="league"/>
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
                  Availablity: <b>{leagueData.availability}/{leagueData.availability - leagueData.currentDriverCount} </b>
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

                <Button className={classes.btn}>Register</Button>
              </CardBody>
            </Card>
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
      <InnerLeaguePage />
    </RaceProvider>
  );
};

export default LeaguePage;
