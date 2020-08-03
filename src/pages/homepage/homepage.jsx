import React from "react";
import { animated, useSpring } from "react-spring";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";

import paulricard3gt3 from "../../assets/images/3hourspaulricard.jpg";
import amgGtPic from "../../assets/images/amggt3.jpg";
import formulaPic from "../../assets/images/formula-e.png";
import gt4Cars from "../../assets/images/gt4cars.jpg";
import mclarenGt3 from "../../assets/images/mclaren-acc.jpg";
import spa3mixed from "../../assets/images/spa3hoursmixed.jpg";
import LeagueCard from "../../components/league-card/leagueCard";
import classes from "./homepage.module.scss";
import { useHistory } from "react-router-dom";
import { Button } from "shards-react";
import firebase from "../../firebase.js";

const HomePage = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  const history = useHistory();

  const navigateToRace = (race) => {
    history.push(`/race/${race}`);
  };

  var provider = new firebase.auth.FacebookAuthProvider();

  const joinWithFB = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result, 'result');
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // ...
      })
      .catch(function (error) {
        console.error(error);
      });
  };

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

      <h2 style={{ textAlign: "center", marginBottom: 36 }}>Upcoming events</h2>
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
                    header="SPOOLRACING GT3 League"
                    body="Offical SPOOLRACING GT3 league"
                    date="Starting August 29 at 08:00PM UTC+2"
                    type="League"
                    image={amgGtPic}
                    button="More info"
                    footer="Rookie"
                  />
                </div>
                <div className={classes.leagueCard}>
                  <LeagueCard
                    header="SPOOLRACING GT4 League"
                    date="Starting August 29 at 08:00PM UTC+2"
                    type="League"
                    body="Offical SPOOLRACING Rookie GT4 league"
                    image={gt4Cars}
                    button="Join"
                    footer="Rookie"
                  />
                </div>
                <div className={classes.leagueCard}>
                  <LeagueCard
                    header="FANATEC GT3 League"
                    body="Fanatec 10 race GT3 league"
                    date="Starting September 1 at 08:00PM UTC+2"
                    type="League"
                    image={mclarenGt3}
                    button="Join"
                    footer="Pro"
                  />
                </div>
              </div>
            )}
          </Spring>
        )}
      </VisibilitySensor>

      <h2 style={{ textAlign: "center", marginBottom: 36 }}>Active Events</h2>
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
                  transform: isVisible ? "translateY(0)" : "translateY(200px)",
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
              delay={500}
              to={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(600px)",
              }}
            >
              {(props) => (
                <div
                  style={{ ...props }}
                  className={classes.racesTopRight}
                  onClick={() => navigateToRace("3hoursofspa")}
                >
                  <img src={spa3mixed} alt="3hoursofspa" />
                </div>
              )}
            </Spring>
          )}
        </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring
              delay={400}
              to={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(200px)",
              }}
            >
              {(props) => (
                <div
                  style={{ ...props }}
                  className={classes.racesBottomLeft}
                  onClick={() => navigateToRace("3hoursofpaulricard")}
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
              delay={400}
              to={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(200px)",
              }}
            >
              {(props) => (
                <div style={{ ...props }} className={classes.racesBottomRight}>
                  <iframe
                    title="discord-widget"
                    src="https://discordapp.com/widget?id=739559664458661960&theme=dark"
                    width="350"
                    height="400"
                    allowtransparency="true"
                    frameBorder="false"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  ></iframe>
                </div>
              )}
            </Spring>
          )}
        </VisibilitySensor>
      </div>
    </div>
  );
};

export default HomePage;
