// @flow

import React from 'react';

import BellSchedule from '../components/BellSchedule';
import firebase from '../firebase';
import type {Period} from '../components/BellSchedule';

class CurrentBellSchedule extends React.PureComponent {
  state = {
    periods: []
  };

  db: Database;

  constructor() {
    super();
    this.db = firebase.database();

    this.getBellSchedule().then(
      (periods: Period[]) => {
        this.setState({
          periods: periods
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  async getBellSchedule() {
    const now = new Date();
    const dayOfWeek = now.getDay();

    let snapshot = await this.db.ref('/weekday-map').once('value');
    const weekdayMap = snapshot.val();
    const schedule: string = weekdayMap[dayOfWeek];

    snapshot = await this.db.ref(`/schedules/${schedule}`).once('value');
    const periods: Period[] = [];
    const scheduleData = snapshot.val();
    for (const periodTime: string in scheduleData) {
      const startHour = periodTime.substr(0, 2);
      const startMin = periodTime.substr(2, 2);
      const endHour = periodTime.substr(5, 2);
      const endMin = periodTime.substr(7, 2);
      periods.push({
        period: scheduleData[periodTime],
        time: `${startHour}:${startMin}-${endHour}:${endMin}`
      });
    }

    return periods;
  }

  render() {
    return <BellSchedule periods={this.state.periods} />;
  }
}

export default CurrentBellSchedule;
