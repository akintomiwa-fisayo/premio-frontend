/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import PropTypes, { bool, object } from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import App from './App';
import { isEmpty } from './lib/js';
import { setCountryStates, setCountryStateCities } from './store/countries/action';
import { setSessionUser } from './store/auth/action';
import Auth from './pages/auth/auth';
import { setCartProducts } from './store/cart/action';
import { changeHeader, resetHeader } from './store/setting/action';
import HeaderMobile from './components/shared/HeaderMobile';

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
      notLoggedInRedirect: false,
    };

    this._isMounted = false;
    this.onComponentMount = this.onComponentMount.bind(this);
    this.fetchRequest = this.fetchRequest.bind(this);
    this.getAllCountry = this.getAllCountry.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.getCountryStates = this.getCountryStates.bind(this);
    this.getCountryStateCities = this.getCountryStateCities.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props, state } = this;
    const paths = props.location.pathname.split('/');
    const authPages = [
      'sign-up',
      'confirm-sign-up',
    ];
    if (authPages.indexOf(paths[1]) === -1) {
      console.log('still enter sha');
      this.setState({ notLoggedInRedirect: true });
    }

    console.log('BOOTER PROPS', paths);
    const notLoggedIn = () => {
      this.setState(() => ({ loading: false }));

      if (state.notLoggedInRedirect) {
        props.history.push('/sign-in');
      }
    };

    // this.getAllCountry().then(() => {
    // Get the session user
    const userId = localStorage.getItem('sessionUserId');
    if (!userId) {
      notLoggedIn();
    } else {
      // Has an account and is attempting to login
      this.fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${userId}?columns=id,firstName,lastName,email,displayImage,isVendor,companyName,cartProducts`,
        method: 'get',
      }).then((res) => {
        console.log('says We a valid user with token', res);
        if (this._isMounted) {
          const { cartProducts, ...user } = res;
          props.setSessionUser(user);
          props.setCartProducts(cartProducts);
          this.setState(() => ({ loading: false }));
        }
      }).catch((error) => {
        if (this._isMounted) {
          notLoggedIn();
        }
        console.log('GOT ULTIMATE ERROR', error);
      });
    }
    // });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // eslint-disable-next-line class-methods-use-this
  onComponentMount() {
    document.querySelector('html').scrollTop = 0;
  }

  getAllCountry() {
    const { countries } = this.props;
    const countryKeys = Object.keys(countries);

    const processFetchStatesCities = (countryId, stateKeys, counter = 0) => new Promise((resolve) => {
      const stateId = stateKeys[counter];
      if (stateId) {
        this.getCountryStateCities(countryId, stateId).then(() => {
          processFetchStatesCities(countryId, stateKeys, counter + 1).then(resolve);
          // processFetchCities(countryId, stateId, Object.keys(cities));
        });
      } else {
        resolve();
      }
    });

    const processFetch = (counter = 0) => new Promise((resolve) => {
      const countryId = countryKeys[counter];
      if (countryId) {
        this.getCountryStates(countryId).then((states) => {
          processFetchStatesCities(countryId, Object.keys(states)).then(() => {
            processFetch(counter + 1).then(resolve);
          });
        });
      } else {
        resolve();
      }
    });

    return new Promise((resolve) => {
      processFetch().then(resolve);
    });
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
        console.log('okay in 2 error', { ...err });
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
            if (this.state.notLoggedInRedirect) {
              this.props.history.push('/sign-in');
            }
            reject(error);
          }
        } else reject(error);
      });
    });
  }

  render() {
    const { state, props } = this;
    if (state.loading) {
      return <div id="appLoading" />;
    }

    return (
      <>
        <HeaderMobile {...props} />
        {props.sessionUser
          ? (
            <App
              {...this.props}
              FetchRequest={FetchRequest}
            // eslint-disable-next-line react/jsx-no-duplicate-props
              fetchRequest={this.fetchRequest}
              getCountries={this.getCountries}
              getCountryStates={this.getCountryStates}
              getCountryStateCities={this.getCountryStateCities}
              sessionUser={props.sessionUser}
              setSessionUser={props.setSessionUser}
              onComponentMount={this.onComponentMount}
            />
          )
          : (
            <Auth
              {...this.props}
              FetchRequest={FetchRequest}
            // eslint-disable-next-line react/jsx-no-duplicate-props
              fetchRequest={this.fetchRequest}
              getCountries={this.getCountries}
              getCountryStates={this.getCountryStates}
              getCountryStateCities={this.getCountryStateCities}
              sessionUser={props.sessionUser}
              setSessionUser={props.setSessionUser}
              onComponentMount={this.onComponentMount}
            />
          )}
      </>
    );
  }
}


Booter.propTypes = {
  history: PropTypes.object.isRequired,
  countries: PropTypes.object.isRequired,
  sessionUser: PropTypes.arrayOf(bool, object).isRequired,
  setSessionUser: PropTypes.func.isRequired,
  setCountryStates: PropTypes.func.isRequired,
  setCountryStateCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  store: state,
  countries: state.countries,
  sessionUser: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchEvent: dispatch,
  setCountryStates: (countryId, states) => dispatch(setCountryStates(countryId, states)),
  setCountryStateCities: (countryId, stateId, cities) => dispatch(
    setCountryStateCities(countryId, stateId, cities),
  ),
  setSessionUser: (user) => dispatch(setSessionUser(user)),
  setCartProducts: (cartProducts) => dispatch(setCartProducts(cartProducts)),
  changeHeader: (props) => dispatch(changeHeader(props)),
  resetHeader: (props) => dispatch(resetHeader(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Booter);
