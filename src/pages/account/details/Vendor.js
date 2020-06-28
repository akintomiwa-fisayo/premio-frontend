import React, { Component } from 'react';

class VendorAccountDetails extends Component {
  render() {
    const { accountDetails } = this.props;

    return (
      <div id="userDetails">
        <div className="user-detail">
          <p className="label">email</p>
          <p className="detail">{accountDetails.email}</p>
        </div>

        <div className="user-detail">
          <p className="label">mobile number</p>
          <p className="detail">{accountDetails.mobileNumber}</p>
        </div>

        <div className="user-detail">
          <p className="label">country</p>
          <p className="detail">{accountDetails.country}</p>
        </div>

        <div className="user-detail">
          <p className="label">state</p>
          <p className="detail">{accountDetails.state}</p>
        </div>

        <div className="user-detail">
          <p className="label">city</p>
          <p className="detail">{accountDetails.city}</p>
        </div>
      </div>
    );
  }
}

export default VendorAccountDetails;
