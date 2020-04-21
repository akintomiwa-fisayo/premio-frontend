import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'antd-mobile';
import { List } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../../components/partials/account/ChangePassword';
import BecomeVendor from '../../components/partials/account/BecomeVendor';
import user3 from '../../public/static/img/users/3.jpg';
import user1 from '../../public/static/img/users/1.jpg';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateDetails: false,
      changePassword: false,
      client: false,
    };

    this.updateDetails = this.updateDetails.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.becomeVendor = this.becomeVendor.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    console.log('this props here is:', this.props);
    if (userId === 'client') {
      // alert('so wew true');
      this.setState(() => ({ client: true }));
    }
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

        <div className="user-detail">
          <p className="label">mobile number</p>
          <p className="detail">090734878478</p>
        </div>

        <div className="user-detail">
          <p className="label">city</p>
          <p className="detail">city</p>
        </div>

        <div className="user-detail">
          <p className="label">state</p>
          <p className="detail">state</p>
        </div>

        <div className="user-detail">
          <p className="label">country</p>
          <p className="detail">country</p>
        </div>

        {!state.client ? (
          <button
            type="button"
            className="ps-btn ps-btn--black btn"
            onClick={this.updateDetails}
          >Update details
          </button>
        ) : ''}
      </div>
    );

    if (!state.client && state.updateDetails) {
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

          <div className="user-detail">
            <p className="label">mobile number</p>
            <input className="detail" defaultValue="090734878478" />
          </div>

          <div className="user-detail">
            <p className="label">city</p>
            <select className="detail" defaultValue="null">
              <option value="null">city</option>
              <option value="1">option 1</option>
              <option value="2">option 2</option>
              <option value="3">option 3</option>
              <option value="4">option 4</option>
              <option value="5">option 5</option>
              <option value="6">option 6</option>
              <option value="7">option 7</option>
              <option value="8">option 8</option>
              <option value="9">option 9</option>
              <option value="10">option 10</option>
            </select>
          </div>

          <div className="user-detail">
            <p className="label">state</p>
            <select className="detail" defaultValue="null">
              <option value="null">state</option>
              <option value="1">option 1</option>
              <option value="2">option 2</option>
              <option value="3">option 3</option>
              <option value="4">option 4</option>
              <option value="5">option 5</option>
              <option value="6">option 6</option>
              <option value="7">option 7</option>
              <option value="8">option 8</option>
              <option value="9">option 9</option>
              <option value="10">option 10</option>
            </select>
          </div>

          <div className="user-detail">
            <p className="label">country</p>
            <select className="detail" defaultValue="null">
              <option value="null">country</option>
              <option value="1">option 1</option>
              <option value="2">option 2</option>
              <option value="3">option 3</option>
              <option value="4">option 4</option>
              <option value="5">option 5</option>
              <option value="6">option 6</option>
              <option value="7">option 7</option>
              <option value="8">option 8</option>
              <option value="9">option 9</option>
              <option value="10">option 10</option>
            </select>
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
        id="myAccount"
        className="ps-my-account ps-page--account ps-container"
        style={{
          minHeight: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div className="ps-widget__header">
          <img src={state.client ? user1 : user3} alt="" />
          <div className="user-name">Akintomiwa fisayo</div>
          <div className="user-handler">(@AkintomiwaF)</div>
          {!state.client ? (
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
          ) : ''}
        </div>


        <div className="ps-widget__content">
          {userDetails}
        </div>

        {
          !state.client ? (
            <button
              type="button"
              className="btn log-out"
            >Log out
            </button>
          ) : (
            <button
              type="button"
              className="btn log-out"
            >Delete Client
            </button>
          )
        }


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
