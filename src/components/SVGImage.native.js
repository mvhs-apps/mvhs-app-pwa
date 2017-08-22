// @flow

import * as React from 'react';
import {
  View,
  Platform,
  WebView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { COLOR } from 'react-native-material-ui';

type Props = {
  style: any,
  svgString: string,
  showWebviewLoader: boolean,
  height: number
};

export default class SVGImage extends React.PureComponent<Props> {
  static defaultProps = {
    style: {},
    svgString: '',
    showWebviewLoader: Platform.OS === 'android',
    height: null
  };

  renderLoader = () =>
    <View
      style={[
        this.props.style,
        { flex: 1, alignItems: 'center', justifyContent: 'center' }
      ]}
    >
      <ActivityIndicator />
    </View>;

  render() {
    const { showWebviewLoader, svgString, style, ...restOfProps } = this.props;
    const { height, width } = StyleSheet.flatten(style || []);

    const html = `
      <!DOCTYPE html>\n
      <html>
        <head>
          <style type="text/css">
            img {
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
            div {
              width: ${width ? width + 'px' : 'auto'};
              height: ${height ? height + 'px' : 'auto'};
            }
            body {
              margin: 0;
              background-color: ${COLOR.grey100}
            }
          </style>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div>
            ${svgString}
          </div>
        </body>
      </html>
    `;

    return (
      <WebView
        startInLoadingState={showWebviewLoader}
        renderLoading={showWebviewLoader ? this.renderLoader : null}
        scalesPageToFit={false}
        style={style}
        {...restOfProps}
        source={{ html }}
      />
    );
  }
}
