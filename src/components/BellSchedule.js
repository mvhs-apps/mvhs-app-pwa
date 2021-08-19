// @flow

import React from 'react';

import './BellSchedule.css';

import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Typography from 'material-ui/Typography';
import Loadable from './LCEComponent';

export type Period = {
  period: string,
  time: string,
  current: string,
  progress: Number
};

type Props = {
  loading: boolean,
  periods: Period[],
  error: any,
  scheduleName: string
};

const Loading = (
  <div className="card-padding center">
    <CircularProgress />
  </div>
);

const Empty = <div className="card-padding center">No school!</div>;

const Error = (error: string) => (
  <div className="card-padding center">{error}</div>
);

const BellSchedule = ({ periods, loading, error, scheduleName }: Props) => {
  const parent = document.getElementById('bell-schedule');
  const parentWidth = parent ? parent.offsetWidth : 300;
  return (
    <div className="bell-schedule">
      <Paper>
        <Loadable
          loading={loading}
          data={periods}
          error={error}
          LoadingComponent={Loading}
          EmptyComponent={Empty}
          ErrorComponent={Error(error)}
        >
          <div>
            {scheduleName !== 'none' && (
              <Typography type="title" className="bell-schedule-name">
                {scheduleName}
              </Typography>
            )}

            <Table id={'table'}>
              <TableHead>
                <TableRow>
                  <TableCell numeric>Period</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {periods.map(n => {
                  return (
                    <TableRow
                      key={n.period}
                      style={{
                        boxShadow: `inset ${Math.max(
                          Math.min(n.progress, 1),
                          0
                        ) * parentWidth}px 0 #ffc107`
                      }}
                    >
                      <TableCell numeric>{n.period}</TableCell>
                      <TableCell>{n.time}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Loadable>
      </Paper>
    </div>
  );
};

export default BellSchedule;
