// @flow

import React from 'react';

import type Moment from 'moment';
import Calendar from '../components/Calendar';

import calendarUrls from '../utils/calendarUrls';
import moment from 'moment';

type SchoolEvent = {
  summary: string,
  description: string,
  location: string,
  mapURL: string,
  start: string,
  end: string
};

type Props = {
  date: Moment
};

type State = {
  loading: boolean,
  error: any,
  events: SchoolEvent[],
  selectedCalendar: string
};

class DatePickerContainer extends React.PureComponent<Props, State> {
  state = {
    loading: true,
    error: '',
    events: [],
    selectedCalendar: Object.keys(calendarUrls)[0]
  };

  componentDidMount() {
    this.loadCalendar().then();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log(this.state);
    if (
      (this.props.date && !this.props.date.isSame(prevProps.date)) ||
      this.state.selectedCalendar !== prevState.selectedCalendar
    ) {
      this.loadCalendar().then();
    }
  }

  async loadCalendar() {
    this.setState({
      loading: true
    });

    const today = this.props.date
      .clone()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const tomorrow = today.clone().add(1, 'days');

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/` +
      `${calendarUrls[this.state.selectedCalendar]}` +
      `/events?` +
      `key=AIzaSyCfRrWtuQjgV2ekSGkmDn_BROYje60T61c&` +
      `timeMin=${today.toISOString()}&` +
      `timeMax=${tomorrow.toISOString()}`;

    try {
      const response = await fetch(url);
      //console.log(url);
      const json = await response.json();

      const eventList: SchoolEvent[] = json.items
        .filter(
          e => e.start && e.status !== 'cancelled' && recCheck(e.recurrence)
        )
        .sort((e1, e2) => {
          const e1Date = moment(e1.start.date || e1.start.dateTime);
          const e2Date = moment(e2.start.date || e2.start.dateTime);
          return e1Date.valueOf() - e2Date.valueOf();
        })
        .map(e => {
          let startDate;
          let endDate;
          if (e.start.date) {
            startDate = moment(e.start.date).format('M/D');
            endDate = moment(e.end.date).format('M/D');
          } else {
            startDate = moment(e.start.dateTime).format('LT');
            endDate = moment(e.end.dateTime).format('LT');
          }

          return {
            id: e.id,
            summary: e.summary,
            description: e.description,
            location: e.location,
            mapURL: `https://www.google.com/maps/search/${encodeURI(
              e.location
            )}`,
            start: startDate,
            end: endDate
          };
        });

      this.setState({
        loading: false,
        error: '',
        events: eventList
      });
    } catch (err) {
      console.error(err);

      let errorMessage = err;
      if (!navigator.onLine) {
        errorMessage = 'No Internet connection';
      }
      this.setState({
        loading: false,
        error: errorMessage,
        events: []
      });
    }
  }

  handleChange = e => {
    this.setState({
      selectedCalendar: e.target.value
    });
  };

  render() {
    return (
      <Calendar
        loading={this.state.loading}
        events={this.state.events}
        error={this.state.error.toString()}
        onHandleChange={this.handleChange}
        selectedOption={this.state.selectedCalendar}
        options={calendarUrls}
      />
    );
  }
}

function recCheck(rec) {
  if (rec === undefined) {
    //console.log(rec);
    return true;
  } else {
    //console.log(rec[0]);
    //Check if the event recurs weekly, if so, filter it out
    //if (rec[0].includes('FREQ=WEEKLY')) return false;
  }
  return true;
}

export default DatePickerContainer;
