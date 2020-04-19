import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ModeSelector from './ModeSelector';

class Auth extends React.Component {
  render() {
    return (
      <Switch>
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
          path="/"
          exact
          render={(props) => <SignIn {...props} />}
        />
      </Switch>
    );
  }
}

export default Auth;
