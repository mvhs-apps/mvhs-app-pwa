// @flow

import React from 'react';

import moment from 'moment';
import SchedulePage from '../components/SchedulePage';

type State = {
  date: moment$Moment
};

class SchedulePageContainer extends React.PureComponent<{}, State> {
  state = {
    date: moment()
  };

  handleDateChange = (date: moment$Moment) => {
    this.setState({
      date: date
    });
  };

  componentDidMount() {
    window.addEventListener('focus', () => {
      //If the selected date is in the past, change to the current day
      if (this.state.date.diff(moment().startOf('day')) < 0) {
        this.setState({
          date: moment()
        });
        console.log('Outdated, switching to today');
      }
    });
  }

  render() {
    return (
      <SchedulePage
        date={this.state.date}
        onDateChange={this.handleDateChange}
      />
    );
  }
}

export default SchedulePageContainer;
