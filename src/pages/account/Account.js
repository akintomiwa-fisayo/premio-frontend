import React, { Component } from 'react';
import MyAccount from './myAccount/MyAccount';
import ViewAccount from './ViewAccount';
import { parseQueryString } from '../../lib/js';

class Account extends Component {
  render() {
    const query = {
      user: 'me',
      ...parseQueryString(this.props.location.search),
    };

    console.log({ query });
    return (query.user === 'me' ? <MyAccount {...this.props} /> : <ViewAccount {...this.props} />);
  }
}

export default Account;
