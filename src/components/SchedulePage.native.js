// @flow

import React from 'react';

import { View } from 'react-native';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

const SchedulePage = ({ date, onDateChange }: Props) => {
  return <View />;
};

export default SchedulePage;
