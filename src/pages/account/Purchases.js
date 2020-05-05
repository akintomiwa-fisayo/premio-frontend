import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { onSale } from '../../public/static/data/product';
import { changeHeader, resetHeader } from '../../store/setting/action';


class Purchases extends Component {
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
      label: 'My purchases',
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
      <div id="myPurchases" className="ps-panel--wrapper">
        <div className="ps-shopping__header">
          <select className="ps-select">
            <option>filter: All products</option>
            <option>filter: Images</option>
            <option>filter: Videos</option>
            <option>filter: PDFs: low to high</option>
          </select>

          <select className="ps-select">
            <option>Sort by latest</option>
            <option>Sort by popularity</option>
            <option>Sort by average rating</option>
            <option>Sort by price: low to high</option>
            <option>Sort by price: high to low</option>
          </select>
        </div>

        <div className="ps-cart__content ps-container">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div className="ps-product--cart-mobile" key={product.id}>
                <div className="ps-product__thumbnail">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.thumbnail} alt="martfury" />
                  </Link>
                </div>
                <div className="ps-product__content">
                  <Link to={`/products/${product.id}`} className="ps-product__title"> {product.title} </Link>
                  <p className="vendor"> <strong>Sold by:</strong> {product.vendor} </p>
                  <p className="purchased-on"><strong>Purchased:</strong> today at 2:20 pm </p>
                </div>
              </div>
            ))
          ) : (
            <div className="ps-cart__items">
              <span>No products in cart</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.cart,
  ...state.setting,
});
export default connect(mapStateToProps)(Purchases);
