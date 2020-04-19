import React, { Component } from 'react';

import Product from '../../elements/products/Product';
import ProductWide from '../../elements/products/ProductWide';
import ShopWidget from './modules/ShopWidget';

class LayoutShopSidebarWithoutBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
    };

    this.handleChangeViewMode = this.handleChangeViewMode.bind(this);
  }

  handleChangeViewMode(event) {
    event.preventDefault();
    this.setState({ listView: !this.state.listView });
  }

  render() {
    const { products } = this.props;
    const allProducts = products;
    const viewMode = this.state.listView;
    return (
      <div className="ps-layout--shop">
        <div className="ps-layout__right">
          <div className="ps-shopping">
            <div className="ps-shopping__header">
              <select className="ps-select">
                <option>Sort by latest</option>
                <option>Sort by popularity</option>
                <option>Sort by average rating</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
              <div className="ps-shopping__view">
                <ul className="ps-tab-list">
                  <li className={viewMode === true ? 'active' : ''}>
                    <span onClick={this.handleChangeViewMode}>
                      <i className="icon-grid" />
                    </span>
                  </li>
                  <li
                    className={viewMode !== true ? 'active' : ''}
                  >
                    <span onClick={this.handleChangeViewMode}>
                      <i className="icon-list4" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`ps-shopping__content products-preview${viewMode !== true ? ' grid-1' : ''}`}>
              {viewMode === true ? (
                <>
                  {allProducts && allProducts.length > 0
                    ? allProducts.map((item) => (
                      <Product
                        product={item}
                        key={item.id}
                      />
                    ))
                    : ''}
                </>
              ) : (
                <div className="ps-shopping-product">
                  {allProducts && allProducts.length > 0
                    ? allProducts.map((item) => (
                      <ProductWide
                        product={item}
                        key={item.id}
                      />
                    ))
                    : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LayoutShopSidebarWithoutBanner;
