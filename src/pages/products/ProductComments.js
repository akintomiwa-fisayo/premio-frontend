import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import user1 from '../../public/static/img/users/1.jpg';
import { getRelativeTime, isEmpty } from '../../lib/js';

class ProductComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      comments: [],
      loading: true,
      submitting: false,
    };

    this._isMounted = false;
    this.productId = null;
    this.regComment = this.regComment.bind(this);
    this.getComments = this.getComments.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getComments();
  }

  componentDidUpdate() {
    this.getComments();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getComments() {
    const { props } = this;
    const { productId } = this.props;

    if (this.productId !== productId) {
      this.productId = productId;
      this.setState({ loading: true });
      // this.props.onComponentMount();
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products/${productId}/comments`,
        method: 'GET',
      }).then((comments) => {
        if (this._isMounted) {
          this.setState(() => ({ comments, loading: false }));
        }
      });
    }
  }

  regComment(event) {
    const comment = event.target.value;
    this.setState(() => ({
      comment,
    }));
  }

  createComment() {
    const { fetchRequest, productId } = this.props;
    const { comment, loading } = this.state;

    if (!loading) {
      if (!isEmpty(comment)) {
        this.setState({ submitting: true });
        fetchRequest({
          url: `${process.env.REACT_APP_API}/products/${productId}/comments`,
          method: 'POST',
          body: JSON.stringify({
            comment,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          const { comments } = this.state;
          const newComment = res.productComment;
          comments.unshift(newComment);
          this.setState({
            comment: '',
            comments,
            submitting: false,
          });
        });
      }
    }
  }

  render() {
    const {
      comment, comments, loading, submitting,
    } = this.state;

    if (loading) {
      return <p className="page-loader" />;
    }

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
              className={`btn btn-default${submitting ? ' disabled' : ''}`}
              onClick={this.createComment}
            >Submit
            </button>
          </div>

          { comments.map((productComment) => (
            <div className="comment">
              <div className="head">
                <div className="arthur">
                  <Link
                    to={`/account/${productComment.user.id}`}
                    className="avi"
                  >
                    <img src={productComment.user.displayImage} alt="" />
                  </Link>
                  <Link
                    to={`/account/${productComment.user.id}`}
                    className="name"
                  >{productComment.user.isVendor ? `${productComment.user.companyName}` : `${productComment.user.firstName} ${productComment.user.lastName}`}
                  </Link>
                </div>
                <span className="date-time">{getRelativeTime(productComment.createdOn, true, 'number')}</span>
              </div>

              <p className="content">{productComment.comment}</p>
            </div>

          ))}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => state.product;

export default connect(mapStateToProps)(ProductComments);
