// @flow

import React from 'react';

import { ScrollView, View } from 'react-native';
import BellScheduleContainer from '../containers/BellScheduleContainer';
import DatePickerContainer from '../containers/DatePickerContainer';
import CalendarContainer from '../containers/CalendarContainer';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

const SchedulePage = ({ date, onDateChange }: Props) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <DatePickerContainer date={date} onDateChange={onDateChange} />
      <BellScheduleContainer date={date} />
      <CalendarContainer date={date} />
    </ScrollView>
  );
};

export default SchedulePage;
