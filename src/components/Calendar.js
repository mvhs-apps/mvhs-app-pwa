import * as React from 'react';

import './Calendar.css';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import MapIcon from 'material-ui-icons/Map';

import Loadable from './Loadable';

const Empty = <div className="card-padding center">No school events</div>;
const Loading = (
  <div className="card-padding center">
    <CircularProgress />
  </div>
);
const Error = (error: string) =>
  <div className="card-padding center">
    {error}
  </div>;

const Calendar = ({ loading, events, error }) => {
  return (
    <div className="calendar">
      <Paper>
        <Loadable
          loading={loading}
          data={events}
          error={error}
          LoadingComponent={Loading}
          EmptyComponent={Empty}
          ErrorComponent={Error(error)}
        >
          <div>
            <List>
              {events.map((event, index) => {
                return (
                  <ListItem
                    key={event.id}
                    dense={false}
                    divider={index !== events.length - 1}
                  >
                    <a href={event.mapURL} target="_blank" title="Open in Maps">
                      <ListItemAvatar>
                        <Avatar>
                          <MapIcon />
                        </Avatar>
                      </ListItemAvatar>
                    </a>
                    <ListItemText
                      className="calendar-desc"
                      primary={`${event.summary} • ${event.start} - ${event.end}`}
                      secondary={event.description}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Loadable>
      </Paper>
    </div>
  );
};

export default Calendar;
