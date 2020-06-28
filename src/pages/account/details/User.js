import React, { Component } from 'react';

class UserAccountDetails extends Component {
  constructor(props) {
    super(props);

    this.formatDate = this.formatDate.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  render() {
    const { accountDetails } = this.props;

    return (
      <div id="userDetails">
        <div className="user-detail">
          <p className="label">first name</p>
          <p className="detail">{accountDetails.firstName}</p>
        </div>

        <div className="user-detail">
          <p className="label">last name</p>
          <p className="detail">{accountDetails.lastName}</p>
        </div>

        <div className="user-detail">
          <p className="label">email</p>
          <p className="detail">{accountDetails.email}</p>
        </div>

        <div className="user-detail">
          <p className="label">mobile number</p>
          <p className="detail">{accountDetails.mobileNumber}</p>
        </div>

        <div className="user-detail">
          <p className="label">date of birth</p>
          <p className="detail">{this.formatDate(accountDetails.dateOfBirth)}</p>
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

export default UserAccountDetails;
