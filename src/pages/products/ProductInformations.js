import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { addItem, addCartProduct, setCartProducts } from '../../store/cart/action';
import RateProduct from './RateProduct';
import ReportProduct from './ReportProduct';
import { setPaymentInfo } from '../../store/payment/action';
import RecommendProduct from './Recommend';
import { parseQueryString } from '../../lib/js';

class ProductInformations extends Component {
  constructor(props) {
    super(props);

    const { referer } = parseQueryString(props.history.location.search);

    this.state = {
      product: {},
      loading: true,
      updating: false,
      showReportDialog: false,
      recommend: false,
      referer,
    };

    this._isMounted = false;
    this.productId = null;
    this.prevSearch = '';
    this.isCartProduct = this.isCartProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.buyProduct = this.buyProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getProduct();
  }

  componentDidUpdate() {
    this.getProduct(true);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProduct(updating = false) {
    const { props } = this;
    const { productId } = this.props;

    if (this.productId !== productId) {
      this.productId = productId;
      this.props.onComponentMount();
      if (updating) {
        this.setState({ updating });
      }

      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products/${productId}`,
        method: 'GET',
      }).then((product) => {
        if (this._isMounted) {
          this.setState(() => ({
            product,
            loading: false,
            updating: false,
          }));
        }
      });
    }
  }

  handleAddItemToCart(e) {
    e.preventDefault();
    const { props, state } = this;
    const { product } = state;
    const { productId } = props;


    props.addCartProduct({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      vendor: product.vendor,
      referer: this.state.referer,
    });

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/products/${productId}/add_to_cart`,
      method: 'POST',
    }).then((res) => {
      const { cartProducts } = res;
      props.setCartProducts(cartProducts);
    });
  }

  updateProduct(props) {
    this.setState((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        ...props,
      },
    }));
  }

  isCartProduct() {
    let isCartProduct = false;
    const { product } = this.state;
    const { cartProducts } = this.props;
    for (const cartProduct of cartProducts) {
      if (cartProduct.id === product.id) {
        isCartProduct = true;
        break;
      }
    }

    return isCartProduct;
  }

  buyProduct() {
    const { product } = this.state;
    this.props.setPaymentInfo({
      paymentFor: 'ProductsPurchase',
      summary: [{
        id: product.id,
        description: `Product purchase (${product.id})`,
        units: 1,
        price: product.price,
        referer: this.state.referer,
      }],
    });

    this.props.history.push('/payment');
    // alert("stat function that checks ")
  }

  render() {
    const { state, props } = this;
    const { product, updating } = state;

    if (state.loading) {
      return (
        <div id="productDetails">
          <p className="page-loader" />
        </div>
      );
    }


    return (
      <div id="productDetails" className={`ps-product--detail ps-product--fullwidth${updating ? ' updating' : ''}`}>
        <div className="ps-product__header">
          <div id="thumbnail">
            <img src={product.thumbnail} alt="" />
          </div>
          <div id="productInfo" className="ps-product__info">
            <div className="title">
              <h4>{product.title}</h4>
            </div>
            <div className="ps-product__desc">
              <p>{product.description} </p>
            </div>
            <div className="sales">
              <span className="ps-product__price">
                <span><span>#</span>{product.price.toLocaleString('en-GB')}</span>
              </span>

              <span> 3 sold</span>
            </div>
            <div className="ps-product__meta">
              <p className="vendor">
                Vendor:
                <Link to={`/account/${product.vendor.id}`} className="ml-2 text-capitalize">{product.vendor.companyName} </Link>
              </p>
              <div className="ps-product__rating">
                <Rating ratings={product.ratings} />
                <span>({product.ratings.length} review{product.ratings.length > 1 ? 's' : ''})</span>
              </div>
            </div>

            <div id="productActions" className="ps-product__shopping">
              {!product.hasBought
                ? (
                  <div id="actions">
                    <button
                      type="button"
                      className="ps-btn ps-btn--black btn"
                      onClick={this.handleAddItemToCart}
                      style={{
                        display: this.isCartProduct() ? 'none' : '',
                      }}
                    > Add to cart
                    </button>
                    <button
                      type="button"
                      className="ps-btn btn btn-default"
                      onClick={this.buyProduct}
                    > Buy Now
                    </button>
                  </div>
                )
                : (
                  <RateProduct
                    {...this.props}
                    updateProduct={this.updateProduct}
                    product={product}
                  />
                )}
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
                  onClick={() => {
                    this.setState(() => ({ recommend: true }));
                  }}
                >Recommend
                </button>
              </div>

            </div>
            { state.showReportDialog ? (
              <ReportProduct
                {...this.props}
                productId={props.productId}
                onClose={() => {
                  this.setState(() => ({ showReportDialog: false }));
                }}
              />
            ) : ''}
            { state.recommend ? (
              <RecommendProduct
                {...this.props}
                productId={props.productId}
                onClose={() => {
                  this.setState(() => ({ recommend: false }));
                }}
              />
            ) : ''}
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
  addCartProduct: (product) => dispatch(addCartProduct(product)),
  setCartProduct: (cartProducts) => dispatch(setCartProducts(cartProducts)),
  setPaymentInfo: (props) => dispatch(setPaymentInfo(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInformations);
