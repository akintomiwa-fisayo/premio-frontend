import React, { Component } from 'react';
import Vendor from './Vendor';
import User from './User';

class MyAccountDetails extends Component {
  render() {
    return (
      this.props.profileDetails.isVendor
        ? <Vendor {...this.props} />
        : <User {...this.props} />
    );
  }
}

export default MyAccountDetails;
