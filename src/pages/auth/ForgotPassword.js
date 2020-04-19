import React from 'react';
import { Checkbox, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, resetNav, changeNav,
} from '../../store/setting/action';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'email',
      timer: {
        minutes: 0,
        seconds: 59,
      },
    };

    this.timerHandler = null;
    this.startTimerCount = this.startTimerCount.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.resendCode = this.resendCode.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      noUser: true,
      label: 'forgot password',
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
    if (step === 'code') {
      this.startTimerCount();
    } else {
      clearInterval(this.timerHandler);
    }
    this.setState(() => ({
      step,
    }));
  }

  sendCode() {

  }

  verifyCode() {
    this.props.history.push('/change-password');
  }

  resendCode() {
    this.sendCode();
    this.startTimerCount();
  }

  render() {
    const { state } = this;

    if (state.step === 'code') {
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
        <div id="forgotPasswordComp">
          <div id="content">
            <p>A verification code was sent to <b>theEmail@add.com</b></p>
            <InputField
              label="Code"
              type="text"
            />
            <p id="changeEmail">
              If you  this is email is not yours please <span onClick={() => this.changeStep('email')}>change email </span>
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
              type="button"
              className="btn btn-default"
              onClick={this.verifyCode}
            >Verify code
            </button>
          </div>
        </div>
      );
    }

    return (
      <div id="forgotPasswordComp">
        <div id="content">
          {/* <img id="logo" src={logo} alt="logo" /> */}
          <p>A verification code will be sent to your email</p>
          <InputField
            label="Email"
            type="text"
            id="email"
          />

          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.changeStep('code')}
          >Send code
          </button>

        </div>
      </div>
    );
  }
}

export default connect()(ForgotPassword);
