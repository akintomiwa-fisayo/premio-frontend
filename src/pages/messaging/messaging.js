import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewMessage from './NewMessage';
import Messages from './Messages';

class Messaging extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/messages/new"
          render={(props) => (
            <NewMessage {...props} />
          )}
        />
        <Route
          path="/"
          render={(props) => <Messages {...props} />}
        />
      </Switch>
    );
  }
}

export default Messaging;
