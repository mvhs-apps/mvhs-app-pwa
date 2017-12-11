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
      const json = await response.json();

      const eventList: SchoolEvent[] = [];
      json.items
        .map(event => {
          let startDate;
          let endDate;
          if (event.start.date) {
            startDate = moment(event.start.date).format('M/D');
            endDate = moment(event.end.date).format('M/D');
          } else {
            startDate = moment(event.start.dateTime).format('LT');
            endDate = moment(event.end.dateTime).format('LT');
          }

          return {
            id: event.id,
            summary: event.summary,
            description: event.description,
            location: event.location,
            mapURL: `https://www.google.com/maps/search/${encodeURI(
              event.location
            )}`,
            start: startDate,
            end: endDate
          };
        })
        .forEach(event => {
          eventList.push(event);
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
    this.setState({ selectedCalendar: e.target.value });
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

export default DatePickerContainer;
