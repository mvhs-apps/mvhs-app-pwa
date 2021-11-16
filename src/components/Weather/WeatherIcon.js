import React from 'react';
import {
  BeachAccess as Rainy,
  AcUnit,
  WbSunny,
  WbCloudy,
  CloudOff
} from 'material-ui-icons';
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
  console.log('Weather: ' + weather);
  if (weather.includes('Snow')) {
    return <AcUnit />;
  } else if (weather.includes('Rain')) {
    return <Rainy />;
  } else if (weather.includes('Sunny')) {
    return <WbSunny />;
  } else if (weather.includes('Cloudy')) {
    return <WbCloudy />;
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
