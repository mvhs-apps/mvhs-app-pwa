import React from 'react';
import { Component } from 'react';
import map from '../assets/schoolmap.svg';
import './Map.css';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

//console.log(data);

var finalarray = [];
var checkarray = [];

var data;

//alert(data.length);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }; //for searchbar

    this.state = { view: 'none' };

    this.state = { loading: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //json variable
    var url = 'https://mvhs-app-d04d2.firebaseio.com/locations.json';

    this.setState({ view: 'none' });

    //Use fetch to get the spreadsheet data
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        //add the jsonData to a state variable
        if (jsonData != null) {
          data = jsonData;
          this.setState({ loading: false });
          console.log(this.state.loading);
          console.log(data);
        }
      });
  }

  handleChange(event) {
    //alert("IN CHANGE");
    console.log(event.target.value);

    finalarray = [];
    checkarray = [];
    //var first = true;
    this.setState({ value: event.target.value });
    this.setState({ view: 'none' });
    if (event.target.value.length > 2) {
      this.setState({ view: 'papers' });
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].KeyWords.length; j++) {
          if (data[i].KeyWords[j].toLowerCase().includes(event.target.value)) {
            finalarray.push(
              <Typography type="body1" component="p">
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <ListItemText
                        primary={data[i].KeyWords[j]}
                        secondary={data[i].Location}
                      />
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Typography>
            );
            console.log(finalarray);
            //first = false;
          }
        }
      }
      if (finalarray.length === 0) {
        finalarray.push(
          <ul className="sList">
            {' '}
            <li>
              <h1>Nothing Found</h1>
            </li>
          </ul>
        );
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="map-container">
          <img alt="map" className="map" src={map} />
        </div>

        <center>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Search"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </center>

        <br />
        <br />
        <Paper elevation={4} className={this.state.view}>
          <List>{finalarray}</List>
        </Paper>
        <br className={this.state.view} />
        <br className={this.state.view} />
      </div>
    );
  }
}

export default Map;
