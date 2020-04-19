import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Product from './viewProduct';
import ProductAffiliatePage from './affiliate';

class Products extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/products/:productId"
          render={(props) => (
            <Product {...props} />
          )}
        />
      </Switch>
    );
  }
}

export default Products;
