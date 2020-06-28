import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';

class Auth extends React.Component {
  render() {
    return (
      <Switch>
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
          render={(props) => (
            <SignIn
              {...this.props}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

export default Auth;
