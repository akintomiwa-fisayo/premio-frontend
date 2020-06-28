import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  resetHeader, changeHeader, changeNav, resetNav,
} from '../../store/setting/action';

class ConfirmSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: {
        minutes: 0,
        seconds: 59,
      },
      code: '',
      codeError: false,
      submitting: false,
    };

    this._isMounted = false;
    this.timerHandler = null;
    this.regCode = this.regCode.bind(this);
    this.startTimerCount = this.startTimerCount.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
    this.resendCode = this.resendCode.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(changeHeader({
      show: false,
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));

    this.startTimerCount();
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
    }));
    this.timerHandler = setInterval(this.timerCount, 1000);
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

  regCode(code) {
    if (code.length <= 8) {
      this.setState({
        code,
        codeError: false,
      });
      if (code.length === 8) {
        this.confirmSignUp(code);
      }
    }
  }

  confirmSignUp(code = false) {
    const { state, props } = this;
    const { signUp } = props;
    if (!state.submitting) {
      this.setState({
        submitting: true,
      });

      props.FetchRequest({
        url: `${process.env.REACT_APP_API}/auth/register/${signUp.regId}/finalize`,
        method: 'POST',
        body: JSON.stringify({
          token: code || state.code,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (this._isMounted) {
          const { user } = res.data.data;
          const { token, ...User } = user;
          localStorage.setItem('sessionUserToken', token);
          localStorage.setItem('sessionUserId', User.id);
          props.setSessionUser(User);
          this.props.history.push('/home');
        }
      }).catch((err) => {
        if (this._isMounted) {
          const { error } = err.data;
          const newState = {
            code: '',
            submitting: false,
          };

          if (error.token) {
            newState.codeError = 'incorrect';
          }


          this.setState(newState);
        }
      });
    }
  }

  resendCode() {
    const { props } = this;
    const { signUp } = props;
    this.startTimerCount();
    props.FetchRequest({
      url: `${process.env.REACT_APP_API}/auth/register/${signUp.regId}/resendCode`,
      method: 'POST',
    });
  }

  render() {
    const { state } = this;
    const { signUp } = this.props;

    const { seconds } = state.timer;
    const { minutes } = state.timer;
    let allowResendCode = false;
    let timer = '';
    if (minutes === -1) {
      allowResendCode = true;
    } else {
      const secondsArr = `${seconds}`.split('');
      if (!secondsArr[1]) {
        secondsArr.unshift(0);
      }

      timer = <span className="timer">{minutes} : {secondsArr.join(' ')}</span>;
    }

    return (
      <div id="confirmSignupComp">
        <div id="content">
          <img id="logo" src={logo} alt="logo" />
          <p>A verification code was sent to <b>{signUp.form.email}</b></p>
          <InputField
            label={(
              <>
                Code
                {state.codeError !== false
                  ? <span className="error"> : {state.codeError}</span>
                  : ''}
              </>
            )}
            value={state.code}
            disabled={state.submitting}
            type="text"
            onChange={this.regCode}
          />
          <p id="changeEmail">
            if this is email is not yours please <Link to="/sign-up">change email</Link>
          </p>
          <button
            id="resendCode"
            type="button"
            className={`btn ${allowResendCode ? '' : ' disabled'}`}
            onClick={() => {
              if (allowResendCode) this.resendCode();
            }}
          >
            Resend code {timer}
          </button>

          <button
            id="submit"
            type="button"
            className={`btn btn-default${state.submitting ? ' disabled' : ''}`}
          >
            Verify code
            {
              state.submitting
                ? <span className="fa fa-spin fa-spinner icon" />
                : ''
            }
          </button>
        </div>
      </div>
    );
  }
}

ConfirmSignUp.propTypes = {
  FetchRequest: PropTypes.func.isRequired,
  setSessionUser: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  signUp: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  signUp: state.auth.signUp,
});

export default connect(mapStateToProps)(ConfirmSignUp);
