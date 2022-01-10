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

creditsData.push({
  name: 'Covid-19 Student Tracker',
  role: '',
  desc: '',
  image: 'covid.png',
  links: {
    Link: link
  }
});

class LinkContainer extends React.PureComponent {
  render() {
    return <LinksCss profiles={creditsData} />;
  }
}

export default LinkContainer;
