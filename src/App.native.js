// @flow

import * as React from 'react';

import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';

import SchedulePageContainer from './containers/SchedulePageContainer';
import Map from './components/Map.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.grey100
  },
  statusBar: {
    backgroundColor: COLOR.amber500,
    height: Platform.OS === 'ios' ? 20 : 24
  },
  tabBar: {
    backgroundColor: COLOR.amber500
  },
  tabLabel: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  tabIndicator: {
    backgroundColor: COLOR.blue500
  }
});

const uiTheme = {
  fontFamily: null,
  palette: {
    primaryColor: COLOR.amber500,
    accentColor: COLOR.blue500
  },
  toolbar: {
    container: {
      height: 56,
      elevation: 0
    },
    titleText: {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  }
};

const FirstRoute = () => <SchedulePageContainer />;
const SecondRoute = () => <Map />;

type State = {
  index: number,
  routes: { key: string, title: string }[]
};

class App extends React.PureComponent<void, State> {
  state = {
    index: 0,
    routes: [
      { key: 'schedule', title: 'schedule' },
      { key: 'map', title: 'map' }
    ]
  };

  handleIndexChange = (index: number) => this.setState({ index });

  renderHeader = (props: any) =>
    <TabBar
      labelStyle={styles.tabLabel}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator}
      {...props}
    />;

  renderScene = SceneMap({
    schedule: FirstRoute,
    map: SecondRoute
  });

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
          <View style={[styles.statusBar]} />
          <Toolbar centerElement="MVHS App" />
          <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this.renderScene}
            renderHeader={this.renderHeader}
            onIndexChange={this.handleIndexChange}
          />
        </View>
      </ThemeProvider>
    );
  }
}

export default App;
