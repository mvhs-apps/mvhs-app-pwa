// @flow

import React from 'react';

import BellSchedule from '../components/BellSchedule';
import firebase from '../firebase';

class CurrentBellSchedule extends React.PureComponent {
  state = {
    periods: [
      { period: '0', time: '07:15-08:05' },
      { period: '1', time: '07:15-08:05' },
      { period: '2', time: '07:15-08:05' },
      { period: 'Brunch', time: '07:15-08:05' },
      { period: '3', time: '07:15-08:05' },
      { period: '4', time: '07:15-08:05' },
      { period: 'Lunch', time: '07:15-08:05' },
      { period: '5', time: '07:15-08:05' },
      { period: '6', time: '07:15-08:05' }
    ]
  };

  db: Database;

  constructor() {
    super();
    this.db = firebase.database();

    this.getBellSchedule().then(
      () => {
        this.setState({});
      },
      err => {
        console.log(err);
      }
    );
  }

  async getBellSchedule() {
    const now = new Date();
    const dayOfWeek = /*now.getDay()*/ 1;

    let snapshot = await this.db.ref('/weekday-map').once('value');
    const weekdayMap = snapshot.val();
    const schedule: string = weekdayMap[dayOfWeek];

    console.log(weekdayMap);

    snapshot = await this.db.ref(`/schedules/${schedule}`).once('value');
    const scheduleData = snapshot.val();
    for (const periodTime: string in scheduleData) {
      const start = periodTime.substr(0, 4);
      const end = periodTime.substr(5, 4);
    }
  }

  render() {
    return <BellSchedule periods={this.state.periods} />;
  }
}

export default CurrentBellSchedule;
