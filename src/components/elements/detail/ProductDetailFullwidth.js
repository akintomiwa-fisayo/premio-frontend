import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbnailDefault from './modules/thumbnail/ThumbnailDefault';
import InformationDefault from './modules/information/InformationDefault';
import DefaultDescription from './modules/description/DefaultDescription';

import { getProductsById } from '../../../store/product/action';

class ProductDetailFullwidth extends Component {
  constructor(props) {
    super(props);

    this.productId = null;
    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  componentDidUpdate() {
    this.getProduct();
  }

  getProduct() {
    const { productId } = this.props;
    this.props.dispatch(getProductsById(productId));
    if (this.productId !== productId) {
      document.querySelector('html').scrollTop = 0;
    }
  }

  render() {
    const { singleProduct } = this.props;
    return (
      <div className="ps-product--detail ps-product--fullwidth">
        {singleProduct ? (
          <div className="ps-product__header">
            {/* <ThumbnailDefault product={singleProduct} /> */}
            <div id="thumbnail">
              <img src={singleProduct.thumbnail} alt="" />
            </div>
            <InformationDefault product={singleProduct} />
          </div>
        ) : (
          ''
        )}
        <DefaultDescription />
      </div>
    );
  }
}

const mapStateToProps = (state) => state.product;

export default connect(mapStateToProps)(ProductDetailFullwidth);
