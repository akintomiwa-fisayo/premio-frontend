import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavigationList from './components/shared/navigation/NavigationList';
import Home from './pages/home';
import './scss/style.scss';
import Products from './pages/products/products';
import SearchResult from './pages/search/SearchResult';
import Purchases from './pages/account/Purchases';
import Messages from './pages/messaging/messaging';
import Clients from './pages/clients/clients';
import MyProducts from './pages/myProducts/myProducts';
import ConfirmSignUp from './pages/auth/ConfirmSignUp';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChangePassword from './pages/auth/ChangePassword';
import SignIn from './pages/auth/SignIn';
import InviteFriend from './pages/InviteFriend';
import MyCommisions from './pages/myCommissions/MyCommisions';
import SalesReport from './pages/salesReport/SalesReport';
import TeamMates from './pages/TeamMates';
import Vendor from './pages/Vendor';
import Account from './pages/account/Account';
import Cart from './pages/cart/Cart';

class App extends React.Component {
  render() {
    console.log({
      process: process.env,
    });

    console.log('BIG BOSS PROPS IS ', this.props);
    const { header, nav } = this.props.setting;
    return (
      <>
        <main
          id="homepage-1"
          style={{
            minHeight: `calc(100vh - ${header.height + nav.height}px)`,
          }}
        >
          <Switch>
            <Route
              path="/cart"
              render={(props) => (
                <Cart
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/messages"
              render={(props) => (
                <Messages
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/my-products"
              render={(props) => (
                <MyProducts
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/my-clients"
              render={(props) => (
                <Clients
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/purchases"
              render={(props) => (
                <Purchases
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/account/:userId"
              render={(props) => (
                <Account
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/sales-report"
              render={(props) => (
                <SalesReport
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/team-mates"
              render={(props) => (
                <TeamMates
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/my-commisions"
              render={(props) => (
                <MyCommisions
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/invite-friend"
              render={(props) => (
                <InviteFriend
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/search"
              render={(props) => (
                <SearchResult
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/products"
              render={(props) => (
                <Products
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/vendors/:id"
              render={(props) => (
                <Vendor
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/home"
              render={(props) => (
                <Home
                  {...this.props}
                  {...props}
                />
              )}
            />

            {/* FOR AUTH PAGE */}
            <Route
              path="/confirm-sign-up"
              render={(props) => (
                <ConfirmSignUp
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/sign-up"
              render={(props) => (
                <SignUp
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/forgot-password"
              render={(props) => (
                <ForgotPassword
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/change-password"
              render={(props) => (
                <ChangePassword
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/premio-frontend"
              render={(props) => (
                <SignIn
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/"
              exact
              render={(props) => (
                <SignIn
                  {...this.props}
                  {...props}
                />
              )}
            />
          </Switch>
        </main>
        <NavigationList {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(App);
