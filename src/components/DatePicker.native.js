// @flow

import * as React from 'react';
import moment from 'moment';
import { default as NativeDatePicker } from 'react-native-datepicker';
import { View, StyleSheet, Platform } from 'react-native';
import { COLOR } from 'react-native-material-ui';
import Icon from './Icon.native';

const format = 'M/D/YYYY';

const handleDateChange = (onDateChange: (date: moment$Moment) => void) => (
  date: string
) => {
  onDateChange(moment(date, format));
};

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void,
  lastDate: moment$Moment
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56
  }
});

const customStyles = {
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    borderWidth: 0,
    marginLeft: 0
  },
  dateText: {
    fontSize: 18,
    fontWeight: '400'
  }
};

const DatePicker = ({ date, onDateChange, lastDate }: Props) => {
  const dateString: string = date.format(format);
  const startDateString: string = moment().format(format);
  const lastDateString: string = lastDate.format(format);
  return (
    <View style={styles.datePickerContainer}>
      <NativeDatePicker
        date={dateString}
        /* Use 'datetime' instead of 'date' picker on iOS to display day of week */
        mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
        format={format}
        minDate={startDateString}
        maxDate={lastDateString}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={true}
        customStyles={customStyles}
        onDateChange={handleDateChange(onDateChange)}
        iconComponent={<Icon>keyboard_arrow_down</Icon>}
      />
    </View>
  );
};

export default DatePicker;
