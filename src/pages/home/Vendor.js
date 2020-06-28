import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeBanner from './HomeBanner';
import { setInfo, updateVendor } from '../../store/home/action';
import { ucFirst, alert } from '../../lib/js';


class Vendor extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.followAction = this.followAction.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  followAction(event) {
    event.preventDefault();
    const { props } = this;
    const { sessionUser, vendor } = this.props;

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/followers`,
      method: vendor.isFollowing ? 'DELETE' : 'POST',
      body: JSON.stringify({
        followee: vendor.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.props.updateVendor(vendor.id, {
      isFollowing: !vendor.isFollowing,
    });
  }

  render() {
    const { vendor } = this.props;
    return (
      <Link to={`/account/${vendor.id}`} className="vendor">
        <div className="avi">
          <div className="holder">
            <img src={vendor.displayImage} alt="" />
          </div>
        </div>

        <div className="holder">
          <div className="details">
            <p className="name">{vendor.companyName}</p>
            <p className="description">{ucFirst(vendor.bio)}</p>
            <p className="products">{vendor.noOfProducts} Products</p>
          </div>
          <button
            type="button"
            className={`btn btn-glass${vendor.isFollowing ? ' following' : ''}`}
            onClick={this.followAction}
          >{vendor.isFollowing ? 'Unfollow' : 'follow'}
          </button>
        </div>
      </Link>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateVendor: (id, props) => dispatch(updateVendor(id, props)),
});
export default connect(null, mapDispatchToProps)(Vendor);
