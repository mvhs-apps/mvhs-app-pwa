// @flow

import React from 'react';

import './App.css';

import NotificationIcon from 'material-ui-icons/Notifications';
import MapIcon from 'material-ui-icons/Map';
import SearchIcon from 'material-ui-icons/Search';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';

import CurrentBellSchedule from './containers/CurrentBellSchedule';
import Map from './components/map';
import Search from './components/search';

import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';

const LinkTab = withRouter(
  ({ to, history, ...props }: { to: string, history: RouterHistory }) =>
    <Tab
      onClick={() => {
        history.push(to);
      }}
      {...props}
    />
);

const handleTabChange = () => {};
const RouterTabs = withRouter(
  ({
    history,
    routes,
    ...props
  }: {
    history: RouterHistory,
    routes: string[]
  }) => {
    const index = routes.indexOf(history.location.pathname);
    return <Tabs index={index || 0} onChange={handleTabChange} {...props} />;
  }
);

const routes = ['/', '/map', '/search'];

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              MVHS App
            </Typography>
          </Toolbar>

          <RouterTabs routes={routes} fullWidth={true} centered={true}>
            <LinkTab icon={<NotificationIcon />} to={routes[0]} />
            <LinkTab icon={<MapIcon />} to={routes[1]} />
            <LinkTab icon={<SearchIcon />} to={routes[2]} />
          </RouterTabs>
        </AppBar>

        <Route exact path={routes[0]} component={CurrentBellSchedule} />
        <Route path={routes[1]} component={Map} />
        <Route path={routes[2]} component={Search} />
      </div>
    </Router>
  );
};

export default App;
