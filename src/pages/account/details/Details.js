import React, { Component } from 'react';
import Vendor from './Vendor';
import User from './User';

class AccountDetails extends Component {
  render() {
    return (
      this.props.accountDetails.isVendor
        ? <Vendor {...this.props} />
        : <User {...this.props} />
    );
  }
}

export default AccountDetails;
