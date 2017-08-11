// @flow

import React from 'react';

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';
import 'react-dates/lib/css/_datepicker.css';
import CaretDownIcon from 'material-ui-icons/KeyboardArrowDown';

import './DatePicker.css';
import moment from "moment";
import isInclusivelyAfterDay from "react-dates/lib/utils/isInclusivelyAfterDay";

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

class DatePicker extends React.PureComponent {
  state = {
    focused: false
  };

  handleFocusChange = ({focused}: {focused: boolean}) => {
    this.setState({
      focused: focused
    });
  };

  handleCaretClick = () => {
    this.setState({
      focused: true
    });
  };

  isOutsideRange = (day: moment$Moment) =>
    !isInclusivelyAfterDay(day, moment()) ||
    isInclusivelyAfterDay(day, moment().add(2, 'weeks'));

  render() {
    const {
       date,
       onDateChange
     }: Props = this.props;

    return (
      <div className="date-picker">
        <SingleDatePicker
          date={date}
          onDateChange={onDateChange}
          focused={this.state.focused}
          onFocusChange={this.handleFocusChange}
          isOutsideRange={this.isOutsideRange}
          numberOfMonths={1}
        />
        <CaretDownIcon className="date-picker-caret" onClick={this.handleCaretClick}/>
      </div>
    )
  }
}

export default DatePicker;
