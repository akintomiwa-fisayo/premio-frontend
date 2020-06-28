import React, { Component } from 'react';
import { Tabs, Badge } from 'antd-mobile';

class SubscriptionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 1,
    };

    this.subscribe = this.subscribe.bind(this);
  }

  subscribe() {
    const { subscription } = this.props;
    const { units } = this.state;
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
    const { subscription } = this.props;
    return (
      <div className="plan">
        <div className="row-1">
          <span className="name"> {subscription.title} </span>
          <div>
            <input
              type="number"
              placeholder="units"
              defaultValue="1"
              value={this.state.units}
              onChange={(e) => {
                this.setState({ units: e.target.value });
              }}
            />
            <button
              type="button"
              className="btn btn-glass"
              onClick={this.subscribe}
            >Subcribe
            </button>
          </div>
        </div>
        <div className="price">{isNaN(subscription.price) ? subscription.price : `#${subscription.price.toLocaleString('en-GB')}`}</div>
        <div>
          { subscription.descriptions.map((line) => <p>{line}</p>) }
        </div>
      </div>

    );
  }
}

export default (SubscriptionPlan);
