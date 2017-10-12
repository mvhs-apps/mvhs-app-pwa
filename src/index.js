// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import { prerender, isPrerendering } from 'react-snapshot';
import Loadable from 'react-loadable';

import './index.css';
import App from './App';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import registerServiceWorker from './registerServiceWorker';

import './utils/addtohomescreen.js';
import './utils/addtohomescreen.css';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';

import type StyleSheet from 'jss/lib/StyleSheet';
import type { Rule, generateClassName } from 'jss/lib/types';

const hashCode = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var character = str.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default function createGenerateClassName(): generateClassName {
  return (rule: Rule, sheet?: StyleSheet): string => {
    return `c${Math.abs(hashCode(JSON.stringify(rule.style)))
      .toString(36)
      .substr(0, 4)}`;
  };
}

const sheetsRegistry = new SheetsRegistry();

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

if (isPrerendering()) {
  //Prerender during compilation
  window.reactSnapshotRender();

  Loadable.preloadAll().then(() => {
    prerender(
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <App />
      </JssProvider>,
      document.getElementById('root')
    );

    const css = sheetsRegistry.toString();

    console.log(css);

    document.getElementById('jss-server-side').innerHTML = css;
    console.log(document.getElementById('jss-server-side').innerHTML);
  });
} else if (document.getElementById('root').childElementCount > 0) {
  //Hydration in production
  ReactDOM.hydrate(
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <App />
    </JssProvider>,
    document.getElementById('root'),
    () => {}
  );
} else {
  //Render in development
  ReactDOM.render(
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <App />
    </JssProvider>,
    document.getElementById('root')
  );
}

registerServiceWorker();
if (!('serviceWorker' in navigator)) OfflinePluginRuntime.install();

window.addToHomescreen({
  lifespan: 0,
  skipFirstVisit: false,
  maxDisplayCount: 1,
  validLocation: [/^\/$/]
});
