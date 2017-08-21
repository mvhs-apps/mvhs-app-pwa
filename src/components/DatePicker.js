// @flow

import React from 'react';

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';
import isInclusivelyAfterDay from 'react-dates/lib/utils/isInclusivelyAfterDay';
import 'react-dates/lib/css/_datepicker.css';
import CaretDownIcon from 'material-ui-icons/KeyboardArrowDown';

import './DatePicker.css';
import moment from 'moment';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void,
  focused: boolean,
  onFocusChange: ({ focused: boolean }) => void,
  onCaretClick: () => void,
  lastDate: moment$Moment
};

const isOutsideRange = (lastDate: moment$Moment) => (day: moment$Moment) => {
  return (
    !isInclusivelyAfterDay(day, moment()) ||
    isInclusivelyAfterDay(day, lastDate)
  );
};

const DatePicker = ({
  date,
  onDateChange,
  focused,
  onFocusChange,
  onCaretClick,
  lastDate
}: Props) => {
  return (
    <div className="date-picker">
      <SingleDatePicker
        date={date}
        onDateChange={onDateChange}
        focused={focused}
        onFocusChange={onFocusChange}
        isOutsideRange={isOutsideRange(lastDate)}
        numberOfMonths={1}
        withPortal={true}
        hideKeyboardShortcutsPanel={true}
        readOnly={true}
      />
      <CaretDownIcon className="date-picker-caret" onClick={onCaretClick} />
    </div>
  );
};

export default DatePicker;
