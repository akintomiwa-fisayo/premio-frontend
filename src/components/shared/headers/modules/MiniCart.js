import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart, removeItem } from '../../../../store/cart/action';
import { NavLink } from 'react-router-dom';
class MiniCart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    handleRemoveCartItem = product => {
        this.props.dispatch(removeItem(product));
    };

    render() {
        const { amount, cartTotal, cartItems } = this.props;
        return (
            <div className="ps-cart--mini">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{cartTotal ? cartTotal : 0}</i>
                    </span>
                </a>
                {cartItems && cartItems.length > 0 ? (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            {cartItems && cartItems.length > 0
                                ? cartItems.map(product => (
                                      <div
                                          className="ps-product--cart-mobile"
                                          key={product.id}>
                                          <div className="ps-product__thumbnail">
                                              <NavLink
                                                  to="/product/[pid]"
                                                  as={`/product/${product.id}`}>
                                                      <img
                                                          src={
                                                              product.thumbnail
                                                          }
                                                          alt="martfury"
                                                      />
                                              </NavLink>
                                          </div>
                                          <div className="ps-product__content">
                                              <a
                                                  className="ps-product__remove"
                                                  onClick={this.handleRemoveCartItem.bind(
                                                      this,
                                                      product
                                                  )}>
                                                  <i className="icon-cross"></i>
                                              </a>
                                              <NavLink to="/product/[pid]" as={`/product/${product.id}`} className="ps-product__title">
                                                      {product.title}
                                              </NavLink>
                                              <p>
                                                  <strong>Sold by:</strong>{' '}
                                                  {product.vendor}
                                              </p>
                                              <small>
                                                  {product.quantity} x $
                                                  {product.price}
                                              </small>
                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                        <div className="ps-cart__footer">
                            <h3>
                                Sub Total:
                                <strong>${amount ? amount : 0}</strong>
                            </h3>
                            <figure>
                                <NavLink to="/cart" className="ps-btn">View Cart </NavLink>
                                <NavLink to="/checkout" className="ps-btn">Checkout </NavLink>
                            </figure>
                        </div>
                    </div>
                ) : (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            <span>No products in cart</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(MiniCart);
