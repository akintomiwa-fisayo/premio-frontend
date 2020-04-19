import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'antd-mobile';
import { List } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../../components/partials/account/ChangePassword';
import BecomeVendor from '../../components/partials/account/BecomeVendor';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateDetails: false,
      changePassword: false,
    };

    this.updateDetails = this.updateDetails.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.becomeVendor = this.becomeVendor.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'Account',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  updateDetails(updateDetails = true) {
    this.setState(() => ({
      updateDetails,
    }
    ));
  }

  changePassword(changePassword = true) {
    this.setState(() => ({
      changePassword,
    }));
  }

  becomeVendor(becomeVendor = true) {
    this.setState(() => ({
      becomeVendor,
    }));
  }

  render() {
    const { state } = this;
    const { header, nav } = this.props;
    let userDetails = (
      <div id="userDetails">
        <div className="user-detail">
          <p className="label">first name</p>
          <p className="detail">akintomiwa</p>
        </div>

        <div className="user-detail">
          <p className="label">last name</p>
          <p className="detail">fisayo</p>
        </div>

        <div className="user-detail">
          <p className="label">email</p>
          <p className="detail">akintomiwa.fisayo@gmail.com</p>
        </div>

        <button
          type="button"
          className="ps-btn ps-btn--black btn"
          onClick={this.updateDetails}
        >Update details
        </button>
      </div>
    );

    if (state.updateDetails) {
      userDetails = (
        <div id="userDetails">
          <div className="user-detail">
            <p className="label">first name</p>
            <input className="detail" defaultValue="Akintomiwa" />
          </div>

          <div className="user-detail">
            <p className="label">last name</p>
            <input className="detail" defaultValue="fisayo" />
          </div>

          <div className="user-detail">
            <p className="label">email</p>
            <input className="detail" defaultValue="Akintomiwa.fisayo@gmail.com" />
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn btn-glass"
              onClick={() => {
                this.updateDetails(false);
              }}
            >Cancel
            </button>

            <button
              type="button"
              className="ps-btn ps-btn--black btn"
            >Submit
            </button>
          </div>
        </div>
      );
    }

    return (
      <section
        className="ps-my-account ps-page--account ps-container"
        style={{
          minHeight: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div className="ps-widget__header">
          <img src="/static/img/users/3.jpg" alt="" />
          <figure>
            <figcaption>Hello!</figcaption>
            <p>Akintomiwa fisayo</p>
          </figure>
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn btn-glass"
            onClick={this.changePassword}
          >Change password
          </button>
          <button
            type="button"
            className="btn btn-glass"
            onClick={this.becomeVendor}
          >Become a vendor
          </button>
        </div>

        <div className="ps-widget__content">
          <div className="header">Account Details</div>
          {userDetails}
        </div>

        <button
          type="button"
          className="btn log-out"
        >Log out
        </button>
        {state.changePassword
          ? (
            <ChangePassword
              {...this.props}
              onClose={() => {
                this.changePassword(false);
              }}
            />
          ) : ''}
        {state.becomeVendor
          ? (
            <BecomeVendor
              {...this.props}
              onClose={() => {
                this.becomeVendor(false);
              }}
            />
          ) : ''}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(MyAccount);
