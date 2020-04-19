import React from 'react';
import { NavLink } from 'react-router-dom';
import { sameBrands } from '../../../public/static/data/product';
import Product from '../../elements/products/Product';

class ProductWidgets extends React.Component {
  render() {
    return (
      <section>
        <aside className="widget widget_product widget_features">
          <p>
            <i className="icon-network" /> Shipping worldwide
          </p>
          <p>
            <i className="icon-3d-rotate" /> Free 7-day return if
                eligible, so easy
          </p>
          <p>
            <i className="icon-receipt" /> Supplier give bills for this
                product.
          </p>
          <p>
            <i className="icon-credit-card" /> Pay online or when
                receiving goods
          </p>
        </aside>
        <aside className="widget widget_same-brand">
          <h3>Same Brand</h3>
          <div className="widget__content">
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
