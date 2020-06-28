import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Messages from './Messages';
import Chat from './Chat';


class Messaging extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/messages/chat"
          render={(props) => (
            <Chat
              {...this.props}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <Messages
              {...this.props}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

export default Messaging;
