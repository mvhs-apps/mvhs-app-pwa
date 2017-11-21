import React from 'react';
import { Component } from 'react';
import map from '../assets/schoolmap.svg';
import './Map.css';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

//console.log(data);

var finalarray = [];
var checkarray = [];

var data;

//alert(data.length);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }; //for searchbar

    this.state = { loading: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //json variable
    var url = 'https://mvhs-app-d04d2.firebaseio.com/locations.json';

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
    var first = true;
    this.setState({ value: event.target.value });
    if (event.target.value.length > 2) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].KeyWords.length; j++) {
          //console.log(
          //data[i].KeyWords[j] + ' ' + event.target.value
          //);
          //console.log("event.target.value: " + event.target.value);
          //console.log("data[i].KeyWords[j].toLowerCase(): " + data[i].KeyWords[j].toLowerCase());
          if (data[i].KeyWords[j].toLowerCase().includes(event.target.value)) {
            if (first) {
              console.log('IN SPECIAL J');
              finalarray.push(
                <ListItem button>
                  <ListItemText primary={data[i].Location} />
                </ListItem>
              );
              console.log(data[i].Location);
            }
            //console.log('something found!!');
            //console.log("Location: " + data[i].Location);

            //console.log('FOUND!!!!!' + data[i].Location);
            var founds = false;
            console.log(checkarray);
            checkarray.push(data[i].Location);
            console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
            for (var k = 0; k < checkarray.length; k++) {
              //console.log("IN FOOOR");
              if (checkarray[k] === data[i].Location) {
                console.log('IN IF');
              } else {
                founds = true;
                console.log('IN ELSE');
              }
            }
            console.log(founds);
            if (founds) {
              console.log('IN FOUNDS');
              finalarray.push(
                <ListItem button>
                  <ListItemIcon>
                    <ListItemText primary={data[i].Location} />
                  </ListItemIcon>
                </ListItem>
              );
            }
            finalarray.push(
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <ListItemText primary={data[i].KeyWords[j]} />
                  </ListItemIcon>
                </ListItem>
              </List>
            );
            console.log(finalarray);
            first = false;
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
        <List>{finalarray}</List>
      </div>
    );
  }
}

export default Map;
