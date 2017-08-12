// @flow

import React from 'react';

import BellSchedule from '../components/BellSchedule';
import firebase from '../firebase';
import type { Period } from '../components/BellSchedule';
import moment from 'moment';
import DatePicker from '../components/DatePicker';

const pad = (num, size) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
};

const to12Hour = (hour: string) => {
  const hourInt = parseInt(hour);
  return pad(hourInt > 12 ? hourInt - 12 : hourInt, 2);
};

class CurrentBellSchedule extends React.PureComponent {
  state = {
    periods: [],
    loading: true,
    date: moment(),
    scheduleName: ''
  };

  db: Database;

  constructor() {
    super();
    this.db = firebase.database();
  }

  componentDidMount() {
    this.loadBellSchedule();
  }

  loadBellSchedule() {
    this.setState({
      loading: true
    });
    this.getBellSchedule().then(
      result => {
        console.log(result);
        this.setState({
          scheduleName: result.scheduleName,
          periods: result.periods,
          loading: false
        });
      },
      err => {
        console.log(err);
        this.setState({
          scheduleName: 'Loading Error',
          loading: false
        });
      }
    );
  }
  getCurrentPeriod() {
    //getting current time and date
    const currentDate = new Date();
    const currentHour = currentdate.getHours();
    const currentMinute = currentdate.getMinutes();
    for (const periodTime: string in scheduleData) {
      const startHour = to12Hour(periodTime.substr(0, 2));
      const startMin = periodTime.substr(2, 2);
      const endHour = to12Hour(periodTime.substr(5, 2));
      const endMin = periodTime.substr(7, 2);
      //check to see if time is inbetween the time for each period
      //Multiplying each hour by 60 to find total mins and compare those
      if (
        startHour * 60 + startMin <= currentHour * 60 + currentMinute &&
        endHour * 60 + endMin > currentHour * 60 + currentMinute
      ) {
        //If it is, return that period number
        break;
        return periodTime;
      }
    }
  }
  async getFirebaseVal(ref: string) {
    return (await this.db.ref(ref).once('value')).val();
  }

  async getBellSchedule() {
    const selectedDate = this.state.date.toDate();
    const dayOfWeek = selectedDate.getDay();

    let schedule = '';
    let special = false;
    //Get special day schedules, check if selected day is special
    const specialDays = await this.getFirebaseVal(`/days`);
    for (const specDay: string in specialDays) {
      const start = specDay.substr(0, 8);
      const end = specDay.substr(9, 8);
      const startDate = moment(start, 'MMDDYYYY');
      const endDate = moment(end, 'MMDDYYYY').endOf('day');
      if (
        selectedDate.getTime() >= startDate.valueOf() &&
        selectedDate.getTime() < endDate.valueOf()
      ) {
        schedule = specialDays[specDay];
        special = true;
        console.log(`Special schedule: ${schedule}`);
        break;
      }
    }

    //If normal day, get weekday map for the usual schedule
    if (!special) {
      const weekdayMap = await this.getFirebaseVal('/weekday-map');
      schedule = weekdayMap[dayOfWeek];
    }

    const periods: Period[] = [];

    if (schedule !== 'none') {
      //Get the schedule's periods
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

    if (special) {
      schedule += '*';
    }

    return {
      scheduleName: schedule,
      periods: periods
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date && !this.state.date.isSame(prevState.date)) {
      this.loadBellSchedule();
    }
  }

  handleDateChange = (date: moment$Moment) => {
    this.setState({
      date: date
    });
  };

  render() {
    return (
      <div>
        <DatePicker
          date={this.state.date}
          onDateChange={this.handleDateChange}
        />
        <BellSchedule
          periods={this.state.periods}
          loading={this.state.loading}
          scheduleName={this.state.scheduleName}
        />
      </div>
    );
  }
}

export default CurrentBellSchedule;
