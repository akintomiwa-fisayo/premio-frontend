import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../../store/setting/action';
import user3 from '../../../public/static/img/users/3.jpg';
import user1 from '../../../public/static/img/users/1.jpg';
import { parseQueryString } from '../../../lib/js';
import ChangePassword from './ChangePassword';
import BecomeVendor from './BecomeVendor';

class ViewAccount extends Component {
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
    const { header, nav, user } = this.props;

    const query = {
      type: 'customer',
      ...parseQueryString(this.props.location.search),
    };

    let tabs = [
      { title: 'Details' },
      { title: 'Following' },
    ];

    if (user.accountType === 'vendor') {
      tabs = [
        ...tabs,
        { title: 'Followers' },
        { title: 'Subscription' },
      ];
    }


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

    const following = [
      {
        id: '1233f',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
      },
      {
        id: '1233f',
        accountType: 'vendor',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
        following: true,
      },
      {
        id: '1233f',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
        following: true,
      },
      {
        id: '1233f',
        accountType: 'vendor',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
      },
      {
        id: '1233f',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
      },
    ];

    const followers = [
      {
        id: '1233f',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
      },
      {
        id: '1233f',
        accountType: 'vendor',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
        following: true,
      },
      {
        id: '1233f',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
        following: true,
      },
      {
        id: '1233f',
        accountType: 'vendor',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
      },
      {
        id: '1233f',
        displayImage: user3,
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        handle: 'akintomiwaF',
      },
    ];

    return (
      <section id="myAccount" className="ps-page--account ps-container">
        <div className="ps-widget__header">
          <div className={`avi${user.accountType === 'vendor' ? ' vendor' : ''}`}>
            <img src={state.client ? user1 : user3} alt="" />
          </div>
          <div className="user-name">Akintomiwa fisayo</div>
          <div className="user-handle">(@AkintomiwaF)</div>

        </div>

        <div className="actions">
          <button
            type="button"
            className="btn btn-glass"
            onClick={this.changePassword}
          >Change password
          </button>

          {user.accountType !== 'vendor'
            ? (
              <button
                type="button"
                className="btn btn-glass"
                onClick={this.becomeVendor}
              >Become a vendor
              </button>
            )
            : ''}
        </div>

        <Tabs
          tabs={tabs}
          initialPage={0}
          className="ps-widget__content"
          class="ps-widget__content"
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <>
            {userDetails}
          </>

          <>
            {following.map((follower) => (
              <Link to="/account/client?user=other&type=vendor" className={`follower${follower.accountType === 'vendor' ? ' vendor' : ''}`}>
                <div className="avi">
                  <div className="holder">
                    <img src={follower.displayImage} alt="" />
                  </div>
                </div>
                <div className="holder">
                  <div className="details">
                    <p className="name">{follower.firstName} {follower.lastName} fdkjkjdbfjdkfbjdkbfdjkb</p>
                    <p className="handle">@{follower.handle}jfdsdjnkdnfkjndnfkdnnfjdknj</p>
                  </div>
                  <button type="button" className="btn btn-glass following" />
                </div>
              </Link>
            ))}
          </>

          <>
            {followers.map((follower) => (
              <Link to="/account/client?user=other&type=vendor" className={`follower${follower.accountType === 'vendor' ? ' vendor' : ''}`}>
                <div className="avi">
                  <div className="holder">
                    <img src={follower.displayImage} alt="" />
                  </div>
                </div>
                <div className="holder">
                  <div className="details">
                    <p className="name">{follower.firstName} {follower.lastName} fdkjkjdbfjdkfbjdkbfdjkb</p>
                    <p className="handle">@{follower.handle}jfdsdjnkdnfkjndnfkdnnfjdknj</p>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-glass${follower.following ? ' following' : ''}`}
                  />
                </div>
              </Link>
            ))}
          </>

          <>
            <div id="userSub">
              <p className="head">Current Plan</p>
              <div id="currentPlan">
                <span>Bronze</span>
                <button
                  type="button"
                  className="btn btn-default"
                >Renew
                </button>
              </div>

              <p className="head big">All Plans</p>

              <div id="allPlans">
                <div className="plan">
                  <div>
                    <span className="name"> Bronze </span>
                    <button
                      type="button"
                      className="btn btn-glass"
                    >Subcribe
                    </button>
                  </div>
                  <div className="price">free</div>
                  <div>
                    <p>Upload maximum of 1 files or 25mb files</p>
                    <p>Access 100 % commissions for 6 months</p>
                    <p>After six month, you get just 50%</p>
                  </div>
                </div>

                <div className="plan">
                  <div>
                    <span className="name"> Silver </span>
                    <button
                      type="button"
                      className="btn btn-glass"
                    >Subcribe
                    </button>
                  </div>
                  <div className="price">#500 monthly</div>
                  <div>
                    <p>Upload maximum of 2 files or 50mb files</p>
                    <p>Access 100 % commissions for 6 months</p>
                    <p>After six month, you get just 60%</p>
                  </div>
                </div>
                <div className="plan">
                  <div>
                    <span className="name">Gold</span>
                    <button
                      type="button"
                      className="btn btn-glass"
                    >Subcribe
                    </button>
                  </div>
                  <div className="price">#1,000 monthly</div>
                  <div>
                    <p>Upload maximum of 5 files or 100mb files</p>
                    <p>Access 100 % commissions for 6 months</p>
                    <p>After six month, you get just 70%</p>
                  </div>
                </div>

                <div className="plan">
                  <div>
                    <span className="name">Diamond</span>
                    <button
                      type="button"
                      className="btn btn-glass"
                    >Subcribe
                    </button>
                  </div>
                  <div className="price">#2,500 monthly</div>
                  <div>
                    <p>Upload maximum of 10 files or 250mb files</p>
                    <p>Access 100 % commissions for 6 months</p>
                    <p>After six month, you get just 80%</p>
                  </div>
                </div>

                <div className="plan">
                  <div>
                    <span className="name">Platinum</span>
                    <button
                      type="button"
                      className="btn btn-glass"
                    >Subcribe
                    </button>
                  </div>
                  <div className="price">#5,000 monthly</div>
                  <div>
                    <p>Upload maximum of 20 files or 500mb files</p>
                    <p>Access 100 % commissions for 6 months</p>
                    <p>After six month, you get 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Tabs>

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
  ...state.auth,
});

export default connect(mapStateToProps)(ViewAccount);
