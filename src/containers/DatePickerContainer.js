// @flow

import React from 'react';

import moment from 'moment';
import DatePicker from '../components/DatePicker';
import isInclusivelyAfterDay from 'react-dates/lib/utils/isInclusivelyAfterDay';

export const isOutsideRange = (lastDate: moment$Moment) => (
  day: moment$Moment
) => {
  return (
    !isInclusivelyAfterDay(day, moment()) ||
    isInclusivelyAfterDay(day, lastDate)
  );
};

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

  twoWeeksLater = moment().add(2, 'weeks');

  handleFocusChange = ({ focused }: { focused: boolean }) => {
    this.setState({
      focused: focused
    });
  };

  handleLeftCaretClick = () => {
    const newDate = this.props.date.clone().subtract(1, 'day');
    if (!isOutsideRange(this.twoWeeksLater)(newDate)) {
      this.props.onDateChange(newDate);
    }
  };

  handleRightCaretClick = () => {
    const newDate = this.props.date.clone().add(1, 'day');
    if (!isOutsideRange(this.twoWeeksLater)(newDate)) {
      this.props.onDateChange(newDate);
    }
  };

  render() {
    const { date, onDateChange } = this.props;
    return (
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        focused={this.state.focused}
        onFocusChange={this.handleFocusChange}
        onLeftCaretClick={this.handleLeftCaretClick}
        onRightCaretClick={this.handleRightCaretClick}
        lastDate={this.twoWeeksLater}
      />
    );
  }
}

export default DatePickerContainer;
