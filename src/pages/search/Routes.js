import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Search from './Search';


class SearchRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/search/:query"
          render={(props) => (
            <Search
              {...this.props}
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/search"
          render={(props) => (
            <Search
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
export default connect(mapStateToProps)(SearchRoutes);
