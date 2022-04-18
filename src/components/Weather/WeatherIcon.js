import React from 'react';
import Rainy from './icons/cloud-rain.svg';
import AcUnit from './icons/cloud-snow.svg';
import WbSunny from './icons/day-sunny.svg';
import WbCloudy from './icons/cloud.svg';
import Thunder from './icons/cloud-rain-lightning.svg';
import Question from './icons/question-mark-round-line.svg';
import { CloudOff } from 'material-ui-icons';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Loadable from '../LCEComponent';
import './WeatherIcon.css';

type Props = {
  loading: boolean,
  weather: any,
  error: string
};

const Loading = <CircularProgress />;

const Empty = null;

const Error = (error: string) => (
  <div className="card-padding center">{error}</div>
);

const weatherStringToIcon = (weather: string) => {
  if (!weather) {
    return Empty;
  }
  console.log(weather);
  if (weather.includes('Snow')) {
    return <img className="weather-icon" alt="snow" src={AcUnit} />;
  } else if (weather.includes('Thunder')) {
    return <img className="weather-icon" alt="thunder" src={Thunder} />;
  } else if (weather.includes('Rain')) {
    return <img className="weather-icon" alt="rain" src={Rainy} />;
  } else if (weather.includes('Shower')) {
    return <img className="weather-icon" alt="rain" src={Rainy} />;
  } else if (weather.includes('Sun')) {
    return <img className="weather-icon" alt="sun" src={WbSunny} />;
  } else if (weather.includes('Cloud')) {
    return <img className="weather-icon" alt="cloudy" src={WbCloudy} />;
  } else return Empty;
};

const WeatherIcon = ({ loading, weather, error }: Props) => {
  return (
    <Loadable
      loading={loading}
      data={weather}
      error={error}
      LoadingComponent={Loading}
      EmptyComponent={Empty}
      ErrorComponent={Error}
    >
      {weatherStringToIcon(weather)}
    </Loadable>
  );
};

export default WeatherIcon;
