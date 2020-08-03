import React from 'react';

import paulricard3gt3 from '../../assets/images/3hourspaulricard.jpg';
import amgGtPic from '../../assets/images/amggt3.jpg';
import formulaPic from '../../assets/images/formula-e.png';
import gt4Cars from '../../assets/images/gt4cars.jpg';
import mclarenGt3 from '../../assets/images/mclaren-acc.jpg';
import spa3mixed from '../../assets/images/spa3hoursmixed.jpg';
import LeagueCard from '../../components/league-card/leagueCard';
import TopNavBar from '../../components/navbar/navbar';
import classes from './homepage.module.scss';
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 60, 1.02]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const HomePage = () => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 0.5, tension: 250, friction: 20 } }))
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <React.Fragment>
      <TopNavBar />
      <animated.div style={fadeIn} className={classes.header}>

        <img src={formulaPic} alt="formula-e" />

        <div className={classes.rightDiv}>
          <h3>
            Join one of our offical racing <em className={classes.highlight}>Leagues</em> no matter your skill level, we have a league for you.
          </h3>
        </div>

      </animated.div>

      <div className={classes.leagues}>

        <animated.div className={classes.leagueCard}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}>
          <LeagueCard header="GT3 RL League" body="Offical RaceLeagues 5 race GT3 league" image={amgGtPic} button="More info" footer="Silver License" />
        </animated.div>

        <animated.div className={classes.leagueCard}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}>
          <LeagueCard header="GT4 RL League" title="100$ Prize" body="Offical RaceLeagues 5 race GT4 league" image={gt4Cars} button="Join" footer="Silver License" />
        </animated.div>

        <animated.div className={classes.leagueCard}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}>
          <LeagueCard header="FANATEC Mixed League" body="Fanatec 10 race GT3 league" image={mclarenGt3} button="Join" footer="Gold License" />
        </animated.div>
      </div>

      <div className={classes.allRaces}>
        <div className={classes.racesTopLeft}>
          <h3>
            Meet fellow racers, make friends, race together and
            help grow the online sim-racers community!
          </h3>
        </div>

        <div className={classes.racesTopRight}>
          <img src={spa3mixed} alt="spa3hours" />
        </div>

        <div className={classes.racesBottomLeft}>
          <img src={paulricard3gt3} alt="paulricard3hours" />
        </div>

        <div className={classes.racesBottomRight}>
          <iframe title="discord-widget" src="https://discordapp.com/widget?id=739559664458661960&theme=dark" width="350" height="400" allowtransparency="true" frameBorder="false" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;