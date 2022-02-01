//@ flow

import { Typography } from 'material-ui';
import Radio from 'material-ui/Radio';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import TextField from 'material-ui/TextField';
import { FormControlLabel, FormLabel } from 'material-ui';

import React from 'react';

import './Settings.css';
import { FormControl } from 'material-ui';
const defaultValues = {
  name: '',
  id: '',
  staffOrStudent: 'student'
};
class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultValues
    };
    const settings = localStorage.getItem('settings');
    if (settings) {
      this.state = JSON.parse(settings);
    } else {
      const settings = {
        ...defaultValues
      };
      localStorage.setItem('settings', JSON.stringify(settings));
    }
    // add event listener to localStorage
    window.addEventListener('storage', this.onStorageChange);
  }
  onStorageChange = event => {
    if (event.key === 'settings') {
      this.setState(JSON.parse(event.newValue));
    }
  };
  componentWillUnmount() {
    window.removeEventListener('storage', this.onStorageChange);
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(event.target.name);
    const currentSettings = JSON.parse(localStorage.getItem('settings'));
    currentSettings[event.target.id] = event.target.value;
    localStorage.setItem('settings', JSON.stringify(currentSettings));
  };
  handleRadioChange = event => {
    this.setState({
      staffOrStudent: event.target.value
    });
    const currentSettings = JSON.parse(localStorage.getItem('settings'));
    currentSettings.staffOrStudent = event.target.value;
    localStorage.setItem('settings', JSON.stringify(currentSettings));
  };
  render() {
    return (
      <div className="settings-container">
        <Typography type="headline" component="h2">
          Settings
        </Typography>
        <Typography type="body1" component="p" align="center" className="">
          Fill out your information below to autofill the Covid-19 form fields.
          The form automatically saves locally on your device. You can to
          re-enter your information into each browser you use.
        </Typography>
        <FormControl>
          <RadioGroup
            row
            id="staffOrStudent"
            value={this.state.staffOrStudent}
            defaultValue={'student'}
            onChange={this.handleRadioChange}
          >
            <FormControlLabel
              name="staffOrStudent"
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              name="staffOrStudent"
              value="staff"
              control={<Radio />}
              label="Staff"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="name"
          label="Last Name, First Name"
          onChange={this.handleChange}
          value={this.state.name}
          margin="normal"
        />
        <br />
        {this.state.staffOrStudent == 'student' && (
          <TextField
            id="id"
            label="ID (#1000 _ _ _ _ _)"
            onChange={this.handleChange}
            value={this.state.id}
            margin="normal"
          />
        )}
      </div>
    );
  }
}
export default Settings;
