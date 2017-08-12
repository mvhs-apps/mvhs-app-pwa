import * as React from 'react';
import { Avatar, Paper } from 'material-ui';
import { CircularProgress } from '../../node_modules/material-ui/Progress/index';
import Loadable from './Loadable';
import './Calendar.css';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MapIcon from 'material-ui-icons/Map';
import { ListItemAvatar } from '../../node_modules/material-ui/List/index';

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
                  <ListItem button>
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
