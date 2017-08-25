// @flow

import React from 'react';

import type Moment from 'moment';
import Calendar from '../components/Calendar';

import calendarURL from '../schoolCalendar';

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
  events: SchoolEvent[]
};

class DatePickerContainer extends React.PureComponent<Props, State> {
  state = {
    loading: true,
    events: []
  };

  componentDidMount() {
    this.loadCalendar().then();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.date && !this.props.date.isSame(prevProps.date)) {
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
      calendarURL +
      'timeMin=' +
      today.toISOString() +
      '&' +
      'timeMax=' +
      tomorrow.toISOString();

    try {
      const response = await fetch(url);
      const json = await response.json();

      const eventList: SchoolEvent[] = [];
      json.items
        .map(event => {
          return {
            id: event.id,
            summary: event.summary,
            description: event.description,
            location: event.location,
            mapURL:
              'https://www.google.com/maps/search/' + encodeURI(event.location),
            start: new Date(event.start.dateTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            end: new Date(event.end.dateTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        })
        .forEach(event => {
          eventList.push(event);
        });

      this.setState({
        loading: false,
        events: eventList
      });
    } catch (err) {
      console.error('Error getting calendar entries: ' + err);
      this.setState({
        loading: false,
        events: []
      });
    }
  }

  render() {
    return <Calendar loading={this.state.loading} events={this.state.events} />;
  }
}

export default DatePickerContainer;
