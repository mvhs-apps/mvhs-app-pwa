import * as React from 'react';

import { Font } from 'expo';
import { Text } from 'react-native';

type State = {
  fontLoaded: boolean
};

class Icon extends React.PureComponent<void, State> {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Material Icons': require('../../native/assets/MaterialIcons.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  textStyle = { fontFamily: 'Material Icons', fontSize: 24 };

  render() {
    return this.state.fontLoaded ? (
      <Text style={[this.textStyle, this.props.style]}>
        {this.props.children}
      </Text>
    ) : (
      <Text style={this.props.style} />
    );
  }
}

export default Icon;
