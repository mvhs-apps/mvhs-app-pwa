import React from 'react';
import Rainy from './icons/cloud-rain.svg';
import AcUnit from './icons/cloud-snow.svg';
import WbSunny from './icons/day-sunny.svg';
import WbCloudy from './icons/cloud.svg';
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
  if (weather.includes('Snow')) {
    return <img src={AcUnit} />;
  } else if (weather.includes('Rain')) {
    return <img src={Rainy} />;
  } else if (weather.includes('Sunny')) {
    return <img src={WbSunny} />;
  } else if (weather.includes('Cloudy')) {
    return <img src={WbCloudy} />;
  } else return <CloudOff />;
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
