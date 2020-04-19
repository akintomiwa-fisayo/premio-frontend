import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavigationList from './components/shared/navigation/NavigationList';
import Home from './pages/home';
import './scss/style.scss';
import Products from './pages/products/products';
import SearchResult from './pages/search/SearchResult';
import MyAccount from './pages/account/MyAccount';
import Purchases from './pages/account/Purchases';
import Messages from './pages/messaging/messaging';
import Clients from './pages/clients/clients';
import MyProducts from './pages/myProducts/myProducts';

class App extends React.Component {
  render() {
    return (
      <>
        <main id="homepage-1">
          <Switch>
            <Route
              path="/messages"
              render={(props) => (
                <Messages {...props} />
              )}
            />
            <Route
              path="/my-products"
              render={(props) => (
                <MyProducts {...props} />
              )}
            />
            <Route
              path="/my-clients"
              render={(props) => (
                <Clients {...props} />
              )}
            />
            <Route
              path="/purchases"
              render={(props) => (
                <Purchases {...props} />
              )}
            />
            <Route
              path="/account"
              render={(props) => (
                <MyAccount {...props} />
              )}
            />
            <Route
              path="/search"
              render={(props) => (
                <SearchResult {...props} />
              )}
            />
            <Route
              path="/products"
              render={(props) => (
                <Products {...props} />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <Home {...props} />
              )}
            />
          </Switch>
        </main>
        <NavigationList {...this.props} />
      </>
    );
  }
}

export default App;
