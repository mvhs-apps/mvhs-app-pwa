//@ flow
// students: https://docs.google.com/forms/d/e/1FAIpQLSfjtuFWUak0QJaiUOvaEo055pr6Tz9OW2dkeT0D6-zZfeCuCQ/viewform?
// teachers: https://docs.google.com/forms/d/e/1FAIpQLSetUMhhh3nCjHhpOOx01gNAYWGoBpWbCaWE9sgu1fqmWiXc1g/viewform
import { Typography } from 'material-ui';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import { Paper } from 'material-ui';
import React from 'react';
import './CovidLinks.css';
// For students:
// entry.68035700 - name
// entry.1297547436 - id
// entry.899973902 - Have you experienced COVID-19 symptoms within the past 14 days
// entry.1141781282 - Have you had a positive COVID test within the last 10 days
// entry.1853050928 - I am testing weekly and am making sure that I do not have COVID symptoms BEFORE I come to school

// For teachers:
// entry.68035700 - name
// entry.899973902 - Have you experienced COVID-19 symptoms within the past 14 days (such as persistent cough, fever in excess of 100.4 degrees, chills, sore throat, shortness of breath, diarrhea, new loss of smell or taste, muscle pain)?
// entry.1141781282 - Have you had a positive COVID test within the last 10 days?
// entry.1853050928 - I am testing weekly and am making sure that I do not have COVID symptoms BEFORE I come to school

class CovidLinksContainer extends React.PureComponent<Props, State> {
  state = {
    settings: {
      name: '',
      id: '',
      staffOrStudent: ''
    }
  };
  componentDidMount() {
    // get ls settings
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings !== null) {
      let link = '';
      if (settings.staffOrStudent === 'student') {
        link =
          'https://docs.google.com/forms/d/e/1FAIpQLSfjtuFWUak0QJaiUOvaEo055pr6Tz9OW2dkeT0D6-zZfeCuCQ/viewform?entry.68035700=' +
          settings.name +
          '&entry.1297547436=' +
          settings.id;
      } else {
        link =
          'https://docs.google.com/forms/d/e/1FAIpQLSetUMhhh3nCjHhpOOx01gNAYWGoBpWbCaWE9sgu1fqmWiXc1g/viewform?entry.68035700=' +
          settings.name;
      }
      this.setState({
        settings: settings,
        link: link
      });
    }
    // add event listener to local storage changes
    window.addEventListener('storage', this.handleStorageChange);
  }
  handleStorageChange = (event: any) => {
    if (event.key === 'settings') {
      const settings = JSON.parse(event.newValue);
      let link = '';
      if (settings.staffOrStudent === 'student') {
        link =
          'https://docs.google.com/forms/d/e/1FAIpQLSfjtuFWUak0QJaiUOvaEo055pr6Tz9OW2dkeT0D6-zZfeCuCQ/viewform?entry.68035700=' +
          settings.name +
          '&entry.1297547436=' +
          settings.id;
      } else {
        link =
          'https://docs.google.com/forms/d/e/1FAIpQLSetUMhhh3nCjHhpOOx01gNAYWGoBpWbCaWE9sgu1fqmWiXc1g/viewform?entry.68035700=' +
          settings.name;
      }
      this.setState({
        settings: settings,
        link: link
      });
    }
  };
  render() {
    return (
      <div className="covid-links">
        <Paper className="covid-links-paper">
          <Typography className="bell-schedule-name">
            COVID-19 Daily Tracker
          </Typography>
          {this.state.settings.staffOrStudent === '' ||
          (this.state.settings.name === '' && this.state.settings.id === '') ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfjtuFWUak0QJaiUOvaEo055pr6Tz9OW2dkeT0D6-zZfeCuCQ/viewform?usp=sf_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Student
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSetUMhhh3nCjHhpOOx01gNAYWGoBpWbCaWE9sgu1fqmWiXc1g/viewform?usp=sf_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Staff
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : this.state.settings.staffOrStudent === 'student' ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <a
                      href={this.state.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Student
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <a
                      href={this.state.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Staff
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Paper>
      </div>
    );
  }
}

export default CovidLinksContainer;
