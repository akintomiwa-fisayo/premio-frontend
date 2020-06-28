import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Followings extends Component {
  render() {
    const { state } = this;
    const { users, onAction } = this.props;

    return (
      users.map((user) => (
        <Link to={`/account/${user.id}`} className={`follower${user.isVendor ? ' vendor' : ''}`}>
          <div className="avi">
            <div className="holder">
              <img src={user.displayImage} alt="" />
            </div>
          </div>
          <div className="holder">
            <div className="details">
              <p className="name">{user.firstName} {user.lastName}</p>
              <p className="description">{user.description}</p>
            </div>
            <button
              type="button"
              className={`btn btn-glass${user.following ? ' following' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAction(user);
              }}
            />
          </div>
        </Link>
      ))
    );
  }
}


export default connect()(Followings);
