import React from 'react';
import { animated, useSpring } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';

import paulricard3gt3 from '../../assets/images/3hourspaulricard.jpg';
import amgGtPic from '../../assets/images/amggt3.jpg';
import formulaPic from '../../assets/images/formula-e.png';
import gt4Cars from '../../assets/images/gt4cars.jpg';
import mclarenGt3 from '../../assets/images/mclaren-acc.jpg';
import spa3mixed from '../../assets/images/spa3hoursmixed.jpg';
import LeagueCard from '../../components/league-card/leagueCard';
import classes from './homepage.module.scss';
import { useHistory } from 'react-router-dom';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 60, 1.02]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const HomePage = () => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 0.5, tension: 250, friction: 20 } }))
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } })
  const history = useHistory();

  const navigateToRace = (race) => {
    history.push(`/race/${race}`);
  }
  return (
    <React.Fragment>
      <animated.div style={fadeIn} className={classes.header}>

      <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <Spring
                delay={400}
                to={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0)"
                    : "translateX(-400px)",
                }}
              >
                {(props) => (
                 <img style={{ ...props }}src={formulaPic} alt="formula-e" />
                )}
              </Spring>

            )}
          </VisibilitySensor>
        

        <div className={classes.rightDiv}>
          <h3>
            Join one of our offical racing <em className={classes.highlight}>Leagues</em> no matter your skill level, we have a race for you.
          </h3>
        </div>

      </animated.div>

      <div className={classes.leagues}>

        <animated.div className={classes.leagueCard}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}>
          <LeagueCard header="SPOOLRACING GT3 Rookie League" body="Offical SPOOLRACING Rookie GT3 league" image={amgGtPic} button="More info" footer="Rookie" />
        </animated.div>

        <animated.div className={classes.leagueCard}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}>
          <LeagueCard header="SPOOLRACING GT4 Rookie League" title="100$ Prize" body="Offical SPOOLRACING Rookie GT4 league" image={gt4Cars} button="Join" footer="Rookie" />
        </animated.div>

        <animated.div className={classes.leagueCard}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}>
          <LeagueCard header="FANATEC GT3 Pro League" body="Fanatec 10 race GT3 league" image={mclarenGt3} button="Join" footer="Pro"/>
        </animated.div>
      </div>

      <div className={classes.allRaces}>
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
                    Meet fellow racers, make friends, race together and
                    help grow the online sim-racers community!
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
                transform: isVisible
                  ? "translateX(0)"
                  : "translateX(600px)",
              }}
            >
              {(props) => (
                <div style={{ ...props }} className={classes.racesTopRight} onClick={() => navigateToRace("3hoursofspa")}>
                  <img src={spa3mixed} alt="3hoursofspa"  />
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
                transform: isVisible
                  ? "translateX(0px)"
                  : "translateX(-200px)",
              }}
            >
              {(props) => (
                <div style={{ ...props }} className={classes.racesBottomLeft} onClick={() => navigateToRace("3hoursofpaulricard")}>
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
                transform: isVisible
                  ? "translateY(0px)"
                  : "translateY(200px)",
              }}
            >
              {(props) => (
                <div style={{ ...props }} className={classes.racesBottomRight}>
                  <iframe title="discord-widget" src="https://discordapp.com/widget?id=739559664458661960&theme=dark" width="350" height="400" allowtransparency="true" frameBorder="false" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
              )}
            </Spring>
          )}
        </VisibilitySensor>


      </div>
    </React.Fragment>
  )
}

export default HomePage;