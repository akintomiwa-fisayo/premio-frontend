import React from 'react';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import Newletters from '../../components/partials/commons/Newletters';
import CustomerBought from '../../components/partials/product/CustomerBought';
import RelatedProduct from '../../components/partials/product/RelatedProduct';
import ProductDetailAffiliate from '../../components/elements/detail/ProductDetailAffiliate';
import ProductWidgets from '../../components/partials/product/ProductWidgets';

const ProductAffiliatePage = () => (
  <div className="site-content">
    <div className="ps-page--product">
      <div className="ps-container">
        <div className="ps-page__container">
          <div className="ps-page__left">
            <ProductDetailAffiliate />
          </div>
          <div className="ps-page__right">
            <ProductWidgets />
          </div>
        </div>
        <CustomerBought />
        <RelatedProduct />
      </div>
    </div>
    <Newletters />
    <FooterDefault />
  </div>
);

export default ProductAffiliatePage;
