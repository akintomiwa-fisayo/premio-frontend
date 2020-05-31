import React from 'react';
import { connect } from 'react-redux';
import LayoutShopSidebarWithoutBanner from './LayoutShopSidebarWithoutBanner';

import {
  getProducts,
  getProductsByCategory,
  getProductsByBrand,
} from '../../store/product/action';
import { changeHeader, resetHeader } from '../../store/setting/action';

class ShopSidebarWithoutBannerPage extends React.Component {
  constructor(props) {
    super(props);

    this.getProducts = this.getProducts.bind(this);
    this.parseQueryString = this.parseQueryString.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'search query come her and every other thing about the nigga',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));

    this.getProducts();
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  getProducts() {
    const { props } = this;
    const query = this.parseQueryString(this.props.location.search);
    console.log('search query ', query);
    if (Object.entries(query).length > 0) {
      if (query.category) {
        props.dispatch(getProductsByCategory(query.category));
      } else if (query.brand !== '') {
        props.dispatch(getProductsByBrand(query.brand));
      } else {
        props.dispatch(getProducts());
      }
    } else {
      props.dispatch(getProducts());
    }
  }

  parseQueryString(query) {
    const t = this;
    const obj = {};
    let values = query.split('?');
    if (values[1]) {
      values = values[1].split('&');
      values.forEach((value) => {
        const foo = value.split('=');
        obj[foo[0]] = foo[1];
      });
    }
    return obj;
  }


  render() {
    const { allProducts } = this.props;
    return (
      <div className="site-content">
        <div className="ps-page--shop" id="shop-sidebar">
          <LayoutShopSidebarWithoutBanner
            products={allProducts}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => state.product)(ShopSidebarWithoutBannerPage);
