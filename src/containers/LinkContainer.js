//@ flow

import React from 'react';

import creditsData from '../assets/links.json';

import LinksCss from '../components/LinksCss';

const localStorage = window.localStorage;

// entry.68035700 - name
// entry.1297547436 - id
// entry.899973902 - Have you experienced COVID-19 symptoms within the past 14 days
// entry.1141781282 - Have you had a positive COVID test within the last 10 days
// entry.1853050928 - I am testing weekly and am making sure that I do not have COVID symptoms BEFORE I come to school

class LinkContainer extends React.PureComponent {
  render() {
    return <LinksCss profiles={creditsData} />;
  }
}

export default LinkContainer;
