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
      submitting: false,
    };

    this._isMounted = false;
    this.changeState = this.changeState.bind(this);
    this.preventBack = this.preventBack.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // window.addEventListener('popstate', this.preventBack);
    this.props.dispatch(changeHeader({
      show: false,
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));

    if (this.props.store.auth.user) {
      this.props.history.push('/home');
    }
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.props.dispatch(resetHeader());
    this.props.dispatch(resetNav());
    // window.removeEventListener('popstate', this.preventBack);
  }

  // eslint-disable-next-line class-methods-use-this
  preventBack() {
    // window.history.go(0);
  }

  changeState(props) {
    this.setState(() => (props));
  }

  submit() {
    const { props } = this;
    const { email, password, submitting } = this.state;


    if (!submitting) {
      this.setState({ submitting: true });
      props.FetchRequest({
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
          const { data } = res.data;
          localStorage.setItem('sessionUserToken', data.token);
          localStorage.setItem('sessionUserId', data.id);
          this.props.setSessionUser(data);
          this.props.history.push('/home');
        }
      }).catch((erroRes) => {
        console.log('REAL WEID ERRO', erroRes);
        const { error } = erroRes.response.data;
        if (this._isMounted) {
          this.setState({ submitting: false });

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
  }

  render() {
    const { state } = this;
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
            className={`btn btn-default${state.submitting ? ' disabled' : ''}`}
            onClick={this.submit}
          >
            SIGN IN
            {
              state.submitting
                ? <span className="fa fa-spin fa-spinner icon" />
                : ''
            }
          </button>

          <p id="register">Don't have an account yet? <Link to="/sign-up">Register Now</Link></p>
          <p id="register">Don't have an account yet? <p onClick={() => {
            this.props.history.push('/confirm-sign-up');
          }}
          >confrim Register Now
                                                      </p>
          </p>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  FetchRequest: PropTypes.func.isRequired,
  setSessionUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SignIn);
