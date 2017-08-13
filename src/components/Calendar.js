import * as React from 'react';

import './Calendar.css';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import MapIcon from 'material-ui-icons/Map';

import Loadable from './Loadable';

const Calendar = ({ loading, events }) => {
  return (
    <div className="calendar">
      <Paper>
        <Loadable
          loading={loading}
          data={events}
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
            <List>
              {events.map(event => {
                return (
                  <ListItem id={event.id}>
                    <ListItemAvatar>
                      <a
                        href={event.mapURL}
                        target="_blank"
                        title="Open in Maps"
                      >
                        <Avatar>
                          <MapIcon />
                        </Avatar>
                      </a>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        event.summary + ' | ' + event.start + ' - ' + event.end
                      }
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
