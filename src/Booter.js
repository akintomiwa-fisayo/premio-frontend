import React from 'react';
import './App.css';
import Auth from './pages/auth/auth';
import App from './App';


class Booter extends React.Component {
  render() {
    // return false ? <Auth /> : <App />;
    return (
      <>
        <Auth />
        <App />
      </>
    );
  }
}

export default Booter;
