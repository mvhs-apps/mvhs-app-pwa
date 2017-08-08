// @flow

import React from 'react';

import DayPickerSingleDateController from 'react-dates/lib/components/DayPickerSingleDateController';
import 'react-dates/lib/css/_datepicker.css';

import './DatePicker.css';

const noop = _ => {};

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

const DatePicker = ({
  date,
  onDateChange
}: Props) => {
  return (
    <div className="date-picker">
        <DayPickerSingleDateController
          date={date}
          onDateChange={onDateChange}
          focused={true}
          onFocusChange={noop}
          numberOfMonths={1}
        />
    </div>
  );
};

export default DatePicker;
