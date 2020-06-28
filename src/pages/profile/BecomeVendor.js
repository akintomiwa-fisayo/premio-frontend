import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../lib/js';

class BecomeVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      companyNameError: false,
      bio: '',
      bioError: false,
      accountName: '',
      accountNameError: false,
      accountNumber: '',
      accountNumberError: false,
      submitting: false,
    };

    this._isMounted = false;
    this.validateField = this.validateField.bind(this);
    this.regField = this.regField.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // eslint-disable-next-line class-methods-use-this
  validateField(field, value) {
    const error = {};

    error[`${field}Error`] = isEmpty(value) ? 'can\'t be empty' : false;
    if (field === 'accountNumber' && !isEmpty(value)) {
      error[`${field}Error`] = isNaN(value) ? 'not a valid number' : false;
    }

    return error;
  }

  regField(field, value) {
    this.setState({
      [field]: value,
      ...this.validateField(field, value),
    });
  }

  submit() {
    const { props, state } = this;
    const { sessionUser } = props;
    const {
      companyName,
      bio,
      accountName,
      accountNumber,
    } = state;

    if (!state.submitting) {
      const validateFields = () => {
        const fields = {
          companyName,
          bio,
          accountName,
          accountNumber,
        };

        let errors = {};

        Object.keys(fields).forEach((key) => {
          errors = {
            ...errors,
            ...this.validateField(key, fields[key]),
          };
        });

        this.setState({
          ...errors,
        });

        for (const key in errors) {
          if (errors[key] !== false) {
            return false;
          }
        }

        return true;
      };

      if (validateFields()) {
        this.setState({ submitting: true });
        console.log('made it all through man');
        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/become_vendor`,
          method: 'POST',
          body: JSON.stringify({
            companyName,
            bio,
            accountName,
            accountNumber,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          console.log('login response : ', res);
          if (this._isMounted) {
            const { regId } = res;
            props.setInfo({
              details: {
                ...props.profileDetails,
                ...res.vendor,
              },
            });
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
    const { state } = this;
    const { setting, onClose } = this.props;
    const { header, nav } = setting;
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
          <div className="header">Become a vendor</div>

          <div className="user-detail">
            <p className="label">company name
              {state.companyNameError !== false
                ? (
                  <span className="error"> : {state.companyNameError} </span>
                ) : ''}
            </p>
            <input
              type="text"
              className="detail"
              onChange={(e) => {
                const { value } = e.target;
                this.regField('companyName', value);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">bio
              {state.bioError !== false
                ? (
                  <span className="error"> : {state.bioError} </span>
                ) : ''}
            </p>
            <textarea
              type="text"
              className="detail"
              onChange={(e) => {
                const { value } = e.target;
                this.regField('bio', value);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">account name
              {state.accountNameError !== false
                ? (
                  <span className="error"> : {state.accountNameError} </span>
                ) : ''}
            </p>
            <input
              type="text"
              className="detail"
              onChange={(e) => {
                const { value } = e.target;
                this.regField('accountName', value);
              }}
            />
          </div>

          <div className="user-detail">
            <p className="label">account number
              {state.accountNumberError !== false
                ? (
                  <span className="error"> : {state.accountNumberError} </span>
                ) : ''}
            </p>
            <input
              type="text"
              className="detail"
              onChange={(e) => {
                const { value } = e.target;
                this.regField('accountNumber', value);
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
              className={`ps-btn ps-btn--black btn${state.submitting ? ' disabled' : ''}`}
              onClick={this.submit}
            >Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(BecomeVendor);
