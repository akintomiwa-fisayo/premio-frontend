import React from 'react';
import { Checkbox, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, resetNav, changeNav,
} from '../../store/setting/action';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: '',
        countryId: '',
        stateId: '',
        city: '',
      },
      submitting: false,
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'sign up',
      onGoBack: () => {
        this.props.history.push('/');
      },
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
    this.props.dispatch(resetNav());
  }

  regField(props) {
    this.setState((prev) => ({
      form: {
        ...prev.form,
        ...props,
      },
    }));
  }

  getStates(countryId) {
    const { props } = this;
    props.getCountryStates(countryId).then((states) => {
      console.log('OUR STATE IS : ', states);
    });
  }


  submit() {
    this.props.history.push('/confirm-sign-up');
  }

  render() {
    const { props, state } = this;
    const { form } = state;

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

    if (form.stateId === 'loading') {
      states = [{
        value: '-placeholder-',
        label: 'Please wait...',
        defaultValue: true,
        disabled: true,
      }];
    }

    return (
      <div id="signupComp">

        <div id="content">
          {/* <img id="logo" src={logo} alt="logo" /> */}
          <InputField
            label="First Name"
            type="text"
          />
          <InputField
            label="Last Name"
            type="text"
          />
          <InputField
            label="Email"
            type="text"
          />
          <InputField
            label="Mobile Number"
            type="number"
          />
          <InputField
            label="Date of Birth"
            type="date"
          />
          <InputField
            label="Country"
            type="select"
            value={form.countryId}
            options={countries}
            onChange={(countryId) => {
              this.regField({
                countryId,
                stateId: 'loading',
              });

              this.getStates(countryId);
            }}
          />
          <InputField
            label="State"
            type="select"
            options={states}
          />
          <InputField
            label="City"
            type="select"
            options={[
              { value: '1' },
              { value: '2' },
              { value: '3' },
              { value: '4' },
              { value: '5' },
            ]}
          />
          <div id="terms&cond">
            <Checkbox style={{ marginRight: '1em' }} />
            <span>You have to agree to our <Link to="#">terms and conditions</Link></span>
          </div>

          <button type="button" className="btn btn-default" onClick={this.submit}>CONTINUE</button>
          <div id="switcher">
            <span>or</span>
            <p><Link to="/">Sign In</Link>, if you already have an account</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SignUp);
