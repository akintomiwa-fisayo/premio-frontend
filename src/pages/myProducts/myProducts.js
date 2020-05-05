import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewProduct from './ViewProduct';
import ViewMyProducts from './ViewMyProducts';
import sampleImg from '../../public/static/img/products/clothing/1.jpg';


class MyProducts extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/my-products/new"
          render={(props) => (
            <ViewProduct
              {...this.props}
              createProduct
              {...props}
            />
          )}
        />
        <Route
          path="/my-products/:id"
          render={(props) => (
            <ViewProduct
              {...this.props}
              {...props}
              createProduct={false}
              product={{
                file: sampleImg,
                title: 'The bag for stuffs for sale',
                description: 'the description about the bag comes down in here',
                price: 25000,
                commision: 80,
              }}
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
