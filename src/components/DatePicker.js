// @flow

import React from 'react';

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';
import 'react-dates/lib/css/_datepicker.css';
import CaretDownIcon from 'material-ui-icons/KeyboardArrowDown';

import './DatePicker.css';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void,
  focused: boolean,
  onFocusChange: ({ focused: boolean }) => void,
  onCaretClick: () => void,
  isOutsideRange: (day: moment$Moment) => boolean
};

const DatePicker = ({
  date,
  onDateChange,
  focused,
  onFocusChange,
  onCaretClick,
  isOutsideRange
}: Props) => {
  return (
    <div className="date-picker">
      <SingleDatePicker
        date={date}
        onDateChange={onDateChange}
        focused={focused}
        onFocusChange={onFocusChange}
        isOutsideRange={isOutsideRange}
        numberOfMonths={1}
      />
      <CaretDownIcon className="date-picker-caret" onClick={onCaretClick} />
    </div>
  );
};

export default DatePicker;
