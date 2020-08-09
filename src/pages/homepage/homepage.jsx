import { LinearProgress } from "@material-ui/core";
import { isEmpty, isString } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import { Button } from "shards-react";

import paulricard3gt3 from "../../assets/images/3hourspaulricard.jpg";
import gt3topview from "../../assets/images/mercgt3top.jpg";
import spa3mixed from "../../assets/images/spa3hoursmixed.jpg";
import spoolracingbmw from "../../assets/images/spoolracingbmw.png";
import LeagueCard from "../../components/league-card/leagueCard";
import ChampionshipProvider, { ChampionshipContext } from "../../providers/championshipProvider";
import UserProvider, { UserContext } from "../../providers/userProvider";
import classes from "./homepage.module.scss";

const InnerHomePage = () => {
  const history = useHistory();
  const championshipProvider = useContext(ChampionshipContext);
  const userProvider = useContext(UserContext);
  const [activeEvents, setActiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);


  useEffect(() => {
    const races = championshipProvider.championships;
    const upcomingArray = [];
    const activeArray = [];
    if (!isEmpty(races)) {
      races.forEach((race) => {
        if (isString(race.raceDate)) {
          activeArray.push(race);
          return;
        }
        if (race.races[0].raceDate.toDate() > new Date()) {
          upcomingArray.push(race);
        } else {
          activeArray.push(...activeEvents, race);
        }
      });
    }

    setActiveEvents(activeArray);
    setUpcomingEvents(upcomingArray);
  }, [championshipProvider]);

  const navigateToRaceOrLeague = (raceOrLeague, eventName) => {
    if (raceOrLeague === "endurance") {
      history.push(`/race/${eventName}`);
    } else {
      history.push(`/event/${eventName}`);
    }
  };

  const joinWithFB = () => {
    userProvider.loginWithFb();
  };

  return (
    <div className={classes.main}>
      <div  className={classes.header}>
        <img src={gt3topview} alt="formula-e" />

        <div className={classes.rightDiv}>
          <h3>
            Join one of our offical racing{" "}
            <em className={classes.highlight}>Leagues</em> no matter your skill
            level, we have a race for you.
          </h3>
          {isEmpty(userProvider.user) ? (
            <Button onClick={() => joinWithFB()}>JOIN NOW</Button>
          ) : null}
        </div>
      </div>

      <h2 className={classes.activeOrUpcoming}>Upcoming events</h2>

      {!isEmpty(championshipProvider.championships) ? (
        <React.Fragment>
          <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <Spring
                delay={300}
                to={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(200px)",
                }}
              >
                {(props) => (
                  <div className={classes.leagues} style={{ ...props }}>
                    {upcomingEvents.map((race, i) => (
                      <div
                        className={classes.leagueCard}
                        key={i}
                        onClick={() =>
                          navigateToRaceOrLeague(race.type, race.name)
                        }
                      >
                        <LeagueCard
                          header={race.title.toUpperCase()}
                          date={moment(
                            race.races[0].raceDate.toDate(),
                            "en"
                          ).format("LLLL, UTCZZ")}
                          type={race.type.toUpperCase()}
                          carClass={race.carClass.toUpperCase()}
                          image={race.img}
                          button="More info"
                          footer={race.level.toUpperCase()}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Spring>
            )}
          </VisibilitySensor>

          <h2 className={classes.activeOrUpcoming}>Active Events</h2>

          <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <Spring
                delay={300}
                to={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(200px)",
                }}
              >
                {(props) => (
                  <div className={classes.leagues} style={{ ...props }}>
                    {activeEvents.map((race, i) => (
                      <div
                        className={classes.leagueCard}
                        key={i}
                        onClick={() =>
                          navigateToRaceOrLeague(race.type, race.name)
                        }
                      >
                        <LeagueCard
                          header={race.title.toUpperCase()}
                          date={moment(
                            race.races[0].raceDate.toDate(),
                            "en"
                          ).format("LLLL, UTCZZ")}
                          type={race.type.toUpperCase()}
                          carClass={race.carClass.toUpperCase()}
                          image={race.img}
                          button="More info"
                          footer={race.level.toUpperCase()}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Spring>
            )}
          </VisibilitySensor>

          <div className={classes.checkeredGrid}>
            <div className={classes.racesTopLeft}>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <Spring
                    delay={300}
                    to={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(200px)",
                    }}
                  >
                    {(props) => (
                      <h3 style={{ ...props }}>
                        Meet fellow racers, make friends, race together and help
                        grow the online sim-racers community!
                      </h3>
                    )}
                  </Spring>
                )}
              </VisibilitySensor>
            </div>

            <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <Spring
                  delay={300}
                  to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(600px)",
                  }}
                >
                  {(props) => (
                    <div style={{ ...props }} className={classes.racesTopRight}>
                      <img src={spoolracingbmw} alt="spoolracing bmw" />
                    </div>
                  )}
                </Spring>
              )}
            </VisibilitySensor>

            <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <Spring
                  delay={300}
                  to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0px)"
                      : "translateY(200px)",
                  }}
                >
                  {(props) => (
                    <div
                      style={{ ...props }}
                      className={classes.racesBottomLeft}
                      onClick={() =>
                        navigateToRaceOrLeague(
                          "endurance",
                          "3hoursofpaulricard"
                        )
                      }
                    >
                      <img src={paulricard3gt3} alt="paulricard3hours" />
                    </div>
                  )}
                </Spring>
              )}
            </VisibilitySensor>

            <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <Spring
                  delay={300}
                  to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0px)"
                      : "translateY(200px)",
                  }}
                >
                  {(props) => (
                    <div
                      style={{ ...props }}
                      className={classes.racesBottomRight}
                      onClick={() =>
                        navigateToRaceOrLeague("endurance", "3hoursofspa")
                      }
                    >
                      <img src={spa3mixed} alt="3hoursofspa" />
                    </div>
                  )}
                </Spring>
              )}
            </VisibilitySensor>
          </div>
        </React.Fragment>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

const HomePage = () => {
  return (
    <ChampionshipProvider>
      <UserProvider>
        <InnerHomePage />
      </UserProvider>
    </ChampionshipProvider>
  );
};

export default HomePage;
