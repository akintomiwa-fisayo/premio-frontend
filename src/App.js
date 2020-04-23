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
import ConfirmSignUp from './pages/auth/ConfirmSignUp';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChangePassword from './pages/auth/ChangePassword';
import ModeSelector from './pages/auth/ModeSelector';
import SignIn from './pages/auth/SignIn';
import InviteFriend from './pages/InviteFriend';
import MyCommisions from './pages/myCommissions/MyCommisions';

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
              path="/account/:userId"
              render={(props) => (
                <MyAccount {...props} />
              )}
            />
            <Route
              path="/my-commisions"
              render={(props) => (
                <MyCommisions {...props} />
              )}
            />
            <Route
              path="/invite-friend"
              render={(props) => (
                <InviteFriend {...props} />
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
              path="/home"
              render={(props) => (
                <Home {...props} />
              )}
            />

            {/* FOR AUTH PAGE */}
            <Route
              path="/confirm-sign-up"
              render={(props) => <ConfirmSignUp {...props} />}
            />
            <Route
              path="/sign-up"
              render={(props) => <SignUp {...props} />}
            />
            <Route
              path="/forgot-password"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              path="/change-password"
              render={(props) => <ChangePassword {...props} />}
            />
            <Route
              path="/mode-selector"
              render={(props) => <ModeSelector {...props} />}
            />
            <Route
              path="/premio-frontend"
              render={(props) => <SignIn {...props} />}
            />
            <Route
              path="/"
              exact
              render={(props) => <SignIn {...props} />}
            />
          </Switch>
        </main>
        <NavigationList {...this.props} />
      </>
    );
  }
}

export default App;
