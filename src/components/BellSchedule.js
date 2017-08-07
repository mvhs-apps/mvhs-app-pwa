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

export type Period = {
  period: string,
  time: string
};

type Props = {
  periods: Period[]
};

const BellSchedule = ({ periods }: Props) => {
  return (
    <div className="bell-schedule">
      <Paper>
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
      </Paper>
    </div>
  );
};

export default BellSchedule;
