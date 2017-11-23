import React, { Component } from 'react';
import map from '../assets/schoolmap.svg';
import './Map.css';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import Loadable from './LCEComponent';

let data;
let searchResults = [];

const Empty = <div className="card-padding center" />;
const Loading = (
  <div className="card-padding center">
    <CircularProgress />
  </div>
);
const Error = (error: string) => (
  <div className="card-padding center">{error}</div>
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      view: 'none',
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    Map.handleSubmit = Map.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = 'https://mvhs-app-d04d2.firebaseio.com/locations.json';
    this.setState({ view: 'none' });

    //Use fetch to get the spreadsheet data
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        //add the jsonData to a state variable
        if (jsonData !== null) {
          data = jsonData;
          this.setState({ loading: false });
        }
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ view: 'none' });

    if (event.target.value.length > 0) {
      this.setState({ view: 'search_results' });

      searchResults = [];
      let query = event.target.value.toLowerCase();
      data.forEach(event => {
        let found = false;
        let match = event['KeyWords'][0];
        const queryIncludesLocation = query.includes(
          (event['Location'] + '').toLowerCase()
        );
        const locationIncludesQuery = (event['Location'] + '')
          .toLowerCase()
          .includes(query);
        event['KeyWords'].forEach(keyword => {
          const queryIncludesKeyword = query.includes(keyword.toLowerCase());
          const keywordContainsQuery = keyword.toLowerCase().includes(query);
          if (
            queryIncludesKeyword ||
            keywordContainsQuery ||
            queryIncludesLocation ||
            locationIncludesQuery
          ) {
            found = true;
            match = keyword;
          }
        });

        if (found) {
          searchResults.push(
            <ListItem key={match}>
              <ListItemText primary={match} secondary={event.Location} />
            </ListItem>
          );
        }
      });
      if (searchResults.length === 0) {
        searchResults.push(
          <ListItem key="none">
            <ListItemText primary="Not found on campus" />
          </ListItem>
        );
      }
    }
  }

  static handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (this.state.loading) {
      return (
        <Loadable
          loading={this.state.loading}
          data={null}
          error={null}
          LoadingComponent={Loading}
          EmptyComponent={Empty}
          ErrorComponent={Error('')}
        />
      );
    }
    return (
      <div>
        <div>
          <form onSubmit={Map.handleSubmit} className="search_field">
            <TextField
              label="Search"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>

          <div className="search_results">
            <Paper elevation={4} className={this.state.view}>
              <List>{searchResults}</List>
            </Paper>
          </div>
        </div>

        <div className="map-container">
          <img alt="map" className="map" src={map} />
        </div>
      </div>
    );
  }
}

export default Map;
