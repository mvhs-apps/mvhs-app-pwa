// @flow

import React from 'react';
import './disclaimer.css';

import BellScheduleContainer from '../containers/BellScheduleContainer';
import DatePickerContainer from '../containers/DatePickerContainer';
import CalendarContainer from '../containers/CalendarContainer';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

const SchedulePage = ({ date, onDateChange }: Props) => {
  return (
    <div>
      <DatePickerContainer date={date} onDateChange={onDateChange} />
      <BellScheduleContainer date={date} />
      <CalendarContainer date={date} />
    </div>
  );
};

export default SchedulePage;
