import React, { Component } from 'react';
import Product from '../../products/Product';

class VendorProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
    };

    this._isMounted = false;
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getProducts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProducts() {
    const { props } = this;
    const { userId } = props.match.params;

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/vendors/${userId}/products`,
    }).then((res) => {
      if (this._isMounted) {
        console.log('full produt is', res);
        this.setState({ products: res, loading: false });
      }
    });
  }

  render() {
    const { state, props } = this;
    const { products } = state;
    if (state.loading) {
      return <p className="page-loader" />;
    }

    if (products.length === 0) {
      return (
        <div className="page-empty-msg">
          This vendor is yet to upload any product
        </div>
      );
    }


    return (
      <div className="products-preview">
        {products.map((product) => (
          <Product
            product={product}
            key={product.title}
          />
        ))}
      </div>
    );
  }
}

export default VendorProducts;
