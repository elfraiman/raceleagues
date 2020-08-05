import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../../pages/homepage/homepage";
import RacePage from "../../pages/race/singleRace";
import LeaguePage from "../../pages/league/league";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/race/:race" component={RacePage} />
      <Route path="/event/:league" component={LeaguePage} />
    </Switch>
  );
};

export default Routes;
