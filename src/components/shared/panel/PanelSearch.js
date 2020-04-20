import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { updateCartSuccess } from '../../../store/cart/action';
import { onSale } from '../../../public/static/data/product';

class PanelSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBarFocused: false,
    };
  }

  componentDidMount() {
    // this.props.dispatch(getCart());
    // set Cart items
    this.props.dispatch(updateCartSuccess({
      cartItems: onSale,
    }));
  }

  render() {
    const { state } = this;
    const {
      amount,
      cartItems,
      header,
      close,
    } = this.props;

    return (
      <div id="searchPanel" className="ps-panel__wrapper">
        <div className="ps-panel__header" style={{ height: `${header.height}px` }}>
          <SearchBar />
        </div>

        <div id="result" className="ps-container">
          { cartItems.map((product) => (
            <div className="ps-product--cart-mobile" key={product.id}>
              <div className="ps-product__thumbnail">
                <Link
                  to={`/products/${product.id}`}
                  onClick={close}
                >
                  <img src={product.thumbnail} alt="martfury" />
                </Link>
              </div>
              <div className="ps-product__content">
                <Link
                  to={`/products/${product.id}`}
                  className="ps-product__title"
                  onClick={close}
                > {product.title}
                </Link>
                <p className="price"> ${product.price} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.cart,
  ...state.setting,
});
export default connect(mapStateToProps)(PanelSearch);
