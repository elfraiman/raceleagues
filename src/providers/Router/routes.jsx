import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../../pages/homepage/homepage';
import RacePage from '../../pages/race/race';

const Routes = () => {
  return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/race/:race" component={RacePage} />
      </Switch>
  );
};

export default Routes;