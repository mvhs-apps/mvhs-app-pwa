// @flow

import React from 'react';
import Loadable from 'react-loadable';

import './SchedulePage.css';

import Disclaimer from './Disclaimer';

import type Moment from 'moment';

type Props = {
  date: Moment,
  onDateChange: (date: Moment) => void
};

const AsyncBellSchedule = Loadable({
  loader: () =>
    import(/* webpackChunkName: "bell-schedule" */ '../containers/BellScheduleContainer'),
  loading: () => null
});

const AsyncDatePicker = Loadable({
  loader: () =>
    import(/* webpackChunkName: "date-picker" */ '../containers/DatePickerContainer'),
  loading: () => null
});

const AsyncCalendar = Loadable({
  loader: () =>
    import(/* webpackChunkName: "calendar-events" */ '../containers/CalendarContainer'),
  loading: () => null
});

const SchedulePage = ({ date, onDateChange }: Props) => {
  return (
    <div className="schedule-page">
      <AsyncDatePicker date={date} onDateChange={onDateChange} />
      <AsyncBellSchedule date={date} />
      <AsyncCalendar date={date} />
      <Disclaimer />
    </div>
  );
};

export default SchedulePage;
