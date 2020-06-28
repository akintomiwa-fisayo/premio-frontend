import React from 'react';
import { Checkbox, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, resetNav, changeNav,
} from '../../store/setting/action';
import { isEmail, isEmpty } from '../../lib/js';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'email',
      timer: {
        minutes: 0,
        seconds: 59,
      },
      email: '',
      emailError: false,
      submittingEmail: false,
      token: '',
      tokenError: false,
      submittingToken: false,
    };

    this._isMounted = null;
    this.timerHandler = null;
    this.startTimerCount = this.startTimerCount.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.changeStep = this.changeStep.bind(this);
    // this.sendToken = this.sendToken.bind(this);
    this.sendVerificationToken = this.sendVerificationToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'forgot password',
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

  startTimerCount() {
    this.setState(() => ({
      timer: {
        minutes: 4,
        seconds: 59,
      },
    })); this.timerHandler = setInterval(this.timerCount, 1000);
  }

  timerCount() {
    const { state } = this;
    let seconds = state.timer.seconds - 1;
    let { minutes } = state.timer;

    if (seconds === 0) {
      seconds = 59;
      minutes -= 1;
      if (minutes === -1) clearInterval(this.timerHandler);
    }

    this.setState(() => ({
      timer: {
        minutes,
        seconds,
      },
    }));
  }

  changeStep(step) {
    if (step === 'token') {
      this.startTimerCount();
    } else {
      clearInterval(this.timerHandler);
    }
    this.setState(() => ({
      step,
    }));
  }

  sendVerificationToken() {
    const { email, submittingEmail } = this.state;
    if (!isEmail(email)) {
      this.setState({ emailError: 'invalid email' });
    } else if (!submittingEmail) {
      this.setState({ submittingEmail: true });

      this.props.FetchRequest({
        url: `${process.env.REACT_APP_API}/auth/reset_password`,
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(() => {
        if (this._isMounted) {
          this.changeStep('token');
          this.setState({ submittingEmail: false });
        }
      }).catch((err) => {
        if (this._isMounted) {
          const { error } = err.response.data;
          const stateError = {
            submittingEmail: false,
          };

          if (error.email) {
            stateError.emailError = error.email;
          }

          this.setState(stateError);
        }
      });
    }
  }

  verifyToken() {
    const { token, email, submittingToken } = this.state;
    if (!isEmpty(token) && !submittingToken) {
      this.setState({ submittingToken: true });

      this.props.FetchRequest({
        url: `${process.env.REACT_APP_API}/auth/reset_password/verify_token`,
        method: 'PATCH',
        body: JSON.stringify({
          token,
          email,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(() => {
        this.setState({ submittingToken: false });
        this.props.history.push(`/change-password?email=${email}&token=${token}`);
      }).catch((err) => {
        if (this._isMounted) {
          const { error } = err.response.data;
          const stateError = {
            submittingToken: false,
          };

          if (error.token) {
            stateError.tokenError = error.token;
          }

          this.setState(stateError);
        }
      });
    }
  }


  render() {
    const { state } = this;

    if (state.step === 'token') {
      const { seconds } = state.timer;
      const { minutes } = state.timer;
      let allowResendToken = false;
      let timer = '';
      if (minutes === -1) {
        allowResendToken = true;
      } else {
        const secondsArr = `${seconds}`.split('');
        if (!secondsArr[1]) {
          secondsArr.unshift(0);
        }

        timer = <span className="timer">{minutes} : {secondsArr.join(' ')}</span>;
      }

      return (
        <div id="forgotPasswordComp">
          <div id="content">
            <p>A verification token was sent to <b>{state.email}</b></p>
            <InputField
              label={(
                <>Token
                  {state.tokenError !== false
                    ? (
                      <span className="error">
                        : {state.tokenError}
                      </span>
                    ) : ''}
                </>
              )}
              type="text"
              value={state.token}
              onChange={(token) => {
                this.setState((prev) => ({
                  token,
                  tokenError: !isEmpty(token) ? false : prev.tokenError,
                }));
              }}
            />
            <p id="changeEmail">
              If you  this is email is not yours please <span onClick={() => this.changeStep('email')}>change email </span>
            </p>

            <button
              id="resendToken"
              type="button"
              className={`btn ${allowResendToken ? '' : ' disabled'}`}
              onClick={() => {
                if (allowResendToken) this.sendVerificationToken();
              }}
            >
              Resend token {timer}
            </button>
            <button
              type="button"
              className={`btn btn-default${state.submittingToken ? ' disabled' : ''}`}
              onClick={this.verifyToken}
            >Verify token
            </button>
          </div>
        </div>
      );
    }

    return (
      <div id="forgotPasswordComp">
        <div id="content">
          {/* <img id="logo" src={logo} alt="logo" /> */}
          <p>A verification token will be sent to your email</p>
          <InputField
            label={(
              <>Email
                {state.emailError !== false
                  ? (
                    <span className="error">
                        : {state.emailError}
                    </span>
                  ) : ''}
              </>
            )}
            type="text"
            id="email"
            value={state.email}
            onChange={(email) => {
              this.setState((prev) => ({
                email,
                emailError: isEmail(email) ? false : prev.emailError,
              }));
            }}
          />

          <button
            type="button"
            className={`btn btn-default ${state.submittingEmail ? ' disabled' : ''}`}
            onClick={this.sendVerificationToken}
          >Send token
          </button>

        </div>
      </div>
    );
  }
}

export default connect()(ForgotPassword);
