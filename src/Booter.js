import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import Auth from './pages/auth/auth';
import App from './App';
import { isEmpty } from './lib/js';
import { setCountryStates } from './store/countries/action';

const fetchRequest = (params = {
  url: '',
  method: 'GET',
  body: {},
  params: {},
  headers: {},
}) => new Promise((resolve, reject) => {
  // make custom fetch request
  /* params{
      url : String,
      method: String,
      headers : Object
    }
    */
  const sessionUserToken = localStorage.getItem('sessionUserToken');
  const retry = () => {
    setTimeout(() => {
      console.log('retrying to connect to server');
      fetchRequest(params).then(resolve).catch(reject);
    }, 5000);
  };
  const errorHandler = (error) => {
    console.log('error full keys : ', Object.keys(error));
    if (error.response) {
      console.log('error response : ', error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = error.response;
      if (status === 500) {
        console.log('oops! there was a server error here 1');
        retry();
      } else {
        reject(error.response);
      }
    } else if (error.request) {
      // Internet offline
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (error.request.status === 0 && error.request.readyState === 4) {
        console.log('oops! internet offline');
      }

      retry();
    } else {
      console.log('last illegal error ', error);
      // Something happened in setting up the request that triggered an Error
      if (!navigator.onLine) {
        retry();
      } else {
        reject();
      }
    }
  };

  if (!isEmpty(sessionUserToken)) {
    const method = isEmpty(params.method) ? 'GET' : params.method.toUpperCase();
    console.log('SENDINg a fetxh request');
    axios({
      url: params.url,
      method,
      data: params.body || new FormData(),
      params: params.params,
      timeout: 0,
      headers: {
        ...params.headers,
        Authorization: `Bearer ${sessionUserToken}`,
      },
    }).then((response) => {
      const res = response.data;

      console.log('response is : ', response);
      console.log('res is : ', res);

      const { data } = res;
      resolve(data);
    }).catch((error) => {
      errorHandler(error);
    });
  } else {
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

    this.getCountries = this.getCountries.bind(this);
    this.getCountryStates = this.getCountryStates.bind(this);
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
          axios({
            url: `https://geodata.solutions/api/api.php?type=getStates&countryId=${countryId}`,
          }).then((response) => {
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
          }).catch(() => {
            this.getCountryStates(countryId).then(resolve);
          });
        } else resolve(states);
      } else resolve(false);
    });
  }

  render() {
    console.log('BOOTER PROPS : ', this.props);
    // return false ? <Auth /> : <App />;
    return (
      <>
        <App
          fetchRequest={fetchRequest}
          getCountries={this.getCountries}
          getCountryStates={this.getCountryStates}
        />
        {/* <Auth fetchRequest={fetchRequest} /> */}
      </>
    );
  }
}


Booter.propTypes = {
  countries: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  countries: state.countries,
});

const mapDispatchToProps = (dispath) => ({
  setCountryStates: (countryId, states) => dispath(setCountryStates(countryId, states)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Booter);
