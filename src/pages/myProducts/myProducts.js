import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewProduct from './ViewProduct';
import ViewMyProducts from './ViewMyProducts';

class MyProducts extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/my-products/view"
          render={(props) => (
            <ViewProduct
              {...this.props}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <ViewMyProducts
              {...this.props}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

export default MyProducts;
