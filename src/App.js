import React from 'react';
import './App.css';
import './scss/style.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/shared/navigation/Navigation';
import Home from './pages/home/Home';
import Products from './pages/products/products';
import Profile from './pages/profile/Profile';
import SearchRoutes from './pages/search/Routes';
import Messages from './pages/messaging/messaging';
import MyClients from './pages/myClients/MyClients';
import MyProducts from './pages/myProducts/myProducts';
import SignIn from './pages/auth/SignIn';
import InviteFriend from './pages/InviteFriend';
import MyCommisions from './pages/myCommissions/MyCommisions';
import SalesReport from './pages/salesReport/SalesReport';
import TeamMates from './pages/TeamMates';
import Account from './pages/account/Account';
import Cart from './pages/cart/Cart';
import Payment from './pages/payment/Payment';
import SignUp from './pages/auth/SignUp';
import backgroundTasks from './tasks/tasks';
import PurchasesRoutes from './pages/purchases/Routes';


class App extends React.Component {
  constructor(props) {
    super(props);


    this.backgroundTasksInterval = null;
    this.executeBackgroundTasks = this.executeBackgroundTasks.bind(this);
  }

  componentDidMount() {
    this.executeBackgroundTasks();
    this.backgroundTasksInterval = setInterval(this.executeBackgroundTasks, 700);
  }

  componentWillUnmount() {
    clearInterval(this.backgroundTasksInterval);
  }

  executeBackgroundTasks() {
    const { props } = this;
    // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', { ...this.props });
    backgroundTasks({
      store: props.store,
      dispatchEvent: props.dispatchEvent,
      fetchRequest: props.fetchRequest,
      FetchRequest: props.FetchRequest,
    });
  }

  render() {
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
              path="/payment"
              render={(props) => (
                <Payment
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/profile"
              render={(props) => (
                <Profile
                  {...this.props}
                  {...props}
                />
              )}
            />
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
                <MyClients
                  {...this.props}
                  {...props}
                />
              )}
            />
            <Route
              path="/purchases"
              render={(props) => (
                <PurchasesRoutes
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
                <SearchRoutes
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
              path="/home"
              render={(props) => (
                <Home
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
              path="/"
              render={(props) => (
                <SignIn
                  {...this.props}
                  {...props}
                />
              )}
            />

          </Switch>
        </main>
        <Navigation
          {...this.props}
          backgroundTasksInterval={this.backgroundTasksInterval}
        />
      </>
    );
  }
}

App.propTypes = {
  setting: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ setting: state.setting });

export default connect(mapStateToProps)(App);
