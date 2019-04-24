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

  onSwipeMove = (position, event) => {
    //console.log("move");
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);

    if (Math.abs(position.y) < 4 && Math.abs(position.x) > 2) {
      //console.log("swipe");
      const twoWeeksLater = moment().add(2, 'weeks');
      const currentDate = this.state.date.clone();
      var newDate = currentDate;
      if (position.x < 0) {
        newDate = currentDate.add(1, 'day');
      } else if (position.x > 0) {
        newDate = currentDate.subtract(1, 'day');
      }
      if (
        isInclusivelyAfterDay(newDate, moment()) &&
        !isInclusivelyAfterDay(newDate, twoWeeksLater)
      ) {
        this.handleDateChange(newDate);
      }
    }
  };

  render() {
    return (
      <Swipe onSwipeMove={this.onSwipeMove}>
        <SchedulePage
          date={this.state.date}
          onDateChange={this.handleDateChange}
        />
      </Swipe>
    );
  }
}

export default SchedulePageContainer;
