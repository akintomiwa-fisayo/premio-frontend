import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import user1 from '../../public/static/img/users/1.jpg';

class ProductComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };

    this._isMounted = false;
    this.productId = null;
    this.regComment = this.regComment.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  regComment(event) {
    const comment = event.target.value;
    this.setState(() => ({ comment }));
  }

  createComment() {
    const { fetchRequest, product } = this.props;

    fetchRequest({
      url: `${process.env.REACT_APP_API}/products/${product.id}/comments`,
      method: 'POST',
    });
  }

  render() {
    const { comment } = this.state;

    return (
      <div id="productComments">
        <p className="label">Comments</p>
        <div id="comments">
          <div id="newComment">
            <textarea
              value={comment}
              onChange={this.regComment}
            />
            <button
              type="button"
              className="btn btn-default"
              onClick={this.createComment}
            >Submit
            </button>
          </div>

          <div className="comment">
            <div className="head">
              <div className="arthur">
                <div className="avi">
                  <img src={user1} alt="" />
                </div>
                <p className="name">Comment Author</p>
              </div>
              <span className="date-time">today, 12:30 am</span>
            </div>

            <p className="content">the content of the comment comes down in here</p>
          </div>
          <div className="comment">
            <div className="head">
              <div className="arthur">
                <div className="avi">
                  <img src={user1} alt="" />
                </div>
                <Link to="#" className="name">Comment Author</Link>
              </div>
              <span className="date-time">today, 12:30 am</span>
            </div>

            <p className="content">the content of the comment comes down in here</p>
          </div>
          <div className="comment">
            <div className="head">
              <div className="arthur">
                <div className="avi">
                  <img src={user1} alt="" />
                </div>
                <p className="name">Comment Author</p>
              </div>
              <span className="date-time">today, 12:30 am</span>
            </div>

            <p className="content">the content of the comment comes down in here</p>
          </div>
          <div className="comment">
            <div className="head">
              <div className="arthur">
                <div className="avi">
                  <img src={user1} alt="" />
                </div>
                <p className="name">Comment Author</p>
              </div>
              <span className="date-time">today, 12:30 am</span>
            </div>

            <p className="content">the content of the comment comes down in here</p>
          </div>
          <div className="comment">
            <div className="head">
              <div className="arthur">
                <div className="avi">
                  <img src={user1} alt="" />
                </div>
                <p className="name">Comment Author</p>
              </div>
              <span className="date-time">today, 12:30 am</span>
            </div>

            <p className="content">the content of the comment comes down in here</p>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => state.product;

export default connect(mapStateToProps)(ProductComments);
