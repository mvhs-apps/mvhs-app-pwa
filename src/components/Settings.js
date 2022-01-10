//@ flow

import { Typography } from 'material-ui';
import TextField from 'material-ui/TextField';

import React from 'react';

import './Settings.css';

const defaultValues = {
  name: '',
  id: ''
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
    const currentSettings = JSON.parse(localStorage.getItem('settings'));
    currentSettings[event.target.id] = event.target.value;
    console.log(currentSettings, event.target.value);
    localStorage.setItem('settings', JSON.stringify(currentSettings));
  };
  render() {
    console.log({
      name: this.state.name,
      id: this.state.id
    });
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
        <TextField
          id="name"
          label="Last Name, First Name"
          onChange={this.handleChange}
          defaultValue={this.state.name}
          value={this.state.name}
          margin="normal"
        />
        <br />
        <TextField
          id="id"
          label="ID (#1000 _ _ _ _ _)"
          onChange={this.handleChange}
          defaultValue={this.state.id}
          value={this.state.id}
          margin="normal"
        />
      </div>
    );
  }
}
export default Settings;
