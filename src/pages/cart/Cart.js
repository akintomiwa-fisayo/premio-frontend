import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import { removeCartProduct } from '../../store/cart/action';
import { setPaymentInfo } from '../../store/payment/action';


class Cart extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
    this.buyProducts = this.buyProducts.bind(this);
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'details',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  handleRemoveCartItem(productId) {
    const { props } = this;
    props.dispatch(removeCartProduct(productId));

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/products/${productId}/remove_from_cart`,
      method: 'DELETE',
    }).then((res) => {
      const { cartProducts } = res;
      props.setCartProducts(cartProducts);
    });
  }

  buyProducts() {
    const { cartProducts } = this.props;
    this.props.setPaymentInfo({
      paymentFor: 'ProductsPurchase',
      summary: cartProducts.map((product) => ({
        id: product.id,
        description: `Product purchase (${product.id})`,
        units: 1,
        price: product.price,
        referer: product.referer,
      })),
    });

    this.props.history.push('/payment');
    // alert("stat function that checks ")
  }

  render() {
    const { cartProducts } = this.props;

    let amount = 0;
    // Get the total  price
    cartProducts.forEach((pro) => {
      amount += pro.price;
    });

    console.log(this.props);
    return (
      <div id="cartDrawalContent">
        <div className="ps-panel__content  ps-container">
          <div className="ps-cart--mobile">
            <div className="ps-cart__content">
              {cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    className="ps-product--cart-mobile"
                    key={product.id}
                  >
                    <div className="ps-product__thumbnail">
                      <img src={product.thumbnail} alt="martfury" />
                    </div>
                    <div className="ps-product__content">
                      <span
                        className="ps-product__remove"
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleRemoveCartItem(product.id);
                        }}
                      >
                        <i className="icon-cross" />
                      </span>
                      <p className="ps-product__title"> {product.title} </p>
                      <p className="vendor">
                        <span>Sold by:</span>
                        <Link to={`account/${product.vendor.id}`}>
                          {product.vendor.companyName}
                        </Link>
                      </p>
                      <div className="price product-price">
                        <span><span>#</span>{product.price.toLocaleString('en-GB')}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="page-empty-msg">There are no products in cart</p>
              )}
            </div>
            <div className="ps-cart__footer">
              <h3>
                Sub Total:
                <strong>
                  #{amount.toLocaleString('en-GB')}
                </strong>
              </h3>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.buyProducts}
              >Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setPaymentInfo: (props) => dispatch(setPaymentInfo(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
