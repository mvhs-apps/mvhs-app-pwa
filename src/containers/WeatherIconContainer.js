import React from 'react';
import WeatherIcon from '../components/Weather/WeatherIcon';
import moment from 'moment';

type Props = {
  date: moment.Moment
};

let cache;

type State = {};

const url = `https://api.weather.gov/gridpoints/MTR/96,105/forecast`;
const request = new Request(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
});

class WeatherIconContainer extends React.PureComponent<Props, State> {
  state = {
    loading: true,
    weather: [],
    error: ''
  };

  componentDidMount() {
    this.getWeather();
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps: Props) {
    if (this.props.date && !this.props.date.isSame(prevProps.date)) {
      this.getWeather();
    }
  }

  getWeather = async () => {
    if (!cache) {
      cache = await caches.open('weather');
    }
    const { date } = this.props;
    this.setState({
      loading: true,
      error: ''
    });
    let response = await cache.match(request);
    let weatherPeriods;
    // if response does not exist or if the expires date is before the current date
    response &&
      new Date(new Date(response.headers.get('Expires')) - Date.now())
        .toISOString({
          timeZone: 'UTC'
          // only show the time
        })
        .slice(14, 19);
    if (!response || new Date(response.headers.get('expires')) < Date.now()) {
      await cache.add(request);
      response = await cache.match(request);
    }
    if (response) {
      const weather = await response.json();
      weatherPeriods = weather.properties.periods;
    }
    // check to see if at night
    const period = weatherPeriods.filter(period => {
      const startDate = moment(period.startTime);
      const endDate = moment(period.endTime);
      return startDate.isSame(date, 'day') && period.isDaytime;
    })[0];
    console.log(period);
    const weather = period ? period.shortForecast : null;
    this.setState({
      loading: false,
      weather: weather
    });
  };

  render() {
    return (
      <div class="weather-icon">
        <WeatherIcon
          loading={this.state.loading}
          weather={this.state.weather}
          error={this.state.error}
        />
      </div>
    );
  }
}
export default WeatherIconContainer;
