import React from 'react';

import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const FirstRoute = () =>
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;

class App extends React.PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'schedule', title: 'schedule' },
      { key: 'map', title: 'map' }
    ]
  };

  handleIndexChange = index => this.setState({ index });

  renderHeader = props => <TabBar {...props} />;

  renderScene = SceneMap({
    schedule: FirstRoute
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

export default App;
