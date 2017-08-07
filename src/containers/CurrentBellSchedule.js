// @flow

import React from 'react';

import BellSchedule from '../components/BellSchedule';
import firebase from '../firebase';
import type {Period} from '../components/BellSchedule';
import parse from 'date-fns/parse';
import endOfDay from 'date-fns/endOfDay';

const pad = (num, size) => {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

const to12Hour = (hour: string) => {
  const hourInt = parseInt(hour);
  return pad(hourInt > 12 ? hourInt - 12 : hourInt, 2);
}

class CurrentBellSchedule extends React.PureComponent {
  state = {
    periods: [],
    loading: true
  };

  db: Database;

  constructor() {
    super();
    this.db = firebase.database();

    this.getBellSchedule().then(
      (periods: Period[]) => {
        this.setState({
          periods: periods,
          loading: false
        });
      },
      err => {
        console.log(err);
        this.setState({
          loading: false
        });
      }
    );
  }

  async getFirebaseVal(ref: string){
    return (await this.db.ref(ref).once('value')).val();
  }

  async getBellSchedule() {
    const now = new Date();
    const dayOfWeek = /*now.getDay()*/ 1;

    let schedule: string = '';
    const specialDays = await this.getFirebaseVal(`/days`);
    for (const specDay: string in specialDays) {
      const lastMidnight = new Date();
      lastMidnight.setHours(0, 0, 0, 0);
      const start = specDay.substr(0, 8);
      const end = specDay.substr(9, 8);
      const startDate = parse(start, 'MMDDYYYY', lastMidnight);
      const endDate = endOfDay(parse(end, 'MMDDYYYY', lastMidnight));
      if (now.getTime() < endDate.getTime() && now.getTime() > startDate.getTime()) {
        schedule = specialDays[specDay];
      }
    }

    console.log(schedule);

    if (!schedule) {
      const weekdayMap = await this.getFirebaseVal('/weekday-map');
      schedule = weekdayMap[dayOfWeek];
    }

    const periods: Period[] = [];

    if (schedule !== 'none') {
      const scheduleData = await this.getFirebaseVal(`/schedules/${schedule}`);
      for (const periodTime: string in scheduleData) {
        const startHour = to12Hour(periodTime.substr(0, 2));
        const startMin = periodTime.substr(2, 2);
        const endHour = to12Hour(periodTime.substr(5, 2));
        const endMin = periodTime.substr(7, 2);
        periods.push({
          period: scheduleData[periodTime],
          time: `${startHour}:${startMin} - ${endHour}:${endMin}`
        });
      }
    }

    return periods;
  }

  render() {
    return <BellSchedule periods={this.state.periods} loading={this.state.loading}/>;
  }
}

export default CurrentBellSchedule;
