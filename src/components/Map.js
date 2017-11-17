import React from 'react';
import { Component } from 'react';
import map from '../assets/schoolmap.svg';
import './Map.css';
import TextField from 'material-ui/TextField';

//console.log(data);

var finalarray = [];

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
    this.setState({ value: event.target.value });

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].KeyWords.length; j++) {
        console.log(
          data[i].name + ' ' + data[i].KeyWords[j] + ' ' + event.target.value
        );
        if (event.target.value.includes(data[i].KeyWords[j].toLowerCase())) {
          console.log('something found!!');
          console.log(data[i].Location);

          console.log('FOUND!!!!!' + data[i].Location);

          finalarray.push(<li>{data[i].Location}</li>);
          console.log(finalarray);
        }
      }
    }
    console.log('');
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

        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Search"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <ul>{finalarray}</ul>
      </div>
    );
  }
}

export default Map;
