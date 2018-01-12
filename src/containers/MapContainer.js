import * as React from 'react';
import { getFirebaseVal } from '../utils/firebase';
import Map from '../components/Map';

type Props = {};

type State = {
  loading: boolean,
  error: any,
  locations: Array<any>,
  queryResults: Array<any>,
  query: String
};

class MapContainer extends React.PureComponent<Props, State> {
  state = {
    loading: false,
    error: '',
    locations: [],
    queryResults: [],
    query: ''
  };

  componentDidMount() {
    this.setState({ resultsVisible: false });
    this.loadLocations().then();
  }

  async loadLocations() {
    this.setState({ loading: true });

    try {
      //temporary fix to get new locations
      const locations = await getFirebaseVal('/locations', true);
      //const locations = await getFirebaseVal('/locations');

      this.setState({ loading: false, locations: locations });

      console.log(locations);
    } catch (err) {
      console.error(err);

      let errorMessage = err;
      if (!navigator.onLine) {
        errorMessage = 'No Internet connection';
      }
      this.setState({
        error: errorMessage,
        loading: false
      });
    }
  }

  handleChange = event => {
    const queryValue = event.target.value;
    this.setState({ query: queryValue });

    if (queryValue.length > 1) {
      let query = queryValue.toLowerCase();
      const searchResults = this.state.locations.reduce((results, location) => {
        const queryIncludesLocation = query.includes(
          location.Location.toString().toLowerCase()
        );
        const locationIncludesQuery = location.Location.toString()
          .toLowerCase()
          .includes(query);

        let matchingKeywords = [];
        if (locationIncludesQuery) {
          matchingKeywords = location.KeyWords;
        } else {
          if (location.KeyWords) {
            matchingKeywords = location.KeyWords.filter(keyword => {
              const queryIncludesKeyword = query.includes(
                keyword.toLowerCase()
              );
              const keywordContainsQuery = keyword
                .toLowerCase()
                .includes(query);
              return queryIncludesKeyword || keywordContainsQuery;
            });
          }
        }

        const keywordMatchesQuery = matchingKeywords.length > 0;

        if (
          queryIncludesLocation ||
          locationIncludesQuery ||
          keywordMatchesQuery
        ) {
          results.push({
            ...location,
            matchingKeywords: matchingKeywords
          });
        }

        return results;
      }, []);

      this.setState({ queryResults: searchResults });
    } else {
      this.setState({ queryResults: [] });
    }
  };

  render() {
    return (
      <Map
        loading={this.state.loading}
        error={this.state.error}
        queryResults={this.state.queryResults}
        query={this.state.query}
        handleChange={this.handleChange}
      />
    );
  }
}

export default MapContainer;
