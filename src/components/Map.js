import * as React from 'react';
import map from '../assets/SchoolMap.png';
import './Map.css';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import LCEComponent from './LCEComponent';

type Props = {
  loading: boolean,
  error: any,
  queryResults: Array<any>,
  query: String,
  handleChange: event => void
};

const Empty = (
  <ListItem key="none">
    <ListItemText primary="No Search Result" />
  </ListItem>
);

const Loading = <CircularProgress />;
const Error = (error: string) => <div>{error}</div>;

// borders for the map
const BryantLatitude = 37.36132515401568;
const OakLatitude = 37.35678726844796;
const TrumanLongitude = -122.06870514131386;
const SoftballLongitude = -122.06433631650839;

const locationToPixels = (latitude, longitude) => {
  let canvas = document.getElementById('map');
  let LatitudePixelConstant = Math.abs(
    (OakLatitude - BryantLatitude) / canvas.width
  );
  let LongitudePixelConstant = Math.abs(
    (TrumanLongitude - SoftballLongitude) / canvas.height
  );
  let x = (latitude - BryantLatitude) / LatitudePixelConstant;
  let y = (longitude - SoftballLongitude) / LongitudePixelConstant;
  return [Math.abs(Math.round(x)), Math.abs(Math.round(y))];
};

const debug = (...data) => {
  if (window.location.hostname !== 'mvhs.io') {
    console.log(...data);
  }
};

const geolocation = () => {
  debug('asdf');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let canvas = document.getElementById('map');
        let ctx = canvas.getContext('2d');
        // draw map
        let img = new Image();
        img.src = map;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let pixels = locationToPixels(
            position.coords.latitude,
            position.coords.longitude
          );
          let x = pixels[0];
          let y = pixels[1];
          if (
            x > canvas.width + 100 ||
            y > canvas.height - 100 ||
            x < -100 ||
            y < -100
          ) {
            document.getElementById('result').innerHTML =
              "Your location can't be placed on the map. Tip: If you're actually at school, try using a mobile device. They tend to have better location information";
            return;
          }
          let radius;
          if (position.coords.accuracy < 100) {
            // this time its accurate
            let LatitudePixelConstant = Math.abs(
              (OakLatitude - BryantLatitude) / canvas.width
            );
            let LongitudePixelConstant = Math.abs(
              (TrumanLongitude - SoftballLongitude) / canvas.height
            );
            radius = position.coords.accuracy / 111111;
            let radiusX = radius / LatitudePixelConstant;
            let radiusY = radius / LongitudePixelConstant;
            radius = Math.max(radiusX, radiusY);
          } else {
            radius = 200;
            document.getElementById('result').innerHTML =
              'Your location is inaccurate (accuracy > 100m). Circle may be completely wrong. Tip: Try using a mobile device. They tend to have better location information';
          }
          console.log(radius);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#003300';
          ctx.stroke();
        };
      },
      error => {
        debug('err');
      },
      { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }
    );
  } else {
    debug('no geolocation');
  }
};

const loadImage = () => {
  debug('image onload');
  // makes canvas the size of the map
  let canvas = document.getElementById('map');
  let ctx = canvas.getContext('2d');
  let img = new Image();
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    debug('img loaded');
    debug(img);
  };
  img.src = map;
  debug(img);
  debug(canvas);
};

const Map = (props: Props) => {
  try {
    loadImage(); // bad hack to force the image to load whether or not onload is called
  } catch (e) {}
  /* commenting out search
    return (
      <div>
        <div>
                  <form onSubmit={handleSubmit} className="search-field">
            <TextField
              label="Search"
              value={props.query}
              onChange={props.handleChange}
            />
          </form>

          {props.query.length > 0 && (
            <div className="search-results">
              <Paper elevation={4}>
                <List>
                  <LCEComponent
                    loading={props.loading}
                    data={props.queryResults}
                    error={props.error}
                    LoadingComponent={Loading}
                    EmptyComponent={Empty}
                    ErrorComponent={Error(props.error)}
                  >
                    {props.queryResults.map(location => (
                      <ListItem key={location.Location}>
                        <ListItemText
                          className="search-result-keywords"
                          primary={location.Location}
                          secondary={location.matchingKeywords.join('\n')}
                        />
                      </ListItem>
                    ))}
                  </LCEComponent>
                </List>
              </Paper>
            </div>
          )}

        </div>

        <div className="map-container">
          <img alt="map" className="map" src={map} />
        </div>
      </div>
      );
      */
  return (
    <div className="map-container">
      <center>
        <button
          onClick={geolocation}
          style={{
            backgroundColor: '#ffc107',
            borderRadius: '2px',
            border: 'none'
          }}
        >
          Locate yourself (may be very inaccurate)
        </button>
        <br />
        <p id="result" />
        <canvas id="map" />
      </center>
    </div>
  );
};

export default Map;
