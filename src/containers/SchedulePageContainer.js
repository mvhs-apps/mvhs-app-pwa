// @flow

import React from 'react';

import moment from 'moment';
import SchedulePage from '../components/SchedulePage';
import * as appstate from '../utils/appstate';
import Swipe from 'react-easy-swipe';
import isInclusivelyAfterDay from 'react-dates/lib/utils/isInclusivelyAfterDay';

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
    appstate.addOnResumeListener(() => {
      //If the selected date is in the past, change to the current day
      if (this.state.date.diff(moment().startOf('day')) < 0) {
        this.setState({
          date: moment()
        });
        console.log('Outdated, switching to today');
      }
    });
  }

  onSwipeRight = event => {
    //console.log('swipe right');
    const twoWeeksLater = moment().add(2, 'weeks');
    const currentDate = this.state.date.clone();
    const newDate = currentDate.subtract(1, 'day');
    //console.log(newDate);
    //console.log(isInclusivelyAfterDay(newDate, moment()) +' ' +!isInclusivelyAfterDay(newDate, twoWeeksLater));
    if (
      isInclusivelyAfterDay(newDate, moment()) &&
      !isInclusivelyAfterDay(newDate, twoWeeksLater)
    ) {
      this.handleDateChange(newDate);
    }
  };

  onSwipeLeft = event => {
    //console.log('swipe left');
    const twoWeeksLater = moment().add(2, 'weeks');
    const currentDate = this.state.date.clone();
    const newDate = currentDate.add(1, 'day');
    //console.log(newDate);
    //console.log(isInclusivelyAfterDay(newDate, moment()) +' ' +!isInclusivelyAfterDay(newDate, twoWeeksLater));
    if (
      isInclusivelyAfterDay(newDate, moment()) &&
      !isInclusivelyAfterDay(newDate, twoWeeksLater)
    ) {
      this.handleDateChange(newDate);
    }
  };

  render() {
    return (
      <Swipe onSwipeLeft={this.onSwipeLeft} onSwipeRight={this.onSwipeRight}>
        <SchedulePage
          date={this.state.date}
          onDateChange={this.handleDateChange}
        />
      </Swipe>
    );
  }
}

export default SchedulePageContainer;
