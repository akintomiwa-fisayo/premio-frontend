import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import { setInfo } from '../../store/account/action';
import Details from './details/Details';
import { changeHeader, resetHeader } from '../../store/setting/action';
import AccountActions from './AccountActions';
import { alert } from '../../lib/js';
import VendorProducts from './details/VendorProducts';

class Account extends Component {
  constructor(props) {
    super(props);

    this.prevUserId = null;
    this._isMounted = false;
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.onComponentMount();
    // alert('we in my account');
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'Account',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentDidUpdate() {
    const { userId } = this.props.match.params;
    if (userId !== this.prevUserId) {
      this.prevUserId = userId;
      this.getUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.dispatch(resetHeader());
  }


  getUser() {
    const { props } = this;
    const { userId } = props.match.params;
    props.setInfo({ loading: true });

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/users/${userId}`,
    }).then((res) => {
      if (this._isMounted) {
        console.log('account full user details is', res);
        const {
          followers, following, subscription, ...details
        } = res;
        props.setInfo({
          details,
          following,
          followers,
          subscription,
          loading: false,
        });
      }
    });
  }

  render() {
    const { state } = this;
    const {
      sessionUser, account,
    } = this.props;
    const tabsContent = [];

    console.log('PROPS IIN THE BITCH : ', this.props);

    const accountDetails = account.details;
    if (account.loading) {
      return (
        <section id="myAccount" className="ps-page--account ps-container">
          <p className="page-loader" />
        </section>
      );
    }

    let tabs = [];

    if (accountDetails.isVendor) {
      tabs = [
        { title: 'Details' },
        { title: 'Products' },
      ];

      tabsContent[0] = (
        <Details
          {...this.props}
          accountDetails={accountDetails}
        />
      );

      tabsContent[1] = (
        <VendorProducts
          {...this.props}
          accountDetails={accountDetails}
        />
      );
    } else {
      tabs = [
        { title: 'Details' },
      ];

      tabsContent[0] = (
        <Details
          {...this.props}
          accountDetails={accountDetails}
        />
      );
    }

    return (
      <section id="myAccount" className="ps-page--account ps-container">
        <div className="ps-widget__header">
          <div className={`avi${accountDetails.isVendor ? ' vendor' : ''}`}>
            <img src={accountDetails.displayImage} alt="" />
          </div>
          <div className="user-name">
            {
              accountDetails.isVendor
                ? accountDetails.companyName
                : `${accountDetails.firstName} ${accountDetails.lastName}`
            }
          </div>
          {/* <div className="user-handle">(@AkintomiwaF)</div> */}

        </div>

        {accountDetails.isVendor ? (
          <p className="description">{accountDetails.bio}
          </p>
        ) : ''}

        <AccountActions
          {...this.props}
          accountDetails={accountDetails}
          changePassword={this.changePassword}
          becomeVendor={this.becomeVendor}
        />

        <Tabs
          tabs={tabs}
          initialPage={0}
          className="ps-widget__content"
          class="ps-widget__content"
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          {tabsContent}
        </Tabs>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  setInfo: (props) => dispatch(setInfo(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
