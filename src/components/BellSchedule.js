// @flow

import React from 'react';

import './BellSchedule.css';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Loadable from './Loadable';

export type Period = {
  period: string,
  time: string
};

type Props = {
  loading: boolean,
  periods: Period[],
  scheduleName: string
};

const Loading = (
  <div className="bell-schedule-loading center">
    <CircularProgress />
  </div>
);

const Empty = <div className="bell-schedule-empty center">No school!</div>;

const BellSchedule = ({ periods, loading, scheduleName }: Props) => {
  return (
    <div className="bell-schedule">
      <Paper>
        <Loadable
          loading={loading}
          data={periods}
          LoadingComponent={Loading}
          EmptyComponent={Empty}
        >
          <div>
            {scheduleName !== 'none' &&
              <Typography type="title" className="bell-schedule-name">
                {scheduleName}
              </Typography>}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell numeric>Period</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {periods.map(n => {
                  return (
                    <TableRow key={n.period}>
                      <TableCell numeric>
                        {n.period}
                      </TableCell>
                      <TableCell>
                        {n.time}
                      </TableCell>
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
