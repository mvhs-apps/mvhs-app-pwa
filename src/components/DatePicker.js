// @flow

import React from 'react';

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';
import 'react-dates/lib/css/_datepicker.css';
import CaretLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import CaretRightIcon from 'material-ui-icons/KeyboardArrowRight';
import IconButton from 'material-ui/IconButton';

import './DatePicker.css';
import moment from 'moment';

import { isOutsideRange } from '../containers/DatePickerContainer';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void,
  focused: boolean,
  onFocusChange: ({ focused: boolean }) => void,
  onLeftCaretClick: () => void,
  onRightCaretClick: () => void,
  lastDate: moment$Moment
};

const DatePicker = ({
  date,
  onDateChange,
  focused,
  onFocusChange,
  onLeftCaretClick,
  onRightCaretClick,
  lastDate
}: Props) => {
  return (
    <div className="date-picker">
      <IconButton
        color="accent"
        className="date-picker-iconbtn"
        onClick={onLeftCaretClick}
      >
        <CaretLeftIcon />
      </IconButton>
      <SingleDatePicker
        date={date}
        onDateChange={onDateChange}
        displayFormat="dddd, MMM D"
        focused={focused}
        onFocusChange={onFocusChange}
        isOutsideRange={isOutsideRange(lastDate)}
        numberOfMonths={1}
        withPortal={true}
        hideKeyboardShortcutsPanel={true}
        readOnly={true}
      />
      <IconButton
        color="accent"
        className="date-picker-iconbtn"
        onClick={onRightCaretClick}
      >
        <CaretRightIcon />
      </IconButton>
    </div>
  );
};

export default DatePicker;
