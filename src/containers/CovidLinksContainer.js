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

// entry.68035700 - name
// entry.1297547436 - id
// entry.899973902 - Have you experienced COVID-19 symptoms within the past 14 days
// entry.1141781282 - Have you had a positive COVID test within the last 10 days
// entry.1853050928 - I am testing weekly and am making sure that I do not have COVID symptoms BEFORE I come to school

class CovidLinksContainer extends React.PureComponent {
  render() {
    return (
      <div className="covid-links">
        <Paper className="covid-links-paper">
          <Typography type="title" className="bell-schedule-name">
            COVID-19 Daily Symptom Trackers
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teachers</TableCell>
                <TableCell>Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfjtuFWUak0QJaiUOvaEo055pr6Tz9OW2dkeT0D6-zZfeCuCQ/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Student Form
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSetUMhhh3nCjHhpOOx01gNAYWGoBpWbCaWE9sgu1fqmWiXc1g/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Staff Form
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default CovidLinksContainer;
