// @flow

import React from 'react';

import './App.css';

import NotificationIcon from 'material-ui-icons/Notifications';
import MapIcon from 'material-ui-icons/Map';
//import SearchIcon from 'material-ui-icons/Search';
import AppBar from 'material-ui/AppBar';
import InfoIcon from 'material-ui-icons/Info';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import { MuiThemeProvider } from 'material-ui/styles';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import amber from 'material-ui/colors/amber';
import blue from 'material-ui/colors/blue';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom/es';
import type { RouterHistory } from 'react-router-dom';

import logo from './assets/outlinelogo.svg';

import asyncComponent from './components/asyncComponent';
import SimpleSnackbar from './components/SimpleSnackbar';

const LinkTab = withRouter(
  ({ to, history, ...props }: { to: string, history: RouterHistory }) => (
    <Tab
      onClick={() => {
        history.push(to);
      }}
      {...props}
    />
  )
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
    return <Tabs value={index || 0} onChange={handleTabChange} {...props} />;
  }
);

const routes = ['/', '/map', /*'/search', */ '/about'];

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: blue
  }
});

const AsyncSchedulePage = asyncComponent(() =>
  import(/* webpackChunkName: "page-schedule" */ './containers/SchedulePageContainer')
);
const AsyncMap = asyncComponent(() =>
  import(/* webpackChunkName: "page-map" */ './components/Map')
);
const AsyncAbout = asyncComponent(() =>
  import(/* webpackChunkName: "page-about" */ './components/AboutPage')
);

const refresh = () => {
  window.location.reload();
};

const App = ({ showUpdate = false }: { showUpdate: boolean }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <img src={logo} className="school-logo" alt="MVHS Logo" />
              <Typography type="title" color="inherit">
                MVHS App
              </Typography>
            </Toolbar>

            <RouterTabs routes={routes} fullWidth={true} centered={true}>
              <LinkTab icon={<NotificationIcon />} to={routes[0]} />
              <LinkTab icon={<MapIcon />} to={routes[1]} />
              {/*<LinkTab icon={<SearchIcon />} to={routes[2]} />*/}
              <LinkTab icon={<InfoIcon />} to={routes[2]} />
            </RouterTabs>
          </AppBar>

          <Switch>
            <Route exact path={routes[0]} component={AsyncSchedulePage} />
            <Route path={routes[1]} component={AsyncMap} />
            {/*<Route path={routes[2]} component={Search} />*/}
            <Route path={routes[2]} component={AsyncAbout} />
          </Switch>

          <SimpleSnackbar
            open={showUpdate}
            message="A new version of this app is available."
            buttonMessage="REFRESH"
            onButtonClick={refresh}
          />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
