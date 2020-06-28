import React from 'react';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import {
  changeHeader, resetHeader, changeNav, resetNav,
} from '../../store/setting/action';
import { parseQueryString, alert } from '../../lib/js';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    const queryString = parseQueryString(props.location.search);
    this.state = {
      email: queryString.email,
      token: queryString.token,
      password: '',
      passwordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
      submitting: false,
    };

    this._isMounted = false;
    this.validatePassword = this.validatePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'change password',
      onGoBack: () => {
        this.props.history.push('/');
      },
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

  validatePassword(value) {
    return value.length >= 8;
  }

  submit() {
    const { state, props } = this;
    if (!state.submitting) {
      const {
        password, confirmPassword, email, token,
      } = state;
      const validate = () => {
        let isValid = true;
        const error = {};
        if (!this.validatePassword(state.password)) {
          isValid = false;
          error.passwordError = 'must be atleast 8 characters long';
        }

        if (confirmPassword !== password) {
          isValid = false;
          error.confirmPasswordError = 'does not match your password';
        }

        if (!isValid) {
          this.setState(error);
        }

        return isValid;
      };

      if (validate()) {
        props.FetchRequest({
          url: `${process.env.REACT_APP_API}/auth/reset_password`,
          method: 'PATCH',
          body: JSON.stringify({
            email,
            token,
            newPassword: password,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        }).then((res) => {
          if (this._isMounted) {
            const { user } = res.data.data;
            localStorage.setItem('sessionUserToken', user.token);
            localStorage.setItem('sessionUserId', user.id);
            this.props.setSessionUser(user);
            this.props.history.push('/home');
          }
        }).catch((err) => {
          if (this._isMounted) {
            const { error } = err.response.data;

            if (error.token) {
              alert('Token Error', error.token, [{ text: 'ok' }]);
            }

            this.setState({
              submitting: false,
            });
          }
        });
      }
    }
  }

  render() {
    const { state } = this;
    return (
      <div id="signupComp">

        <div id="content">
          {/* <img id="logo" src={logo} alt="logo" /> */}
          <InputField
            type="password"
            label={(
              <>New password
                {state.passwordError !== false
                  ? (
                    <span className="error">
                        : {state.passwordError}
                    </span>
                  ) : ''}
              </>
              )}
            value={state.password}
            onChange={(password) => {
              this.setState((prev) => ({
                password,
                passwordError: !this.validatePassword(password) ? false : prev.passwordError,
              }));
            }}
          />
          <InputField
            type="password"
            label={(
              <>Confirm password
                {state.confirmPasswordError !== false
                  ? (
                    <span className="error">
                        : {state.confirmPasswordError}
                    </span>
                  ) : ''}
              </>
              )}
            value={state.confirmPassword}
            onChange={(confirmPassword) => {
              this.setState((prev) => ({
                confirmPassword,
                confirmPasswordError: confirmPassword === prev.password ? false : 'does not match your password',
              }));
            }}
          />

          <button
            type="button"
            className={`btn btn-default${state.submitting ? ' disabled' : ''}`}
            onClick={this.submit}
          >Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(ChangePassword);
