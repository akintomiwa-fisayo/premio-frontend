import React from 'react';
import { Checkbox, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, changeNav, resetNav,
} from '../../store/setting/action';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'change password',
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
    this.props.history.push('/sign-in');
  }

  render() {
    return (
      <div id="signupComp">

        <div id="content">
          {/* <img id="logo" src={logo} alt="logo" /> */}
          <InputField
            label="New password"
            type="password"
          />
          <InputField
            label="Confirm password"
            type="password"
          />

          <button type="button" className="btn btn-default" onClick={this.submit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default connect()(ChangePassword);
