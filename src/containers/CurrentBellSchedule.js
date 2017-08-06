// @flow

import React from 'react';

import BellSchedule from '../components/BellSchedule.js';

const periods: Period[] = [
  {period: '0', time: '07:15-08:05'},
  {period: '1', time: '07:15-08:05'},
  {period: '2', time: '07:15-08:05'},
  {period: 'Brunch', time: '07:15-08:05'},
  {period: '3', time: '07:15-08:05'},
  {period: '4', time: '07:15-08:05'},
  {period: 'Lunch', time: '07:15-08:05'},
  {period: '5', time: '07:15-08:05'},
  {period: '6', time: '07:15-08:05'}
];

const CurrentBellSchedule = () => {
  return (
    <BellSchedule periods={periods}/>
  );
};

export default CurrentBellSchedule;
