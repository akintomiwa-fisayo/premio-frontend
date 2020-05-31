import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { addItem } from '../../store/cart/action';
import RateProduct from './RateProduct';
import ReportProduct from './ReportProduct';

class InformationDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      showReportDialog: false,
    };
  }

  handleAddItemToCart(e) {
    e.preventDefault();
    const { product } = this.props;
    const tempProduct = product;
    tempProduct.quantity = this.state.quantity;
    this.props.dispatch(addItem(product));
  }

  handleAddItemToCompare(e) {
    e.preventDefault();
    const { product } = this.props;
  }

  handleAddItemToWishlist(e) {
    e.preventDefault();
    const { product } = this.props;
  }

  handleIncreaseItemQty(e) {
    e.preventDefault();
    this.setState({ quantity: this.state.quantity + 1 });
  }

  handleDecreaseItemQty(e) {
    e.preventDefault();
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }

  render() {
    const { state } = this;
    const { product, currency } = this.props;
    return (
      <div id="productInfo" className="ps-product__info">
        <h4>{product.title}</h4>
        <div className="ps-product__meta">
          <p>
            Vendor:
            <Link to="/shop" className="ml-2 text-capitalize">{product.vendor} </Link>
          </p>
          <div className="ps-product__rating">
            <Rating />
            <span>(1 review)</span>
          </div>
        </div>
        {product.sale === true ? (
          <h4 className="ps-product__price sale">
            {currency ? currency.symbol : '$'}
            {product.price}
          </h4>
        ) : (
          <h4 className="ps-product__price">
            {currency ? currency.symbol : '$'}
            {product.price}
          </h4>
        )}
        <div className="ps-product__desc">
          <p>The items description inlorem for nowwhich means placeholder text will come be change to to the items actual description posted by the author</p>
        </div>
        <div id="productActions" className="ps-product__shopping">
          {/* <div className="ps-product__actions">
            <a
              href="#"
              onClick={this.handleAddItemToWishlist.bind(this)}
            >
              <i className="icon-heart" />
            </a>
          </div> */}
          {true
            ? (
              <div id="actions">
                <button
                  type="button"
                  className="ps-btn ps-btn--black btn"
                  onClick={this.handleAddItemToCart.bind(this)}
                > Add to cart
                </button>
                <button
                  type="button"
                  className="ps-btn btn btn-default"
                  onClick={this.handleAddItemToCart.bind(this)}
                > Buy Now
                </button>
              </div>
            )
            : (
              <RateProduct {...this.props} />
            )}
        </div>
        <div className="ps-product__specification">
          <p className="tags">
            <strong>Tags : </strong>
            <Link to="/shop">sofa </Link>
            <Link to="/shop">technologies </Link>
            <Link to="/shop">wireless </Link>
          </p>
          <div id="subAction">
            <button
              type="button"
              id="reportAbuse"
              className="btn btn-glass"
              onClick={() => {
                this.setState(() => ({ showReportDialog: true }));
              }}
            >Report
            </button>
            <button
              type="button"
              className="btn btn-glass"
            >Recommend
            </button>
          </div>
        </div>
        {
          state.showReportDialog
            ? (
              <ReportProduct
                {...this.props}
                onClose={() => {
                  this.setState(() => ({ showReportDialog: false }));
                }}
              />
            ) : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => state.setting;

export default connect(mapStateToProps)(InformationDefault);
