import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { onSale } from '../../public/static/data/product';
import { changeHeader, resetHeader } from '../../store/setting/action';


class ViewMyProducts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch(getCart());
    // set Cart items
    this.props.dispatch(updateCartSuccess({
      cartItems: onSale,
    }));
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'My products',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }


  handleRemoveCartItem(product) {
    this.props.dispatch(removeItem(product));
  }

  render() {
    const {
      amount, cartItems, nav, header,
    } = this.props;
    console.log(this.props);
    return (
      <div
        id="myProducts"
        className="ps-panel--wrapper "
        style={{
          height: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div className="ps-cart__content ps-container">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div className="ps-product--cart-mobile" key={product.id}>
                <div className="ps-product__thumbnail">
                  <Link to={`/my-products/${product.id}`}>
                    <img src={product.thumbnail} alt="martfury" />
                  </Link>
                </div>
                <div className="ps-product__content">
                  <Link to={`/my-products/${product.id}`} className="ps-product__title"> {product.title} </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="ps-cart__items">
              <span>No products in cart</span>
            </div>
          )}
        </div>
        <Link
          to="/my-products/new"
          id="submiNewProduct"
          style={{ bottom: `calc(1em + ${nav.height}px)` }}
        >
          <span className="icon-pencil" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.cart,
  ...state.setting,
});
export default connect(mapStateToProps)(ViewMyProducts);
