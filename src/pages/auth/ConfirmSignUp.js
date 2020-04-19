import React from 'react';
import { Checkbox, Input } from 'antd';
import { NavLink } from 'react-router-dom';
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
    };

    this.timerHandler = null;
    this.startTimerCount = this.startTimerCount.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.resendCode = this.resendCode.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      show: false,
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));

    this.startTimerCount();
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

  sendCode() {

  }

  resendCode() {
    this.sendCode();
    this.startTimerCount();
  }

  render() {
    const { state } = this;

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
          <p>A verification code was sent to <b>theEmail@add.com</b></p>
          <InputField
            label="Code"
            type="text"
          />
          <p id="changeEmail">
            if this is email is not yours please <NavLink to="/sign-up">change email</NavLink>
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
          >Verify code
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(ConfirmSignUp);
