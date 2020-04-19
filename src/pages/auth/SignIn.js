import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, changeNav, resetNav,
} from '../../store/setting/action';

class Login extends React.Component {
  componentDidMount() {
    this.props.dispatch(changeHeader({
      show: false,
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
    this.props.dispatch(resetNav());
  }

  render() {
    return (
      <div id="signinComp">
        <div id="content">
          <img id="logo" src={logo} alt="logo" />
          <InputField
            label="Username"
            type="text"
          />
          <InputField
            label="Password"
            type="password"
          />
          <p id="forgotPassword">
            <Link to="/forgot-password"> Forgot Password? </Link>
          </p>

          <Link to="/mode-selector" id="signIn">
            <button type="button" className="btn btn-default">SIGN IN</button>
          </Link>
          <p id="register">Don't have an account yet? <Link to="/sign-up">Register Now</Link></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Login);
