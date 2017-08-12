import google from 'googleapis';
let calendar = google.calendar('v3');

let key = require('../mvhs-app-d7f3f580e7c5.json');
let jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/calendar'],
  null
);

jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
  }
});

let getCalendarEvents = (timeMin, timeMax) => {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId:
          'mvla.net_3236303434383738363838@resource.calendar.google.com',
        timeMin: timeMin,
        timeMax: timeMax,
        auth: jwtClient
      },
      function(err, resp) {
        // handle err and response
        if (!err) {
          console.log('resp = ' + JSON.stringify(resp));
        } else {
          console.error('err = ' + err);
        }
      }
    );
  });
};

export default getCalendarEvents;
