import React from 'react';
import { Component } from 'react';
import map from '../assets/schoolmap.svg';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    var adminbuilding = [
      'activities',
      'office',
      'chac',
      'clubs',
      'confiscated',
      'phones',
      'lost',
      'found',
      'principal',
      'principals',
      'grissom',
      'teacher',
      'teachers',
      'mail',
      'theft',
      'report',
      'vice',
      'work',
      'permits'
    ];
    var financebuilding = [
      'money',
      'check',
      'bus',
      'pass',
      'buy',
      'tickets',
      'clothes',
      'dance',
      'replacement',
      'card',
      'locker',
      'parking',
      'permit',
      'reduced',
      'lunch'
    ];
    var attendanceoffice = ['attendance'];
    var library = ['print schedule', 'book', 'print'];
    var counselingoffices = [
      'counseling',
      'counselor',
      'appointment',
      'mental',
      'schedule'
    ];
    var registar = ['grade', 'transcript'];
    alert('A query was submitted: ' + this.state.value);
    event.preventDefault();
    var phrase = /*toLowerCase(*/ this.state.value; //);
    //check adminbuilding
    var somethingfound = false;
    for (var i = 0; i < adminbuilding.length - 1; i++) {
      if (phrase.includes(adminbuilding[i])) {
        alert('adminbuilding');
        i = adminbuilding.length - 1;
        somethingfound = true;
      }
    }
    //check Finance
    for (var i = 0; i < financebuilding.length - 1; i++) {
      if (phrase.includes(financebuilding[i])) {
        alert('finance');
        i = financebuilding.length - 1;
        somethingfound = true;
      }
    }
    //check attendance
    for (var i = 0; i < attendanceoffice.length - 1; i++) {
      if (phrase.includes(attendanceoffice[i])) {
        alert('attendanceoffice');
        i = attendanceoffice.length - 1;
        somethingfound = true;
      }
    }
    //check Library
    for (var i = 0; i < library.length - 1; i++) {
      if (phrase.includes(library[i])) {
        alert('library');
        i = library.length - 1;
        somethingfound = true;
      }
    }
    //counseling offices
    for (var i = 0; i < counselingoffices.length - 1; i++) {
      if (phrase.includes(counselingoffices[i])) {
        alert('counselingoffices');
        i = counselingoffices.length - 1;
        somethingfound = true;
      }
    }
    //registar
    for (var i = 0; i < registar.length - 1; i++) {
      if (phrase.includes(registar[i])) {
        alert('registar');
        i = registar.length - 1;
        somethingfound = true;
      }
    }

    if (!somethingfound) {
      alert('!somethingfound');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div className="overlay4admin" />
        <div className="map-container">
          <img alt="map" className="map" src={map} />
        </div>
      </div>
    );
  }
}

export default Map;
