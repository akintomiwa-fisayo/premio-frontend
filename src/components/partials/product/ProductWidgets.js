import React from 'react';
import { NavLink } from 'react-router-dom';
import { sameBrands } from '../../../public/static/data/product';
import Product from '../../elements/products/Product';

class ProductWidgets extends React.Component {
  render() {
    return (
      <section>
        <aside id="moreVendorProducts" className="widget widget_same-brand">
          <h3 className="label">Same Vendor</h3>
          <div id="vendorProducts" className="widget__content">
            {sameBrands && sameBrands.map((product) => (
              <Product history={this.props.history} product={product} key={product.id} />
            ))}
          </div>
        </aside>
      </section>
    );
  }
}

export default ProductWidgets;
