import * as React from 'react';
import { Paper, Typography } from 'material-ui';
import { CircularProgress } from '../../node_modules/material-ui/Progress/index';
import Loadable from './Loadable';
import './Calendar.css';

const Calendar = ({ loading, event }) => {
  return (
    <div className="calendar">
      <Paper>
        <Loadable
          loading={loading}
          data={event}
          LoadingComponent={
            <div className="calendar-loading center">
              <CircularProgress />
            </div>
          }
          EmptyComponent={
            <div className="calendar-empty center">No school events</div>
          }
        >
          <div>
            <Typography type="title" className="calendar-name">
              {event}
            </Typography>
          </div>
        </Loadable>
      </Paper>
    </div>
  );
};

export default Calendar;
