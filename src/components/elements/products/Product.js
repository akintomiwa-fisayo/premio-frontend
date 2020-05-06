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
      <Link to={`/products/${product.id}`} className="ps-product">
        <div className="ps-product__thumbnail">
          <div>
            <img src={product.thumbnail} alt="martfury" />
          </div>
          {/* {product.badge ? productBadge : ''} */}
        </div>
        <div className="ps-product__container">
          <span className="ps-product__vendor">Young Shop </span>
          <div className="ps-product__content">
            <p className="ps-product__price sale">
               ${product.price}
            </p>
            <p className="ps-product__title">{product.title} </p>

            <div className="ps-product__rating">
              <Rating />
              <span>{product.ratingCount}</span>
            </div>
            <p className="sales-count">Sold:22</p>
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
      </Link>
    );
  }
}
const mapStateToProps = (state) => state.setting;
export default connect(mapStateToProps)(Product);
