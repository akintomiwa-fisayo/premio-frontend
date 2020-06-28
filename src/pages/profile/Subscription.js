import React, { Component } from 'react';
import { Tabs, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import user3 from '../../public/static/img/users/3.jpg';
import user1 from '../../public/static/img/users/1.jpg';
import { parseQueryString, getRelativeTime } from '../../lib/js';
import { onSale } from '../../public/static/data/product';
import Product from '../products/Product';
import SubscriptionPlan from './SubscriptionPlan';
import { setPaymentInfo } from '../../store/payment/action';

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renewUnits: 1,
    };
    this.renewSubscription = this.renewSubscription.bind(this);
  }

  renewSubscription() {
    const { subscription } = this.props.profile;
    const { renewUnits: units } = this.state;
    this.props.setPaymentInfo({
      paymentFor: 'SubscriptionPurchase',
      summary: [{
        id: subscription.title,
        description: `Subscription to ${subscription.title} plan`,
        units,
        price: isNaN(subscription.price) ? 0 : subscription.price,
      }],
    });

    this.props.history.push('/payment');
  }

  render() {
    const { subscription } = this.props.profile;
    const { renewUnits } = this.state;
    return (
      <div id="userSub">
        <p className="head">Current Plan</p>
        <div id="currentPlan">
          <div className="top">
            <span className="name">{subscription.title}</span>
            <div>
              <input
                type="number"
                placeholder="units"
                defaultValue="1"
                value={renewUnits}
                onChange={(e) => {
                  this.setState({ renewUnits: e.target.value });
                }}
              />
              <button
                type="button"
                className={`btn btn-default${subscription.title === 'bronze' ? ' disabled' : ''}`}
                onClick={() => {
                  if (subscription.title !== 'bronze') {
                    this.renewSubscription();
                  }
                }}
              >Renew
              </button>
            </div>
          </div>
          <div className="bottom">
            <div className="detail">
              <span className="label">price : </span>
              <span className="value">#{subscription.price}</span>
            </div>
            <div className="detail">
              <span className="label">maximum upload : </span>
              <span className="value">{subscription.maxNoOfProducts}</span>
            </div>
            <div className="detail">
              <span className="label">maximum uploads size : </span>
              <span className="value">{subscription.maxSizeOfProducts}</span>
            </div>
            <div className="detail">
              <span className="label">subscribed on : </span>
              <span className="value">{getRelativeTime(subscription.subscribedOn, false, 'number')}</span>
            </div>
            <div className="detail">
              <span className="label">expires on : </span>
              <span className="value">{subscription.expiresOn === false ? 'does not apply' : getRelativeTime(subscription.expiresOn, false, 'number')}</span>
            </div>
          </div>
        </div>

        <p className="head big">All Plans</p>

        <div id="allPlans">
          <SubscriptionPlan
            {...this.props}
            subscription={{
              title: 'Bronze',
              price: 'free',
              descriptions: [
                'Upload maximum of 1 files or 25mb files',
                'Access 100% commissions for 6 months',
                'After six month, you get just 50%',
              ],
            }}
          />

          <SubscriptionPlan
            {...this.props}
            subscription={{
              title: 'Silver',
              price: 500,
              descriptions: [
                'Upload maximum of 2 files or 50mb files',
                'Access 100% commissions for 6 months',
                'After six month, you get just 60%',
              ],
            }}
          />

          <SubscriptionPlan
            {...this.props}
            subscription={{
              title: 'Gold',
              price: 1000,
              descriptions: [
                'Upload maximum of 5 files or 100mb files',
                'Access 100% commissions for 6 months',
                'After six month, you get just 70%',
              ],
            }}
          />

          <SubscriptionPlan
            {...this.props}
            subscription={{
              title: 'Diamond',
              price: 2500,
              descriptions: [
                'Upload maximum of 10 files or 250mb files',
                'Access 100% commissions for 6 months',
                'After six month, you get just 80%',
              ],
            }}
          />

          <SubscriptionPlan
            {...this.props}
            subscription={{
              title: 'Platinum',
              price: 5000,
              descriptions: [
                'Upload maximum of 20 files or 500mb files',
                'Access 100% commissions for 6 months',
                'After six month, you get just 100%',
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPaymentInfo: (props) => dispatch(setPaymentInfo(props)),
});

export default connect(null, mapDispatchToProps)(Subscription);
