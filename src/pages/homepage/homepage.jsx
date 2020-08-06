import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import { Button } from "shards-react";
import paulricard3gt3 from "../../assets/images/3hourspaulricard.jpg";
import formulaPic from "../../assets/images/formula-e.png";
import spa3mixed from "../../assets/images/spa3hoursmixed.jpg";
import spoolracingbmw from "../../assets/images/spoolracingbmw.png";
import LeagueCard from "../../components/league-card/leagueCard";
import RaceProvider, { RaceContext } from "../../providers/raceProvider";
import classes from "./homepage.module.scss";
import { isEmpty } from "lodash";
import { LinearProgress } from "@material-ui/core";
import moment from "moment";
import UserProvider, { UserContext } from "../../providers/userProvider";



const InnerHomePage = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });
  const history = useHistory();
  const raceProvider = useContext(RaceContext);
  const userProvider = useContext(UserContext);


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

  useEffect(() => {
    console.log(raceProvider, "race provider");
  }, [raceProvider]);

  return (
    <div className={classes.main}>
      <animated.div style={fadeIn} className={classes.header}>
        <img src={formulaPic} alt="formula-e" />

        <div className={classes.rightDiv}>
          <h3>
            Join one of our offical racing{" "}
            <em className={classes.highlight}>Leagues</em> no matter your skill
            level, we have a race for you.
          </h3>
          <Button onClick={() => joinWithFB()}>JOIN NOW</Button>
        </div>
      </animated.div>

      <h2 style={{ textAlign: "center", marginBottom: 36, marginTop: 36 }}>
        Upcoming events
      </h2>

      {!isEmpty(raceProvider.races) ? (
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
                    {raceProvider.races.map((race, i) => (
                      <div
                        className={classes.leagueCard}
                        key={i}
                        onClick={() =>
                          navigateToRaceOrLeague(race.type, race.name)
                        }
                      >
                        <LeagueCard
                          header={race.title.toUpperCase()}
                          date={moment(race.raceDate.toDate(), "en").format(
                            "LLLL, UTCZZ"
                          )}
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

          <h2 style={{ textAlign: "center", marginBottom: 36 }}>
            Active Events
          </h2>

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
                    <div className={classes.leagueCard}>
                      <LeagueCard
                        header="3 Hours of Spa"
                        date="THURSDAYS AT 8:00PM UTC+2"
                        type="Endurance Race"
                        carClass="MIXED"
                        image={spa3mixed}
                        button="More info"
                        footer="Rookie"
                      />
                    </div>
                    <div className={classes.leagueCard}>
                      <LeagueCard
                        header="3 Hours of Paul Ricard"
                        date="SATURDAYS AT 15:00PM UTC+2"
                        type="Endurance Race"
                        carClass="GT3"
                        image={paulricard3gt3}
                        button="Join"
                        footer="Rookie"
                      />
                    </div>
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
    <RaceProvider>
      <UserProvider>
      <InnerHomePage />
      </UserProvider>
    </RaceProvider>
  );
};

export default HomePage;
