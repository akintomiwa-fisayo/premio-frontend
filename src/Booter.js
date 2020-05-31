/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import Auth from './pages/auth/auth';
import App from './App';
import { isEmpty } from './lib/js';
import { setCountryStates, setCountryStateCities } from './store/countries/action';
import { setSessionUser } from './store/auth/action';

const FetchRequest = (params = {
  url: '',
  method: 'GET',
  body: {},
  params: {},
  headers: {},
  checkUser: false,
}) => new Promise((resolve, reject) => {
  const sessionUserToken = localStorage.getItem('sessionUserToken');
  const retry = () => {
    console.log('retrying to connect to server');
    FetchRequest(params).then(resolve).catch(reject);
  };
  const errorHandler = (error) => {
    console.log('error full keys : ', Object.keys(error));
    if (error.response) {
      console.log('error response : ', error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = error.response;
      if (status === 500) {
        console.log('oops! there was a server error here');
        retry();
      } else {
        reject(error);
      }
    } else if (error.request) {
      console.log('error request : ', error.request);
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (error.request.status === 0 && error.request.readyState === 4) {
        // Also caused by no internet
        console.log('oops! there was a server error');
        setTimeout(() => {
          console.log('retrying to connect to server');
          retry();
        }, 3000);
      }
    } else {
      console.log('last illegal error ', error);
      // Something happened in setting up the request that triggered an Error
      if (!navigator.onLine) {
        console.log("can't connect to serve because you are offline, will retry in 5 seconds");
        setTimeout(() => {
          console.log('retrying to connect to server');
          retry();
        }, 3000);
      }
      reject(error);
    }
  };

  if (!params.checkUser || !isEmpty(sessionUserToken)) {
    const method = isEmpty(params.method) ? 'GET' : params.method.toUpperCase();
    console.log('SENDINg a fetxh request', { params });
    const headers = {
      ...params.headers,
    };

    if (params.checkUser) {
      headers.Authorization = `Bearer ${sessionUserToken}`;
    }

    axios({
      url: params.url,
      method,
      data: params.body || new FormData(),
      params: params.params,
      timeout: 0,
      headers,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      console.log('CONSOLE INNER ERROR', { ...error });
      errorHandler(error);
    });
  } else {
    console.log('made artificial error');
    const error = {
      response: {
        data: {
          status: 'error',
          error: 'Unauthorized',
        },
        status: 401,
        statusText: 'Unauthorized',
      },
    };
    errorHandler(error);
  }
});

class Booter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this._isMounted = false;
    this.fetchRequest = this.fetchRequest.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.getCountryStates = this.getCountryStates.bind(this);
    this.getCountryStateCities = this.getCountryStateCities.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;

    // Get the session user
    const userId = localStorage.getItem('sessionUserId');
    this.fetchRequest({
      url: `${process.env.REACT_APP_API}/users/${userId}`,
      method: 'get',
    }).then((res) => {
      if (this._isMounted) {
        // console.log('We a valid user with token', res);
        props.setSessionUser(res);
        this.setState(() => ({ loading: false }));
      }
    }).catch((error) => {
      if (this._isMounted) {
        props.history.push('/');
      }
      console.log('GOT ULTIMATE ERROR', error);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCountries() {
    const { props } = this;
    const { countries } = props;

    return Object.keys(countries).map((id) => ({
      id,
      value: countries[id].value,
    }));
  }

  getCountryStates(countryId) {
    return new Promise((resolve) => {
      const { props } = this;
      const { countries } = props;
      if (countries[countryId]) {
        const { states } = countries[countryId];
        if (states === false) {
          FetchRequest({
            url: `https://geodata.solutions/api/api.php?type=getStates&countryId=${countryId}`,
          }).then((response) => {
            if (this._isMounted) {
              const { result } = response.data;
              const newStates = {};
              Object.keys(result).forEach((id) => {
                newStates[id] = {
                  value: result[id],
                  cities: false,
                };
              });
              props.setCountryStates(countryId, newStates);
              resolve(newStates);
            }
          }).catch(() => {
            if (this._isMounted) {
              this.getCountryStates(countryId).then(resolve);
            }
          });
        } else resolve(states);
      } else resolve(false);
    });
  }

  getCountryStateCities(countryId, stateId) {
    return new Promise((resolve) => {
      const { props } = this;
      const { countries } = props;
      if (countries[countryId]) {
        const { states } = countries[countryId];
        if (states) {
          const { cities } = states[stateId];
          if (cities === false) {
            FetchRequest({
              url: `https://geodata.solutions/api/api.php?type=getCities&countryId=${countryId}&stateId=${stateId}`,
            }).then((response) => {
              if (this._isMounted) {
                const { result } = response.data;
                let newCities = {};
                Object.keys(result).forEach((id) => {
                  newCities[id] = result[id];
                });

                if (Object.keys(newCities).length === 0) {
                  newCities = { '-1': states[stateId].value };
                }

                props.setCountryStateCities(countryId, stateId, newCities);
                resolve(newCities);
              }
            }).catch(() => {
              if (this._isMounted) {
                this.getCountryStates(countryId).then(resolve);
              }
            });
          } else resolve(cities);
        } else resolve(false);
      } else resolve(false);
    });
  }

  /**
    Request Method that verify user session before doing anything
  */
  fetchRequest(params = {
    url: '',
    method: 'GET',
    body: {},
    params: {},
    headers: {},
  }) {
    return new Promise((resolve, reject) => {
      FetchRequest({
        ...params,
        checkUser: true,
      }).then((response) => {
        const res = response.data;
        const { data } = res;
        resolve(data);
      }).catch((err) => {
        const error = err.response;
        const { props } = this;
        if (error.status === 401) {
          if (error.data.error === 'Token expired') {
            const userId = localStorage.getItem('sessionUserId');
            this.fetchRequest({
              url: `${process.env.REACT_APP_API}/users/${userId}/token_refresh`,
              method: 'patch',
            }).then((data) => {
              if (this._isMounted) {
                localStorage.setItem('sessionUserToken', data.token);
                this.fetchRequest(params).then(resolve).catch(reject);
              }
            }).catch(() => {
              if (this._isMounted) {
                props.setSessionUser(false);
                this.props.history.push('/sign-in');
                resolve();
              }
            });
          } else {
            props.setSessionUser(false);
            this.props.history.push('/sign-in');
            resolve();
          }
        } else reject(error);
      });
    });
  }

  render() {
    const { state, props } = this;
    if (state.loading) {
      return <div>we loading man</div>;
    }
    return props.sessionUser ? (
      <App
        FetchRequest={FetchRequest}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        fetchRequest={this.fetchRequest}
        getCountries={this.getCountries}
        getCountryStates={this.getCountryStates}
        getCountryStateCities={this.getCountryStateCities}
        sessionUser={props.sessionUser}
      />
    ) : (
      <Auth
        FetchRequest={FetchRequest}
      // eslint-disable-next-line react/jsx-no-duplicate-props
        fetchRequest={this.fetchRequest}
        getCountries={this.getCountries}
        getCountryStates={this.getCountryStates}
        getCountryStateCities={this.getCountryStateCities}
      />
    );
  }
}


Booter.propTypes = {
  history: PropTypes.object.isRequired,
  countries: PropTypes.object.isRequired,
  sessionUser: PropTypes.object.isRequired,
  setSessionUser: PropTypes.func.isRequired,
  setCountryStates: PropTypes.func.isRequired,
  setCountryStateCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  countries: state.countries,
  sessionUser: state.auth.user,
});

const mapDispatchToProps = (dispath) => ({
  setCountryStates: (countryId, states) => dispath(setCountryStates(countryId, states)),
  setCountryStateCities: (countryId, stateId, cities) => dispath(
    setCountryStateCities(countryId, stateId, cities),
  ),
  setSessionUser: (user) => dispath(setSessionUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Booter);
