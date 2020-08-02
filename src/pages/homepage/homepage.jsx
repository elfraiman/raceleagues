import React from 'react';
import Navbar from '../../components/navbar/navbar';
import classes from './homepage.module.scss';
import formulaPic from '../../assets/images/formula-e.png';
import amgGtPic from '../../assets/images/amggt3.jpg';
import LeagueCard from '../../components/league-card/leagueCard';
import gt4Cars from '../../assets/images/gt4cars.jpg';
import mclarenGt3 from '../../assets/images/mclaren-acc.jpg';

const HomePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.header}>
        <img src={formulaPic} alt="formula-e" />

        <div className={classes.rightDiv}>
          <h3>
            Join one of our offical racing <em className={classes.highlight}>Leagues</em> no matter your skill level, we have a league for you.
          </h3>
        </div>
      </div>

      <div className={classes.leagues}>

        <div className={classes.leagueCard}>
          <LeagueCard header="GT3 RL League" body="Offical RaceLeagues 5 race GT3 league" image={amgGtPic} button="More info" footer="Silver License" />
        </div>

        <div className={classes.leagueCard}>
          <LeagueCard header="GT4 RL League" title="100$ Prize" body="Offical RaceLeagues 5 race GT4 league" image={gt4Cars} button="Join" footer="Silver License" />
        </div>

        <div className={classes.leagueCard}>
          <LeagueCard header="FANATEC GT3 League" body="Fanatec 10 race GT3 league" image={mclarenGt3} button="Join" footer="Gold License" />
        </div>
      </div>

      <div className={classes.allRaces}>
        <div className={classes.racesLeft}>
          <h3>
            Meet fellow racers, make friends, race together and
            help grow the online sim-racers community!
          </h3>
        </div>
        <div className={classes.racesRight}>
          
        </div>

        <div className={classes.racesBottomLeft}>
          
        </div>

        <div className={classes.racesBottomRight}>
        <iframe src="https://discordapp.com/widget?id=739559664458661960&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;