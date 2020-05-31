import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, changeNav, resetNav,
} from '../../store/setting/action';

import { alert } from '../../lib/js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this._isMounted = false;
    this.changeState = this.changeState.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(changeHeader({
      show: false,
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.dispatch(resetHeader());
    this.props.dispatch(resetNav());
  }

  changeState(props) {
    this.setState(() => (props));
  }

  submit() {
    const { props } = this;
    const { email, password } = this.state;

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/auth/login`,
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (this._isMounted) {
        localStorage.setItem('sessionUserToken', res.token);
        localStorage.setItem('sessionUserId', res.id);
        this.props.history.push('/home');
      }
    }).catch(({ data: { error } }) => {
      if (this._isMounted) {
        if (error === 'Incorrect email or password') {
          alert(
            'Login Failed',
            'Username or Password invalid',
            [{
              text: 'ok',
            }],
          );
        } else {
          alert(
            'Login Failed',
            'Please try again',
            [{
              text: 'ok',
            }],
          );
        }
      }
    });
  }

  render() {
    return (
      <div id="signinComp">
        <div id="content">
          <img id="logo" src={logo} alt="logo" />
          <InputField
            label="Email"
            type="text"
            onChange={(value) => {
              this.changeState({
                email: value,
              });
            }}
          />
          <InputField
            label="Password"
            type="password"
            onChange={(value) => {
              this.changeState({
                password: value,
              });
            }}
          />
          <p id="forgotPassword">
            <Link to="/forgot-password"> Forgot Password? </Link>
          </p>

          <button
            type="button"
            className="btn btn-default"
            onClick={this.submit}
          >SIGN IN
          </button>

          <p id="register">Don't have an account yet? <Link to="/sign-up">Register Now</Link></p>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SignIn);
