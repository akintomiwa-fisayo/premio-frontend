import React, { Component } from 'react';
import { Tabs, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import user3 from '../../public/static/img/users/3.jpg';
import user1 from '../../public/static/img/users/1.jpg';
import { parseQueryString } from '../../lib/js';
import { onSale } from '../../public/static/data/product';
import Product from '../products/Product';

class Followings extends Component {
  render() {
    const { state } = this;
    const { users, onAction, type } = this.props;

    if (users.length === 0) {
      return (
        <div className="page-empty-msg">
          {type === 'followings' ? 'You are currently not following anyone' : "You don't have followers at the moment"}
        </div>
      );
    }

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
            { user.isVendor
              ? (
                <button
                  type="button"
                  className={`btn btn-glass${user.following ? ' following' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAction(user);
                  }}
                />
              )
              : ''}
          </div>
        </Link>
      ))
    );
  }
}


export default connect()(Followings);
