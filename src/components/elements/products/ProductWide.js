import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';

class ProductWide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuickView: false,
    };
  }

  handleAddItemToCart(e) {
    e.preventDefault();
    const { product } = this.props;
    this.props.dispatch(addItem(product));
  }

  handleAddItemToCompare(e) {
    e.preventDefault();
    const { product } = this.props;
    this.props.dispatch(addItemToCompare(product));
  }

  handleAddItemToWishlist(e) {
    e.preventDefault();
    const { product } = this.props;
    this.props.dispatch(addItemToWishlist(product));
  }

  handleShowQuickView(e) {
    e.preventDefault();
    this.setState({ isQuickView: true });
  }

  handleHideQuickView(e) {
    e.preventDefault();
    this.setState({ isQuickView: false });
  }

  render() {
    const { product, currency } = this.props;
    let productRating = null;
    if (product.badge) {
      product.badge.map((badge) => {
        if (badge.type === 'sale') {
          return (productRating = (
            <div className="ps-product__badge">{badge.value}</div>
          ));
        } if (badge.type === 'outStock') {
          return (productRating = (
            <div className="ps-product__badge.out-stock">
              {badge.value}
            </div>
          ));
        }
        return (productRating = (
          <div className="ps-product__badge.hot">
            {badge.value}
          </div>
        ));
      });
    }
    return (
      <div className="ps-product ps-product--wide">
        <div className="ps-product__thumbnail">
          <Link to={`/product/${product.id}`}>
            <img src={product.thumbnail} alt="martfury" />
          </Link>
        </div>
        <div className="ps-product__container">
          <div className="ps-product__content">
            <Link to={`/product/${product.id}`} className="ps-product__title">{product.title} </Link>
            <strong className="ps-product__vendor"> Sold by : <Link to="/shop">{product.vendor} </Link> </strong>
            <p className="ps-product__desc">
            The items description inlorem for nowwhich means placeholder text will come be change to to the items actual description posted by the author
            </p>
          </div>
          <div className="ps-product__shopping">
            {product.sale === true ? (
              <p className="ps-product__price sale">
                {currency ? currency.symbol : '$'}
                {product.price}
                <del className="ml-1">
                  {currency ? currency.symbol : '$'}
                  {product.salePrice}{' '}
                </del>
              </p>
            ) : (
              <p className="ps-product__price">
                {currency ? currency.symbol : '$'}
                {product.price}
              </p>
            )}
            <button type="button" className="ps-btn btn btn-default" onClick={this.handleAddItemToCart.bind(this)}> Add to cart </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.setting;
export default connect(mapStateToProps)(ProductWide);
