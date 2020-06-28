/* eslint-disable no-console */
import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import {
  changeHeader, resetHeader, resetNav, changeNav,
} from '../../store/setting/action';
import {
  isEmpty, isEmail, devalueString, parseQueryString,
} from '../../lib/js';
import { changeSignUp, changeSignUpForm } from '../../store/auth/action';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.submit = this.submit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.getStates = this.getStates.bind(this);
    this.getCitites = this.getCitites.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    const { props } = this;
    props.changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'sign up',
      onGoBack: () => {
        this.props.history.push('/');
      },
    });
    props.changeNav({
      show: false,
    });

    const query = parseQueryString(this.props.location.search);
    if (query.referer) {
      this.props.changeSignUpForm({
        referer: query.referer,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.props.resetHeader();
    this.props.resetNav();
  }

  getStates(countryId) {
    const { props } = this;
    props.changeSignUp({
      statesOptions: 'loading',
      citiesOptions: false,
    });
    props.getCountryStates(countryId).then((states) => {
      if (this._isMounted) {
        const statesOptions = Object.keys(states).map((id) => ({
          value: id,
          label: states[id].value,
        }));
        props.changeSignUp({
          statesOptions,
        });
        console.log('OUR STATE OPTIONS IS : ', statesOptions);
      }
    });
  }

  getCitites(stateId) {
    const { props } = this;
    props.changeSignUp({
      citiesOptions: 'loading',
    });

    props.getCountryStateCities(props.signUp.form.countryId, stateId).then((cities) => {
      if (this._isMounted) {
        const citiesOptions = Object.keys(cities).map((id) => ({
          value: id,
          label: cities[id],
        }));
        props.changeSignUp({
          citiesOptions,
        });
        console.log('OUR STATE OPTIONS IS : ', citiesOptions);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validateField(field, value) {
    const error = {};

    if (['firstName', 'lastName'].indexOf(field) > -1) {
      error[`${field}Error`] = isEmpty(value) ? 'can\'t be empty' : false;
    } else if (field === 'email') {
      error[`${field}Error`] = !isEmail(value) ? 'invalid email address' : false;
    } else if (field === 'mobileNumber') {
      error[`${field}Error`] = (value.length < 8 || value.length > 13) ? 'invalid mobile number' : false;
    } else if (field === 'dateOfBirth') {
      error[`${field}Error`] = isEmpty(value) ? 'invalid date' : false;
    } else if (['countryId', 'stateId', 'cityId'].indexOf(field) > -1) {
      const name = devalueString(field).split(' ')[0];
      error[`${field}Error`] = isEmpty(value) ? `invalid ${name}` : false;
    } else if (field === 'termsAgree') {
      error[`${field}Error`] = !value;
    }
    return error;
  }

  regField(field, value) {
    this.props.changeSignUpForm({
      [field]: value,
      ...this.validateField(field, value),
    });
  }

  submit() {
    const { props } = this;
    const { signUp } = props;

    if (!signUp.submitting) {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        dateOfBirth,
        countryId,
        stateId,
        cityId,
        termsAgree,
        referer,
      } = signUp.form;

      const validateFields = () => {
        const fields = {
          firstName,
          lastName,
          email,
          mobileNumber,
          dateOfBirth,
          countryId,
          stateId,
          cityId,
          termsAgree,
        };

        let errors = {};

        Object.keys(fields).forEach((key) => {
          errors = {
            ...errors,
            ...this.validateField(key, fields[key]),
          };
        });

        props.changeSignUpForm({
          ...errors,
        });

        for (const key in errors) {
          if (errors[key] !== false) {
            return false;
          }
        }

        return true;
      };

      if (validateFields()) {
        props.changeSignUp({ submitting: true });
        props.FetchRequest({
          url: `${process.env.REACT_APP_API}/auth/register`,
          method: 'POST',
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            dateOfBirth,
            countryId,
            stateId,
            mobileNumber,
            cityId,
            referer,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          console.log('login response : ', res);
          if (this._isMounted) {
            const { regId } = res.data.data;
            props.changeSignUp({
              regId,
            });
            this.props.history.push('/confirm-sign-up');
          }
        }).catch((err) => {
          console.log('the error', { ...err });
          if (this._isMounted) {
            const reqFormError = {};
            const { error } = err.response.data;
            Object.keys(error).forEach((key) => {
              reqFormError[`${key}Error`] = error[key];
            });

            props.changeSignUpForm({
              ...reqFormError,
            });

            props.changeSignUp({
              submitting: false,
            });
          }
        });
      }
    }
  }

  render() {
    const { props } = this;
    const { signUp } = props;
    const { form } = signUp;


    const countries = [{
      value: '-placeholder-',
      label: 'Select Country',
      defaultValue: true,
      disabled: true,
    },
    ...(props.getCountries().map((country) => ({
      value: country.id,
      label: country.value,
    }))),
    ];

    let states = [{
      value: '-placeholder-',
      label: 'Select State',
      defaultValue: true,
      disabled: true,
    }];

    if (signUp.statesOptions === 'loading') {
      states = [{
        value: '-placeholder-',
        label: 'Please wait...',
        defaultValue: true,
        disabled: true,
      }];
    } else if (signUp.statesOptions) {
      states.push(...signUp.statesOptions);
    }

    let cities = [{
      value: '-placeholder-',
      label: 'Select City',
      defaultValue: true,
      disabled: true,
    }];

    if (signUp.citiesOptions === 'loading') {
      cities = [{
        value: '-placeholder-',
        label: 'Please wait...',
        defaultValue: true,
        disabled: true,
      }];
    } else if (signUp.citiesOptions) {
      cities.push(...signUp.citiesOptions);
    }

    return (
      <div id="signupComp">
        <div id="content">
          {/* <img id="logo" src={logo} alt="logo" /> */}
          <InputField
            type="text"
            value={form.firstName}
            label={(
              <>
                First Name
                {form.firstNameError !== false
                  ? (
                    <span className="error"> : {form.firstNameError} </span>
                  ) : ''}
              </>
            )}
            onChange={(firstName) => {
              this.regField('firstName', firstName);
            }}
          />
          <InputField
            type="text"
            value={form.lastName}
            label={(
              <>
                Last Name
                {form.lastNameError !== false
                  ? (
                    <span className="error"> : {form.lastNameError} </span>
                  ) : ''}
              </>
            )}
            onChange={(lastName) => {
              this.regField('lastName', lastName);
            }}
          />
          <InputField
            type="text"
            value={form.email}
            label={(
              <>
                Email
                {form.emailError !== false
                  ? (
                    <span className="error"> : {form.emailError} </span>
                  ) : ''}
              </>
            )}
            onChange={(email) => {
              this.regField('email', email);
            }}
          />
          <InputField
            type="number"
            value={form.mobileNumber}
            label={(
              <>
                Mobile Number
                {form.mobileNumberError !== false
                  ? (
                    <span className="error"> : {form.mobileNumberError} </span>
                  ) : ''}
              </>
            )}
            onChange={(mobileNumber) => {
              this.regField('mobileNumber', mobileNumber);
            }}
          />
          <InputField
            type="date"
            value={form.dateOfBirth}
            label={(
              <>
                Date Of Birth
                {form.dateOfBirthError !== false
                  ? (
                    <span className="error"> : {form.dateOfBirthError} </span>
                  ) : ''}
              </>
            )}
            onChange={(dateOfBirth) => {
              this.regField('dateOfBirth', dateOfBirth);
            }}
          />
          <InputField
            type="select"
            value={form.countryId}
            label={(
              <>
                Country
                {form.countryIdError !== false
                  ? (
                    <span className="error"> : {form.countryIdError} </span>
                  ) : ''}
              </>
            )}
            options={countries}
            onChange={(countryId) => {
              this.regField('countryId', countryId);
              this.getStates(countryId);
            }}
          />
          <InputField
            type="select"
            value={form.stateId}
            label={(
              <>
                State
                {form.stateIdError !== false
                  ? (
                    <span className="error"> : {form.stateIdError} </span>
                  ) : ''}
              </>
            )}
            options={states}
            onChange={(stateId) => {
              this.regField('stateId', stateId);
              this.getCitites(stateId);
            }}
          />
          <InputField
            type="select"
            value={form.cityId}
            label={(
              <>
                City
                {form.cityIdError !== false
                  ? (
                    <span className="error"> : {form.cityIdError} </span>
                  ) : ''}
              </>
            )}
            options={cities}
            onChange={(cityId) => {
              this.regField('cityId', cityId);
            }}
          />
          <div id="termsCond" className={form.termsAgreeError ? 'error' : ''}>
            <Checkbox
              checked={form.termsAgree}
              style={{ marginRight: '1em' }}
              onChange={(e) => {
                const termsAgree = e.target.checked;
                this.regField('termsAgree', termsAgree);
              }}
            />
            <span>You have to agree to our <Link to="#">terms and conditions</Link></span>
          </div>

          <button
            type="button"
            className={`btn btn-default${signUp.submitting ? ' disabled' : ''}`}
            onClick={this.submit}
          >CONTINUE
            {
              signUp.submitting
                ? <span className="fa fa-spin fa-spinner icon" />
                : ''
            }
          </button>

          <div id="switcher">
            <span>or</span>
            <p><Link to="/">Sign In</Link>, if you already have an account</p>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  FetchRequest: PropTypes.func.isRequired,
  changeHeader: PropTypes.func.isRequired,
  changeNav: PropTypes.func.isRequired,
  resetHeader: PropTypes.func.isRequired,
  resetNav: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  getCountryStates: PropTypes.func.isRequired,
  getCountryStateCities: PropTypes.func.isRequired,
  changeSignUp: PropTypes.func.isRequired,
  changeSignUpForm: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  signUp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  signUp: state.auth.signUp,
});

const mapDispatchToProps = (dispatch) => ({
  changeNav: (nav) => dispatch(changeNav(nav)),
  changeHeader: (header) => dispatch(changeHeader(header)),
  resetHeader: () => dispatch(resetHeader()),
  resetNav: () => dispatch(resetNav()),
  changeSignUp: (props) => dispatch(changeSignUp(props)),
  changeSignUpForm: (props) => dispatch(changeSignUpForm(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
