// @flow

import React from 'react';
import Loadable from 'react-loadable';

import './SchedulePage.css';

import Disclaimer from './Disclaimer';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
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
      <div className="spacer" />
      <Disclaimer />
    </div>
  );
};

export default SchedulePage;
