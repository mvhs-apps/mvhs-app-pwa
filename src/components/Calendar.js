import * as React from 'react';

import './Calendar.css';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';
import MapIcon from 'material-ui-icons/Map';

import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';

import Loadable from './LCEComponent';

const Empty = <div className="card-padding center">No events</div>;
const Loading = (
  <div className="card-padding center">
    <CircularProgress />
  </div>
);
const Error = (error: string) => (
  <div className="card-padding center">{error}</div>
);

type Props = {
  loading: boolean,
  events: Array<any>,
  error: any,
  options: { [string]: string },
  selectedOption: string,
  onHandleChange: e => {}
};

const Calendar = ({
  loading,
  events,
  error,
  options,
  selectedOption,
  onHandleChange
}: Props) => {
  return (
    <div className="calendar">
      <Paper>
        <FormControl className="calendar-form">
          <Select
            className="calendar-select"
            native={true}
            value={selectedOption}
            onChange={onHandleChange}
            input={<Input />}
          >
            {Object.keys(options).map((calendarName, index) => (
              <option key={calendarName} value={calendarName}>
                {calendarName}
              </option>
            ))}
          </Select>
        </FormControl>

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
                      primary={`${event.summary} • ${event.start} - ${
                        event.end
                      }`}
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
