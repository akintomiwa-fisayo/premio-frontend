import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewProduct from './ViewProduct';

class Products extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/products/:productId"
          render={(props) => (
            <ViewProduct {...this.props} {...props} />
          )}
        />
      </Switch>
    );
  }
}

export default Products;
