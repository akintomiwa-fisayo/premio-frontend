import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { products } from '../../public/static/data/product';
import ProductWidgets from '../../components/partials/product/ProductWidgets';
import { changeHeader, resetHeader } from '../../store/setting/action';
import { getProductsById } from '../../store/product/action';
import InformationDefault from '../../components/elements/detail/modules/information/InformationDefault';
import ProductComments from './ProductComments';

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      loading: true,
    };

    this.productId = null;
    this.prevSearch = '';
    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'details',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));

    this.getProduct();
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  getProduct() {
    const { props } = this;
    const { productId } = this.props.match.params;

    if (this.productId !== productId) {
      document.querySelector('html').scrollTop = 0;
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products/${productId}`,
        method: 'GET',
      }).then((product) => {
        if (this._isMounted) {
          this.setState(() => ({ product, loading: false }));
        }
      });
    }
  }

  render() {
    const product = products[2];
    return (
      <div id="viewProduct" className="site-content">
        <div className="ps-page__left">
          <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
              <div id="thumbnail">
                <img src={product.thumbnail} alt="" />
              </div>
              <InformationDefault {...this.props} product={product} />
            </div>
          </div>
        </div>
        <div className="ps-page__right">
          <ProductComments {...this.props} product={product} />
          <ProductWidgets {...this.props} product={product} />
        </div>
        {/* <RelatedProductFullwidth /> */}
      </div>
    );
  }
}

export default connect()(ViewProduct);
