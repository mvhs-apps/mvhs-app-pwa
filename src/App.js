// @flow

import React from 'react';

import './App.css';

import NotificationIcon from 'material-ui-icons/Notifications';

import MapIcon from 'material-ui-icons/Map';
import InfoIcon from 'material-ui-icons/Info';
import LinkIcon from 'material-ui-icons/Link';
import SettingsIcon from 'material-ui-icons/Settings';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import amber from 'material-ui/colors/amber';
import blue from 'material-ui/colors/blue';

import Router from 'react-router-dom/es/BrowserRouter';
import Route from 'react-router-dom/es/Route';
import Switch from 'react-router-dom/es/Switch';
import withRouter from 'react-router-dom/es/withRouter';
import type { RouterHistory } from 'react-router-dom';

import logo from './assets/outlinelogo.svg';

import Loadable from 'react-loadable';
import Analytics from './components/Analytics';
import Paper from 'material-ui/Paper';

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

const routes = ['/', '/map', '/links', '/about', '/settings'];

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: blue
  }
});

const AsyncSchedulePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "page-schedule" */ './containers/SchedulePageContainer'),
  loading: () => null
});
const AsyncMap = Loadable({
  loader: () =>
    import(/* webpackChunkName: "page-map" */ './containers/MapContainer'),
  loading: () => null
});
const AsyncLinks = Loadable({
  loader: () =>
    import(/* webpackChunkName: "page-link" */ './components/Links'),
  loading: () => null
});
const AsyncAbout = Loadable({
  loader: () =>
    import(/* webpackChunkName: "page-about" */ './components/AboutPage'),
  loading: () => null
});
const AsyncSettings = Loadable({
  loader: () =>
    import(/* webpackChunkName: "page-settings" */ './components/Settings'),
  loading: () => null
});
const AsyncSnackbar = Loadable({
  loader: () =>
    import(/* webpackChunkName: "snackbar" */ './components/SimpleSnackbar'),
  loading: () => null
});

const refresh = () => {
  window.location.reload();
};

const App = ({ showUpdate = false }: { showUpdate: boolean }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar>
            <Toolbar>
              <img src={logo} className="school-logo" alt="MVHS Logo" />
              <Typography type="title" color="inherit">
                MVHS
              </Typography>
            </Toolbar>

            <RouterTabs routes={routes} fullWidth={true} centered={true}>
              <LinkTab icon={<NotificationIcon />} to={routes[0]} />
              <LinkTab icon={<MapIcon />} to={routes[1]} />
              <LinkTab icon={<LinkIcon />} to={routes[2]} />
              <LinkTab icon={<InfoIcon />} to={routes[3]} />
              <LinkTab icon={<SettingsIcon />} to={routes[4]} />
            </RouterTabs>
          </AppBar>

          {process.env.NODE_ENV === 'production' && (
            <Route path="/" component={Analytics} />
          )}

          <div id={'content'}>
            <Switch>
              <Route exact path={routes[0]} component={AsyncSchedulePage} />
              <Route path={routes[1]} component={AsyncMap} />
              <Route path={routes[2]} component={AsyncLinks} />
              <Route path={routes[3]} component={AsyncAbout} />
              <Route path={routes[4]} component={AsyncSettings} />
            </Switch>
          </div>

          {showUpdate && (
            <AsyncSnackbar
              open={showUpdate}
              message="A new version of this app is available."
              buttonMessage="REFRESH"
              onButtonClick={refresh}
            />
          )}
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
