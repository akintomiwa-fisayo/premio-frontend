import React from 'react';
import { Checkbox, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, resetNav, changeNav,
} from '../../store/setting/action';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'sign up',
      onGoBack: () => {
        this.props.history.push('/sign-in');
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

  submit() {
    this.props.history.push('/confirm-sign-up');
  }

  render() {
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
            label="Date of Birth"
            type="date"
          />
          <div id="terms&cond">
            <Checkbox style={{ marginRight: '1em' }} />
            <span>You have to agree to our <NavLink to="#">terms and conditions</NavLink></span>
          </div>

          <button type="button" className="btn btn-default" onClick={this.submit}>CONTINUE</button>
        </div>
      </div>
    );
  }
}

export default connect()(SignUp);
