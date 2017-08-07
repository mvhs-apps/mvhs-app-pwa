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

export type Period = {
  period: string,
  time: string
};

type Props = {
  loading: boolean,
  periods: Period[]
};

const BellSchedule = ({ periods, loading }: Props) => {
  return (
    <div className="bell-schedule">
      <Paper>
        {loading
          ? <div className="bell-schedule-loading"><CircularProgress/></div>
          : periods.length > 0
            ? <Table>
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
            : <div className="bell-schedule-empty">No school!</div>
        }
      </Paper>
    </div>
  );
};

export default BellSchedule;
