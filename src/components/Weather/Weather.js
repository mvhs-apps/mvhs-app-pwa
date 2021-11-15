import { Paper, Typography } from 'material-ui';
import React from 'react';
import Loadable from '../LCEComponent';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';

type Props = {
  loading: boolean,
  weather: any,
  error: string
};

const Loading = (
  <div className="card-padding center">
    <CircularProgress />
  </div>
);

const Empty = (
  <div className="card-padding center">No weather data available.</div>
);

const Error = (error: string) => (
  <div className="card-padding center">{error}</div>
);

const Weather = ({ loading, weather, error }: Props) => {
  console.log('weather: ' + JSON.stringify(weather));
  return (
    <div>
      <Paper>
        <Loadable
          loading={loading}
          data={weather}
          error={error}
          LoadingComponent={Loading}
          EmptyComponent={Empty}
          ErrorComponent={Error}
        >
          <div>
            <Typography type="title" className="bell-schedule-name">
              Weather
            </Typography>
            <Table id={'weather-table'}>
              <TableHead>
                <TableRow>
                  <TableCell>Summary</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weather.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {row.temperature}°{row.temperatureUnit} -{' '}
                      {row.shortForecast}
                    </TableCell>
                    <TableCell>
                      {new Date(
                        new Date(row.startTime).setMinutes(30)
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Loadable>
      </Paper>
    </div>
  );
};

export default Weather;
