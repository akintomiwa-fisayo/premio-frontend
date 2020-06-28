import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import { isEmpty } from '../../lib/js';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordError: false,
      newPassword: '',
      newPasswordError: false,
      confirmNewPassword: '',
      confirmNewPasswordError: false,
      submitting: false,
    };

    this._isMounted = false;
    this.regField = this.regField.bind(this);
    this.validateField = this.validateField.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  regField(field, value) {
    this.setState({
      [field]: value,
      ...this.validateField(field, value),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validateField(field, value) {
    const { state } = this;
    const error = {};
    if (field === 'password') {
      error[`${field}Error`] = isEmpty(value) ? 'can\'t be empty' : false;
    } else if (field === 'newPassword') {
      error.newPasswordError = (value.length < 8) ? 'needs to be atleast 8 characters long' : false;
      error.confirmNewPasswordError = value !== state.confirmNewPassword ? 'does not match new password' : false;
    } else if (field === 'confirmNewPassword') {
      error[`${field}Error`] = value !== state.newPassword ? 'does not match new password' : false;
    }
    return error;
  }

  submit() {
    const { props, state } = this;
    const { sessionUser } = props;

    if (!state.submitting) {
      const {
        password,
        newPassword,
        confirmNewPassword,
      } = state;

      const validateFields = () => {
        const fields = {
          password,
          newPassword,
          confirmNewPassword,
        };

        let errors = {};

        Object.keys(fields).forEach((key) => {
          errors = {
            ...errors,
            ...this.validateField(key, fields[key]),
          };
        });

        this.setState(errors);

        for (const key in errors) {
          if (errors[key] !== false) {
            return false;
          }
        }

        return true;
      };

      if (validateFields()) {
        this.setState({
          submitting: true,
        });

        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/password`,
          method: 'PATCH',
          body: JSON.stringify({
            password,
            newPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          console.log('user update response : ', res);
          if (this._isMounted) {
            localStorage.setItem('sessionUserToken', res.token);
            props.onClose();
          }
        }).catch((err) => {
          if (this._isMounted) {
            const reqFormError = {};
            const { error } = err.data;
            Object.keys(error).forEach((key) => {
              reqFormError[`${key}Error`] = error[key];
            });

            this.setState({
              ...reqFormError,
              submitting: false,
            });
          }
        });
      }
    }
  }

  render() {
    const { setting, onClose } = this.props;
    const { header, nav } = setting;
    const {
      password,
      passwordError,
      newPassword,
      newPasswordError,
      confirmNewPassword,
      confirmNewPasswordError,
      submitting,
    } = this.state;

    return (
      <div
        id="changePassword"
        style={{
          height: `calc(100vh - ${header.height + nav.height}px)`,
          top: `${header.height}px`,
        }}
        onClick={onClose}
      >
        <div className="content" onClick={(e) => { e.stopPropagation(); }}>
          <div className="header">Change Password</div>

          <div className="user-detail">
            <p className="label"> password
              {passwordError !== false
                ? (
                  <span className="error"> : {passwordError} </span>
                ) : ''}
            </p>
            <input
              type="password"
              className="detail"
              value={password}
              onChange={(e) => {
                const { value } = e.target;
                this.regField('password', value);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">new password
              {newPasswordError !== false
                ? (
                  <span className="error"> : {newPasswordError} </span>
                ) : ''}
            </p>
            <input
              type="password"
              className="detail"
              value={newPassword}
              onChange={(e) => {
                const { value } = e.target;
                this.regField('newPassword', value);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">confirm password
              {confirmNewPasswordError !== false
                ? (
                  <span className="error"> : {confirmNewPasswordError} </span>
                ) : ''}
            </p>
            <input
              type="password"
              className="detail"
              value={confirmNewPassword}
              onChange={(e) => {
                const { value } = e.target;
                this.regField('confirmNewPassword', value);
              }}
            />
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn btn-glass"
              onClick={onClose}
            >Cancel
            </button>

            <button
              type="button"
              className={`ps-btn ps-btn--black btn${submitting ? ' disabled' : ''}`}
              onClick={this.submit}
            >Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ChangePassword);
