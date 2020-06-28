import React from 'react';
import { sameBrands } from '../../public/static/data/product';
import Product from './Product';

class ProductWidgets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
    };

    this._isMounted = false;
    this.productId = null;
    this.getSimilarProducts = this.getSimilarProducts.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getSimilarProducts();
  }

  componentDidUpdate() {
    this.getSimilarProducts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getSimilarProducts() {
    const { props } = this;
    const { productId } = this.props;

    if (this.productId !== productId) {
      this.productId = productId;
      this.setState(() => ({ loading: true }));

      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products/${productId}/more_from_vendor`,
        method: 'GET',
      }).then((products) => {
        if (this._isMounted) {
          this.setState(() => ({ products, loading: false }));
        }
      });
    }
  }

  render() {
    const { state } = this;
    const { products, loading } = state;

    if (loading) {
      return <p className="page-loader" />;
    }

    if (products.length === 0) {
      return '';
    }

    return (
      <section>
        <aside id="moreVendorProducts" className="widget widget_same-brand">
          <h3 className="label">Same Vendor</h3>
          <div id="vendorProducts" className="widget__content">
            {products.map((product) => (
              <Product history={this.props.history} product={product} key={product.id} />
            ))}
          </div>
        </aside>
      </section>
    );
  }
}

export default ProductWidgets;
