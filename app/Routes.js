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
      <Route exact path={routes.HOME} component={HomeContainer} />
      <Route path={routes.DBPAGE} component={DataBaseContainer} />
    </Switch>
  </App>
);
