import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import Rating from '../Rating';

class Product extends Component {
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
    let productBadge = null;
    if (product.badge && product.badge !== null) {
      product.badge.map((badge) => {
        if (badge.type === 'sale') {
          productBadge = (
            <div className="ps-product__badge">{badge.value}</div>
          );
        } else if (badge.type === 'outStock') {
          productBadge = (
            <div className="ps-product__badge out-stock">
              {badge.value}
            </div>
          );
        } else {
          productBadge = (
            <div className="ps-product__badge hot">
              {badge.value}
            </div>
          );
        }


        return productBadge;
      });
    }

    return (
      <div className="ps-product">
        <div className="ps-product__thumbnail">
          <Link to={`/products/${product.id}`}>
            <img src={product.thumbnail} alt="martfury" />
          </Link>
          {product.badge ? productBadge : ''}
        </div>
        <div className="ps-product__container">
          <Link to="/shop" className="ps-product__vendor">Young Shop </Link>
          <div className="ps-product__content">
            {product.sale === true ? (
              <p className="ps-product__price sale">
                {currency ? currency.symbol : '$'}
                {product.price}
                <del className="ml-2">
                  {currency ? currency.symbol : '$'}
                  {product.salePrice}
                </del>
                <small>18% off</small>
              </p>
            ) : (
              <p className="ps-product__price">
                {currency ? currency.symbol : '$'}
                {product.price}
              </p>
            )}
            <Link to={`/products/${product.id}`} className="ps-product__title">{product.title} </Link>

            <div className="ps-product__rating">
              <Rating />
              <span>{product.ratingCount}</span>
            </div>
            <div
              className="ps-product__progress-bar ps-progress"
              data-value="97"
            >
              <div className="ps-progress__value">
                <span style={{ width: `${50}%` }} />
              </div>
              <p>Sold:22</p>
            </div>
          </div>
        </div>
        <Modal
          title={product.title}
          centered
          footer={null}
          width={1024}
          onCancel={this.handleHideQuickView}
          visible={this.state.isQuickView}
        >
          <ProductDetailQuickView product={product} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => state.setting;
export default connect(mapStateToProps)(Product);
