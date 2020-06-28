import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Link, Route } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import SearchBar from '../../components/shared/SearchBar';
import { getRelativeTime } from '../../lib/js';
import Purchases from './Purchases';
import PurchasedProduct from './PurchasedProduct';


class PurchasesRoutes extends Component {
  render() {
    const { header, purchases, setting } = this.props;
    const { products, loading } = purchases;
    if (loading) {
      return (
        <section id="myCommissions">
          <p className="page-loader" />
        </section>
      );
    }

    console.log(this.props);
    return (
      <Switch>
        <Route
          path="/purchases/:productId"
          render={(props) => (
            <PurchasedProduct
              {...this.props}
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/purchases"
          render={(props) => (
            <Purchases
              {...this.props}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  purchases: state.purchases,
});
export default connect(mapStateToProps)(PurchasesRoutes);
