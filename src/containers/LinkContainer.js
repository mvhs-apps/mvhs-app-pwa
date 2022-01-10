//@ flow

import React from 'react';

import creditsData from '../assets/links.json';

import LinksCss from '../components/LinksCss';

const localStorage = window.localStorage;

// get name and id from localStorage
const getNameAndId = () => {
  const settings = localStorage.getItem('settings');
  if (settings) {
    return JSON.parse(settings);
  }
  return {
    name: '',
    id: ''
  };
};
// entry.68035700 - name
// entry.1297547436 - id
// entry.899973902 - Have you experienced COVID-19 symptoms within the past 14 days
// entry.1141781282 - Have you had a positive COVID test within the last 10 days
// entry.1853050928 - I am testing weekly and am making sure that I do not have COVID symptoms BEFORE I come to school

class LinkContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    // get name and id from localStorage
    const { name, id } = getNameAndId();
    this.state = {
      name,
      id
    };
    // add event listener to localStorage
    window.addEventListener('storage', this.onStorageChange);
  }
  onStorageChange = event => {
    if (event.key === 'settings') {
      const { name, id } = JSON.parse(event.newValue);
      this.setState({
        name,
        id
      });
    }
  };
  componentWillUnmount() {
    window.removeEventListener('storage', this.onStorageChange);
  }
  render() {
    const { name, id } = getNameAndId();
    let link =
      'https://docs.google.com/forms/d/e/1FAIpQLSfjtuFWUak0QJaiUOvaEo055pr6Tz9OW2dkeT0D6-zZfeCuCQ/viewform?';
    if (name && id) {
      link +=
        'entry.68035700=' +
        encodeURIComponent(name) +
        '&entry.1297547436=' +
        encodeURIComponent(id);
    }

    for (let i = 0; i < creditsData.length; i++) {
      const { image } = creditsData[i];
      if (image == 'covid.png') {
        creditsData[i].links.Link = link;
      }
    }
    return <LinksCss profiles={creditsData} />;
  }
}

export default LinkContainer;
