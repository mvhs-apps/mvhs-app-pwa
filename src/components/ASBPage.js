// @flow

import React from 'react';
import Loadable from 'react-loadable';

import './ASBCalendar.css';

import Disclaimer from './ASBdisclamer';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

const AsyncDatePicker = Loadable({
  loader: () =>
    import(/* webpackChunkName: "date-picker" */ '../containers/DatePickerContainer'),
  loading: () => null
});

const AsyncCalendar = Loadable({
  loader: () =>
    import(/* webpackChunkName: "calendar-events" */ '../containers/ASBCalander'),
  loading: () => null
});

const SchedulePage = ({ date, onDateChange }: Props) => {
  return (
    <div className="schedule-page">
      <AsyncDatePicker date={date} onDateChange={onDateChange} />
      <AsyncCalendar date={date} />
      <div className="spacer" />
      <Disclaimer />
    </div>
  );
};

export default SchedulePage;
