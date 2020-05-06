import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { onSale } from '../../public/static/data/product';
import { changeHeader, resetHeader } from '../../store/setting/action';
import SearchBar from '../../components/shared/SearchBar';


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
      <div id="myPurchases">
        <div className="ps-shopping__header" style={{ top: `${header.height}px` }}>
          <SearchBar
            placeholder="Search by keyword"
            onEnter={() => {
              // alert('ama fdfind clients for you');
            }}
          />
        </div>

        <div className="ps-cart__content">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product) => (
              <Link to={`/products/${product.id}`} className="ps-product--cart-mobile" key={product.id}>
                <div className="ps-product__thumbnail">
                  <div>
                    <img src={product.thumbnail} alt="martfury" />
                  </div>
                </div>
                <div className="ps-product__content">
                  <div className="ps-product__title"> {product.title} </div>
                  <p className="vendor"> <strong>Vendor:</strong> {product.vendor} </p>
                  <p className="purchased-on"><strong>Purchased:</strong> today at 2:20 pm </p>
                </div>
              </Link>
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
