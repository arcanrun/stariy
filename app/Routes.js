//@flow
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import {
  HomeContainer,
  HeaderContainer,
  MenuContainer,
  DataBaseContainer
} from './containers';

export default () => (
  <App>
    <HeaderContainer />
    <MenuContainer />
    <Switch>
      <Route exact path={routes.DBPAGE} component={HomeContainer} />
      <Route path={routes.HOME} component={DataBaseContainer} />
    </Switch>
  </App>
);
