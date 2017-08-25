// @flow

import React from 'react';

import BellSchedule from '../components/BellSchedule';
import type { Period } from '../components/BellSchedule';
import moment from 'moment';
import type Moment from 'moment';
import { getFirebaseVal } from '../firebase';

const pad = (num, size) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
};

const to12Hour = (hour: string) => {
  const hourInt = parseInt(hour, 10);
  return pad(hourInt > 12 ? hourInt - 12 : hourInt, 2);
};

type Props = {
  date: Moment
};

type State = {
  periods: Period[],
  loading: boolean,
  scheduleName: string
};

const fbTimestampKey = 'fbTimestamp';

class BellScheduleContainer extends React.PureComponent<Props, State> {
  state = {
    periods: [],
    loading: true,
    scheduleName: ''
  };

  componentDidMount() {
    this.loadBellSchedule().then();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.date && !this.props.date.isSame(prevProps.date)) {
      this.loadBellSchedule().then();
    }
  }

  async loadBellSchedule() {
    this.setState({
      loading: true
    });

    try {
      const result = await this.getBellSchedule();
      this.setState({
        scheduleName: result.scheduleName,
        periods: result.periods,
        loading: false
      });
    } catch (err) {
      console.error(err);
      this.setState({
        scheduleName: 'Loading Error',
        loading: false
      });
    }
  }

  async getBellSchedule() {
    const fbTimestampString = localStorage.getItem(fbTimestampKey);
    //If last fetch was over 30 minutes ago, force fetch from Internet
    const forceFetch =
      !fbTimestampString || Date.now() - JSON.parse(fbTimestampString) > 1.8e6;
    if (!fbTimestampString || forceFetch) {
      localStorage.setItem(fbTimestampKey, JSON.stringify(Date.now()));
    }

    const selectedDate = this.props.date.toDate();
    const dayOfWeek = selectedDate.getDay();

    let schedule = '';
    let special = false;
    //Get special day schedules, check if selected day is special
    const specialDays = await getFirebaseVal(`/days`, forceFetch);
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
        break;
      }
    }

    //If normal day, get weekday map for the usual schedule
    if (!special) {
      const weekdayMap = await getFirebaseVal('/weekday-map', forceFetch);
      schedule = weekdayMap[dayOfWeek];
    }

    const periods: Period[] = [];

    if (schedule !== 'none') {
      //Get the schedule's periods
      const scheduleData = await getFirebaseVal(
        `/schedules/${schedule}`,
        forceFetch
      );
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

    //Get all schedules as cache
    getFirebaseVal(`/schedules`, forceFetch).then();

    return {
      scheduleName: schedule,
      periods: periods
    };
  }

  render() {
    return (
      <BellSchedule
        periods={this.state.periods}
        loading={this.state.loading}
        scheduleName={this.state.scheduleName}
      />
    );
  }
}

export default BellScheduleContainer;
