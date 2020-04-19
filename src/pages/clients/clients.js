import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewClients from './ViewClients';
import Chat from '../messaging/Chat';

class Clients extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/my-clients/:id/messages"
          render={(props) => <Chat {...props} />}
        />
        <Route
          path="/my-clients/:id"
          render={(props) => <Chat {...props} />}
        />
        <Route
          path="/"
          render={(props) => <ViewClients {...props} />}
        />
      </Switch>
    );
  }
}

export default Clients;
