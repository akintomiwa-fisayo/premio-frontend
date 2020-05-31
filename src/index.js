import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from './Helmet';
import store from './store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HeaderMobile from './components/shared/HeaderMobile';
import Booter from './Booter';

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      <Helmet />
      <HeaderMobile />
      <Switch>
        <Route
          path="/"
          render={(props) => <Booter {...props} />}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
