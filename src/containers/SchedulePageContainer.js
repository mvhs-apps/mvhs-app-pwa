// @flow

import React from 'react';

import moment from 'moment';
import SchedulePage from '../components/SchedulePage';

type State = {
  date: moment$Moment
};

class SchedulePageContainer extends React.PureComponent<void, {}, State> {
  state = {
    date: moment()
  };

  handleDateChange = (date: moment$Moment) => {
    this.setState({
      date: date
    });
  };

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
