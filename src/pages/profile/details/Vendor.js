import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, isEmail, devalueString } from '../../../lib/js';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.initUpdateForm = {
      companyName: '',
      companyNameError: false,
      bio: '',
      bioError: false,
      email: '',
      emailError: false,
      mobileNumber: '',
      mobileNumberError: false,
      countryId: '',
      countryIdError: false,
      stateId: '',
      stateIdError: false,
      cityId: '',
      cityIdError: false,
      accountName: '',
      accountNameError: false,
      accountNumber: '',
      accountNumberError: false,
      submitting: false,
    };

    this.state = {
      updateDetails: false,
      updateForm: this.initUpdateForm,
      loading: false,
    };

    this._isMounted = false;
    this.submit = this.submit.bind(this);
    this.changeUpdateForm = this.changeUpdateForm.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getStates(countryId) {
    const { props } = this;

    props.setInfo({
      statesOptions: 'loading',
      citiesOptions: false,
    });
    props.getCountryStates(countryId).then((states) => {
      if (this._isMounted) {
        const statesOptions = Object.keys(states).map((id) => (
          <option value={id}>
            {states[id].value}
          </option>
        ));

        props.setInfo({
          statesOptions,
        });
        this.setState((prev) => ({
          updateForm: {
            ...prev.updateForm,
            stateId: '',
          },
        }));
        console.log('OUR STATE OPTIONS IS : ', statesOptions);
      }
    });
  }

  getCitites(stateId) {
    const { props, state } = this;
    props.setInfo({
      citiesOptions: 'loading',
    });

    props.getCountryStateCities(state.updateForm.countryId, stateId).then((cities) => {
      if (this._isMounted) {
        const citiesOptions = Object.keys(cities).map((id) => (
          <option value={id}>
            {cities[id]}
          </option>
        ));

        props.setInfo({
          citiesOptions,
        });

        this.setState((prev) => ({
          updateForm: {
            ...prev.updateForm,
            cityId: '',
          },
        }));

        console.log('OUR STATE OPTIONS IS : ', citiesOptions);
      }
    });
  }

  regField(field, value) {
    this.setState((prev) => ({
      updateForm: {
        ...prev.updateForm,
        [field]: value,
        ...this.validateField(field, value),
      },
    }));
  }

  changeUpdateForm(props) {
    this.setState((prev) => ({
      updateForm: {
        ...prev.updateForm,
        ...props,
      },
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  // eslint-disable-next-line class-methods-use-this
  makeDateValue(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) { month = `0${month}`; }
    if (day.length < 2) { day = `0${day}`; }

    return [year, month, day].join('-');
  }

  // eslint-disable-next-line class-methods-use-this
  validateField(field, value) {
    const error = {};
    if (['companyName', 'bio', 'accountName', 'accountNumber'].indexOf(field) > -1) {
      error[`${field}Error`] = isEmpty(value) ? 'can\'t be empty' : false;
      if (field === 'accountNumber' && !isEmpty(value)) {
        error[`${field}Error`] = isNaN(value) ? 'not a valid number' : false;
      }
    } else if (field === 'email') {
      error[`${field}Error`] = !isEmail(value) ? 'invalid email address' : false;
    } else if (field === 'mobileNumber') {
      error[`${field}Error`] = (value.length < 8 || value.length > 13) ? 'invalid mobile number' : false;
    } else if (['countryId', 'stateId', 'cityId'].indexOf(field) > -1) {
      const name = devalueString(field).split(' ')[0];
      error[`${field}Error`] = isEmpty(value) ? `invalid ${name}` : false;
    }
    return error;
  }

  updateDetails(updateDetails = true) {
    const { props } = this;
    this.setState((prev) => ({
      updateDetails,
      loading: updateDetails ? true : prev.loading,
    }));

    if (updateDetails) {
      // GET the IDs for country, state, and cty respectively
      const { profile } = props;
      const { details } = profile;
      const { country, state, city } = details;
      let countryId = null;
      let stateId = null;
      let cityId = null;

      // Get country id
      for (const id in props.countries) {
        const countryObj = props.countries[id];
        if (countryObj.value.toLowerCase() === country.toLowerCase()) {
          countryId = id;
          break;
        }
      }

      // Get the state id
      props.getCountryStates(countryId).then((states) => {
        if (this._isMounted) {
          const statesOptions = Object.keys(states).map((id) => {
            if (states[id].value.toLowerCase() === state.toLowerCase()) {
              stateId = id;
            }
            return (
              <option value={id}>
                {states[id].value}
              </option>
            );
          });

          props.setInfo({
            statesOptions,
          });

          // Get city id
          props.getCountryStateCities(countryId, stateId).then((cities) => {
            if (this._isMounted) {
              const citiesOptions = Object.keys(cities).map((id) => {
                if (cities[id].toLowerCase() === city.toLowerCase()) {
                  cityId = id;
                }
                return (
                  <option value={id}>
                    {cities[id]}
                  </option>
                );
              });

              props.setInfo({
                citiesOptions,
              });

              this.setState((prev) => ({
                updateForm: {
                  ...prev.updateForm,
                  ...profile.details,
                  dateOfBirth: this.makeDateValue(profile.details.dateOfBirth, 'yyyy/mm/dd'),
                  countryId,
                  stateId,
                  cityId,
                },
                loading: false,
              }));

              console.log('OUR STATE OPTIONS IS : ', { countryId, stateId, cityId });
            }
          });
        }
      });
    }
  }

  submit() {
    const { props, state } = this;
    const { updateForm } = state;
    const { sessionUser } = props;

    if (!updateForm.submitting) {
      const {
        companyName,
        bio,
        email,
        mobileNumber,
        countryId,
        stateId,
        cityId,
        accountName,
        accountNumber,
      } = updateForm;

      const validateFields = () => {
        const fields = {
          companyName,
          bio,
          email,
          mobileNumber,
          countryId,
          stateId,
          cityId,
          accountName,
          accountNumber,
        };

        let errors = {};

        Object.keys(fields).forEach((key) => {
          errors = {
            ...errors,
            ...this.validateField(key, fields[key]),
          };
        });

        this.setState((prev) => ({
          updateForm: {
            ...prev.updateForm,
            ...errors,
          },
        }));

        for (const key in errors) {
          if (errors[key] !== false) {
            return false;
          }
        }

        return true;
      };

      if (validateFields()) {
        // send changes to server
        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/users/${sessionUser.id}`,
          method: 'PATCH',
          body: JSON.stringify({
            companyName,
            bio,
            email,
            mobileNumber,
            countryId,
            stateId,
            cityId,
            accountName,
            accountNumber,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          console.log('user update response : ', res);
          if (this._isMounted) {
            localStorage.setItem('sessionUserToken', res.user.token);
            props.setSessionUser(res.user);
            this.setState(() => ({
              updateForm: this.initUpdateForm,
            }));
          }
        }).catch((err) => {
          if (this._isMounted) {
            const reqFormError = {};
            const { error } = err.data;
            Object.keys(error).forEach((key) => {
              reqFormError[`${key}Error`] = error[key];
            });

            props.changeUpdateForm({
              ...reqFormError,
              submitting: false,
            });
          }
        });

        // refelct changes
        props.setInfo({
          details: {
            ...props.profileDetails,
            companyName,
            bio,
            email,
            mobileNumber,
            countryId,
            stateId,
            cityId,
            accountName,
            accountNumber,
          },
        });

        this.setState(() => ({
          updateDetails: false,
        }));
      }
    }
  }

  render() {
    const { state, props } = this;

    const {
      sessionUser, profile,
    } = props;

    const userDetails = profile.details;

    // If user wants to edit his or her profile
    if (state.updateDetails) {
      const { updateForm } = state;
      const countriesOptions = [
        <option
          value="-placeholder-"
          disabled
        >Select Country
        </option>,
        ...(props.getCountries().map((country) => (
          <option value={country.id}>
            {country.value}
          </option>
        ))),
      ];

      let statesOptions = [
        <option
          value="-placeholder-"
          disabled
        >Select State
        </option>,
      ];

      let stateIdValue = state.updateForm.stateId ? state.updateForm.stateId : '-placeholder-';

      if (profile.statesOptions === 'loading') {
        statesOptions = [
          <option
            value="-placeholder-"
            disabled
          >Please wait...
          </option>,
        ];
        stateIdValue = '-placeholder-';
      } else if (profile.statesOptions) {
        statesOptions.push(...profile.statesOptions);
      }

      let citiesOptions = [
        <option
          value="-placeholder-"
          disabled
        >Select City
        </option>,
      ];

      let cityIdValue = state.updateForm.cityId ? state.updateForm.cityId : '-placeholder-';

      if (profile.citiesOptions === 'loading') {
        citiesOptions = [
          <option
            value="-placeholder-"
            disabled
          >Please wait...
          </option>,
        ];
        cityIdValue = '-placeholder-';
      } else if (profile.citiesOptions) {
        citiesOptions.push(...profile.citiesOptions);
      }

      return (
        <div id="userDetails" className="edit">
          <div className="user-detail">
            <p className="label"> company name
              {updateForm.companyNameError !== false
                ? (
                  <span className="error"> : {updateForm.companyNameError} </span>
                ) : ''}
            </p>
            <input
              className="detail"
              value={updateForm.companyName}
              onChange={(e) => {
                const companyName = e.target.value;
                this.regField('companyName', companyName);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label"> bio
              {updateForm.bioError !== false
                ? (
                  <span className="error"> : {updateForm.bioError} </span>
                ) : ''}
            </p>
            <textarea
              className="detail"
              value={updateForm.bio}
              onChange={(e) => {
                const bio = e.target.value;
                this.regField('bio', bio);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">
                email
              {updateForm.emailError !== false
                ? (
                  <span className="error"> : {updateForm.emailError} </span>
                ) : ''}
            </p>
            <input
              className="detail"
              value={updateForm.email}
              onChange={(e) => {
                const email = e.target.value;
                this.regField('email', email);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">
                mobile number
              {updateForm.mobileNumberError !== false
                ? (
                  <span className="error"> : {updateForm.mobileNumberError} </span>
                ) : ''}
            </p>
            <input
              className="detail"
              value={updateForm.mobileNumber}
              onChange={(e) => {
                const mobileNumber = e.target.value;
                this.regField('mobileNumber', mobileNumber);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">
                Country
              {updateForm.countryIdError !== false
                ? (
                  <span className="error"> : {updateForm.countryIdError} </span>
                ) : ''}
            </p>
            <select
              className="detail"
              value={state.updateForm.countryId}
              onChange={(e) => {
                const countryId = e.target.value;
                this.regField('countryId', countryId);
                this.getStates(countryId);
              }}
            >
              {countriesOptions}
            </select>
          </div>

          <div className="user-detail">
            <p className="label">
                State
              {updateForm.stateIdError !== false
                ? (
                  <span className="error"> : {updateForm.stateIdError} </span>
                ) : ''}
            </p>
            <select
              className="detail"
              value={stateIdValue}
              onChange={(e) => {
                const stateId = e.target.value;
                this.regField('stateId', stateId);
                this.getCitites(stateId);
              }}
            >
              {statesOptions}
            </select>
          </div>

          <div className="user-detail">
            <p className="label">
                City
              {updateForm.cityIdError !== false
                ? (
                  <span className="error"> : {updateForm.cityIdError} </span>
                ) : ''}
            </p>
            <select
              className="detail"
              value={cityIdValue}
              onChange={(e) => {
                const cityId = e.target.value;
                this.regField('cityId', cityId);
              }}
            >
              {citiesOptions}
            </select>
          </div>

          <div className="user-detail">
            <p className="label">account name
              {updateForm.accountNameError !== false
                ? (
                  <span className="error"> : {updateForm.accountNameError} </span>
                ) : ''}
            </p>
            <input
              type="text"
              className="detail"
              value={updateForm.accountName}
              onChange={(e) => {
                const accountName = e.target.value;
                this.regField('accountName', accountName);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">account number
              {updateForm.accountNumberError !== false
                ? (
                  <span className="error"> : {updateForm.accountNumberError} </span>
                ) : ''}
            </p>
            <input
              type="text"
              className="detail"
              value={updateForm.accountNumber}
              onChange={(e) => {
                const accountNumber = e.target.value;
                this.regField('accountNumber', accountNumber);
              }}
            />
          </div>


          <div className="actions">
            <button
              type="button"
              className="btn btn-glass"
              onClick={() => {
                this.updateDetails(false);
              }}
            >Cancel
            </button>

            <button
              type="button"
              className={`ps-btn ps-btn--black btn${updateForm.submitting ? ' disabled' : ''}`}
              onClick={this.submit}
            >Submit
            </button>
          </div>
        </div>
      );
    }

    return (
      <div id="userDetails">
        <div className="user-detail">
          <p className="label">company name</p>
          <p className="detail">{userDetails.companyName}</p>
        </div>

        <div className="user-detail">
          <p className="label">bio</p>
          <p className="detail">{userDetails.bio}</p>
        </div>

        <div className="user-detail">
          <p className="label">email</p>
          <p className="detail">{userDetails.email}</p>
        </div>

        <div className="user-detail">
          <p className="label">mobile number</p>
          <p className="detail">{userDetails.mobileNumber}</p>
        </div>

        <div className="user-detail">
          <p className="label">country</p>
          <p className="detail">{userDetails.country}</p>
        </div>

        <div className="user-detail">
          <p className="label">state</p>
          <p className="detail">{userDetails.state}</p>
        </div>

        <div className="user-detail">
          <p className="label">city</p>
          <p className="detail">{userDetails.city}</p>
        </div>

        <div className="user-detail">
          <p className="label">account name</p>
          <p className="detail">{userDetails.accountName}</p>
        </div>

        <div className="user-detail">
          <p className="label">account number</p>
          <p className="detail">{userDetails.accountNumber}</p>
        </div>

        <button
          type="button"
          className="ps-btn ps-btn--black btn"
          onClick={this.updateDetails}
        >Update details
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default connect(mapStateToProps)(AccountDetails);
