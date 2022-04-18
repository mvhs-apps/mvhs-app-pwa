import * as React from 'react';
import map from '../assets/schoolmap.svg';
import './Map.css';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import LCEComponent from './LCEComponent';

type Props = {
  loading: boolean,
  error: any,
  queryResults: Array<any>,
  query: String,
  handleChange: event => void
};

const Empty = (
  <ListItem key="none">
    <ListItemText primary="No Search Result" />
  </ListItem>
);

const Loading = <CircularProgress />;
const Error = (error: string) => <div>{error}</div>;

const handleSubmit = event => {
  event.preventDefault();
};

const Map = (props: Props) => {
  /* commenting out search
    return (
      <div>
        <div>
                  <form onSubmit={handleSubmit} className="search-field">
            <TextField
              label="Search"
              value={props.query}
              onChange={props.handleChange}
            />
          </form>

          {props.query.length > 0 && (
            <div className="search-results">
              <Paper elevation={4}>
                <List>
                  <LCEComponent
                    loading={props.loading}
                    data={props.queryResults}
                    error={props.error}
                    LoadingComponent={Loading}
                    EmptyComponent={Empty}
                    ErrorComponent={Error(props.error)}
                  >
                    {props.queryResults.map(location => (
                      <ListItem key={location.Location}>
                        <ListItemText
                          className="search-result-keywords"
                          primary={location.Location}
                          secondary={location.matchingKeywords.join('\n')}
                        />
                      </ListItem>
                    ))}
                  </LCEComponent>
                </List>
              </Paper>
            </div>
          )}

        </div>

        <div className="map-container">
          <img alt="map" className="map" src={map} />
        </div>
      </div>
      );
      */
  return (
    <div className="map-container">
      <center>
        <img alt="map" className="map" src={map} />
      </center>
    </div>
  );
};

export default Map;
