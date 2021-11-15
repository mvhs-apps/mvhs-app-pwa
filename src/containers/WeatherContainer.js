import moment from 'moment';
import React from 'react';
import Weather from '../components/Weather/Weather.js';

type Props = {
  date: moment.Moment
};

type State = {};

class WeatherContainer extends React.PureComponent<Props, State> {
  state = {
    loading: true,
    weather: [],
    error: ''
  };

  componentDidMount() {
    console.log('WeatherContainer did mount');
    this.getWeather();
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps: Props) {
    if (this.props.date && !this.props.date.isSame(prevProps.date)) {
      this.getWeather();
    }
  }

  getWeather = async () => {
    const { date } = this.props;
    this.setState({
      loading: true,
      error: ''
    });

    // https://api.weather.gov/gridpoints/MTR/96,105/forecast/hourly
    const url = `https://api.weather.gov/gridpoints/MTR/96,105/forecast/hourly`;
    const response = await fetch(url);
    const json = await response.json();
    const periods = json.properties.periods;
    // filter periods to only include the ones for the current day
    // from 8 am to 4 pm
    const periodsForToday = periods.filter(period => {
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
    console.log('weather: ' + JSON.stringify(periodsForToday, null, 2));
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
