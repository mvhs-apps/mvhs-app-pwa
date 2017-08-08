// @flow

import React from 'react';

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';
import 'react-dates/lib/css/_datepicker.css';

import './DatePicker.css';

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
          numberOfMonths={1}
        />
      </div>
    )
  }
}

export default DatePicker;
