// @flow

import React from 'react';

import moment from 'moment';
import isInclusivelyAfterDay from 'react-dates/lib/utils/isInclusivelyAfterDay';
import DatePicker from '../components/DatePicker';

type Props = {
  date: moment$Moment,
  onDateChange: (date: moment$Moment) => void
};

type State = {
  focused: boolean
};

class DatePickerContainer extends React.PureComponent<Props, State> {
  state = {
    focused: false
  };

  handleFocusChange = ({ focused }: { focused: boolean }) => {
    this.setState({
      focused: focused
    });
  };

  handleCaretClick = () => {
    this.setState({
      focused: true
    });
  };

  isOutsideRange = (day: moment$Moment) => {
    return (
      !isInclusivelyAfterDay(day, moment()) ||
      isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
    );
  };

  render() {
    const { date, onDateChange } = this.props;
    return (
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        focused={this.state.focused}
        onFocusChange={this.handleFocusChange}
        onCaretClick={this.handleCaretClick}
        isOutsideRange={this.isOutsideRange}
      />
    );
  }
}

export default DatePickerContainer;
