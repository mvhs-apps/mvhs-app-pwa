import moment from 'moment';
import React from 'react';
import Weather from '../components/Weather/Weather.js';

type Props = {
  date: moment.Moment
};

type State = {};

let cache: CacheStorage;
// https://api.weather.gov/gridpoints/MTR/96,105/forecast/hourly
const url = `https://api.weather.gov/gridpoints/MTR/96,105/forecast/hourly`;
const request = new Request(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
});

class WeatherContainer extends React.PureComponent<Props, State> {
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
      console.log(
        new Date(new Date(response.headers.get('Expires')) - Date.now())
          .toISOString({
            timeZone: 'UTC'
            // only show the time
          })
          .slice(14, 19)
      );
    if (!response || new Date(response.headers.get('expires')) < Date.now()) {
      await cache.add(request);
      response = await cache.match(request);
    }
    if (response) {
      const weather = await response.json();
      weatherPeriods = weather.properties.periods;
    }
    // filter periods to only include the ones for the current day
    // from 8 am to 4 pm
    const periodsForToday = weatherPeriods.filter(period => {
      const startDate = moment(period.startTime);
      const endDate = moment(period.endTime);
      return (
        startDate.isSame(date, 'day') &&
        endDate.isSame(date, 'day') &&
        startDate.hour() >= 8 &&
        endDate.hour() <= 16
      );
    });
    this.setState({
      loading: false,
      weather: periodsForToday
    });
  };

  render() {
    return (
      <div class="weather">
        <Weather
          loading={this.state.loading}
          weather={this.state.weather}
          error={this.state.error}
        />
      </div>
    );
  }
}
export default WeatherContainer;
