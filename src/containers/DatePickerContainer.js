// @flow

import React from 'react';

import moment from 'moment';
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

  twoWeeksLater = moment().add(2, 'weeks');

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

  render() {
    const { date, onDateChange } = this.props;
    return (
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        focused={this.state.focused}
        onFocusChange={this.handleFocusChange}
        onCaretClick={this.handleCaretClick}
        lastDate={this.twoWeeksLater}
      />
    );
  }
}

export default DatePickerContainer;
