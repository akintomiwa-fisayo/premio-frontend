import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { message } from 'antd';
import { changeNav } from '../../../store/setting/action';
import MenuDrawal from './MenuDrawal';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    };

    this.navigation = null;
    this.onLoadCall = false;
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleShowMenuDrawer = this.handleShowMenuDrawer.bind(this);
    this.handleShowCartDrawer = this.handleShowCartDrawer.bind(this);
    this.handleShowSearchDrawer = this.handleShowSearchDrawer.bind(this);
    this.resetDrawals = this.resetDrawals.bind(this);
  }

  componentDidUpdate() {
    const { props } = this;
    if (!this.onLoadCall && this.navigation && props.setting.documentLoaded) {
      const navHeight = this.navigation.offsetHeight;
      props.dispatch(changeNav({ height: navHeight }));
      this.onLoadCall = true;
    }
  }


  handleDrawerClose() {
    this.setState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  }

  handleShowMenuDrawer() {
    this.setState((prev) => ({
      menuDrawer: !prev.menuDrawer,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    }));
  }

  handleShowCartDrawer() {
    this.setState((prev) => ({
      menuDrawer: false,
      cartDrawer: prev.cartDrawer,
      searchDrawer: false,
      categoriesDrawer: false,
    }));
  }

  handleShowSearchDrawer() {
    this.setState((prev) => ({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: !prev.searchDrawer,
      categoriesDrawer: false,
    }));
  }

  resetDrawals() {
    this.setState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  }

  render() {
    const {
      menuDrawer,
      searchDrawer,
      cartDrawer,
      categoriesDrawer,
    } = this.state;

    const { sessionUser, setting, messages } = this.props;
    const { nav } = setting;
    console.log('CONSULE NAVIGATION : ', setting);
    if (!nav.show) return '';

    return (
      <div id="navigation" ref={(el) => { this.navigation = el; }}>
        <div className="navigation__content">
          <span
            className={`navigation__item ${menuDrawer === true ? 'active' : ''}`}
            onClick={this.handleShowMenuDrawer}
          >
            <i className="icon-menu" />
            <span> Menu</span>
          </span>

          {
            sessionUser && sessionUser.isVendor ? (
              <>
                <NavLink
                  to="/my-products"
                  onClick={this.resetDrawals}
                  className={`navigation__item ${categoriesDrawer === true ? 'active' : ''}`}
                >
                  <i className="icon-tags" />
                  <span>My Products</span>
                </NavLink>
                <NavLink
                  to="/my-clients"
                  className={`navigation__item ${
                    searchDrawer === true ? 'active' : ''
                  }`}
                  onClick={this.handleShowSearchDrawer}
                >
                  <i className="icon-users2" />
                  <span>My Clients</span>
                </NavLink>
              </>
            ) : (

              <>
                <NavLink
                  to="/purchases"
                  onClick={this.resetDrawals}
                  className={`navigation__item ${categoriesDrawer === true ? 'active' : ''}`}
                >
                  <i className="icon-bag2" />
                  <span>Purchases</span>
                </NavLink>
                <NavLink
                  to="/search"
                  className={`navigation__item ${
                    searchDrawer === true ? 'active' : ''
                  }`}
                  onClick={this.handleShowSearchDrawer}
                >
                  <i className="icon-magnifier" />
                  <span> Search</span>
                </NavLink>
              </>
            )
          }

          <NavLink
            to="/messages"
            className={`navigation__item ${cartDrawer === true ? 'active' : ''}`}
            onClick={this.handleShowCartDrawer}
          >
            { messages.newMessages > 0
              ? (
                <div className="counter">
                  <span>{messages.newMessages}</span>
                </div>
              ) : ''}
            <i className="icon-envelope" />
            <span>Messages</span>
          </NavLink>
        </div>
        <MenuDrawal
          {...this.props}
          onClose={this.resetDrawals}
          hide={!menuDrawer}
        />
      </div>
    );
  }
}

Navigation.propTypes = {
  documentLoaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  sessionUser: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});
export default connect(mapStateToProps)(Navigation);
