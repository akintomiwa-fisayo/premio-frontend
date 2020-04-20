import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import PanelMenu from '../panel/PanelMenu';
import PanelCartMobile from '../panel/PanelCartMobile';
import PanelSearch from '../panel/PanelSearch';
import PanelCategories from '../panel/PanelCategories';
import { changeNav } from '../../../store/setting/action';

class NavigationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
      navHeight: 0,
    };

    this.navigationList = null;
    this.onLoadCall = false;
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleShowMenuDrawer = this.handleShowMenuDrawer.bind(this);
    this.handleShowCartDrawer = this.handleShowCartDrawer.bind(this);
    this.handleShowSearchDrawer = this.handleShowSearchDrawer.bind(this);
    this.resetDrawals = this.resetDrawals.bind(this);
  }

  componentDidUpdate() {
    const { props } = this;
    if (!this.onLoadCall && this.navigationList && props.documentLoaded) {
      const navHeight = this.navigationList.offsetHeight;
      this.setState(() => ({
        navHeight,
      }));
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
    this.setState({
      menuDrawer: !this.state.menuDrawer,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  }

  handleShowCartDrawer() {
    this.setState({
      menuDrawer: false,
      cartDrawer: !this.state.cartDrawer,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  }

  handleShowSearchDrawer() {
    this.setState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: !this.state.searchDrawer,
      categoriesDrawer: false,
    });
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
      navHeight,
    } = this.state;

    const { user, nav } = this.props;

    if (!nav.show) return '';


    if (user.type === 'vendor') {
      return (
        <div className="navigation--list" ref={(el) => { this.navigationList = el; }}>
          <Drawer
            className="ps-panel--mobile"
            placement="left"
            closable={false}
            onClose={this.handleDrawerClose}
            visible={this.state.menuDrawer}
          >
            <PanelMenu close={this.resetDrawals} />
          </Drawer>
          <div className="navigation__content">
            <span
              className={`navigation__item ${menuDrawer === true ? 'active' : ''}`}
              onClick={this.handleShowMenuDrawer}
            >
              <i className="icon-menu" />
              <span> Menu</span>
            </span>
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
            <NavLink
              to="/messages"
              className={`navigation__item ${cartDrawer === true ? 'active' : ''}`}
              onClick={this.handleShowCartDrawer}
            >
              <i className="icon-envelope" />
              <span>Messages</span>
            </NavLink>
          </div>
        </div>
      );
    }

    return (
      <div className="navigation--list" ref={(el) => { this.navigationList = el; }}>
        <Drawer
          className="ps-panel--mobile"
          placement="left"
          closable={false}
          onClose={this.handleDrawerClose}
          visible={this.state.menuDrawer}
        >
          <PanelMenu close={this.resetDrawals} />
        </Drawer>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={this.handleDrawerClose}
          visible={this.state.cartDrawer}
        >
          <PanelCartMobile navHeight={navHeight} />
        </Drawer>
        <Drawer
          className="ps-panel--mobile"
          placement="right"
          closable={false}
          onClose={this.handleDrawerClose}
          visible={this.state.searchDrawer}
        >
          <PanelSearch close={this.resetDrawals} />
        </Drawer>
        <div className="navigation__content">
          <span
            className={`navigation__item ${menuDrawer === true ? 'active' : ''}`}
            onClick={this.handleShowMenuDrawer}
          >
            <i className="icon-menu" />
            <span> Menu</span>
          </span>
          <NavLink
            to="/purchases"
            onClick={this.resetDrawals}
            className={`navigation__item ${categoriesDrawer === true ? 'active' : ''}`}
          >
            <i className="icon-user" />
            <span>Purchases</span>
          </NavLink>
          <span
            className={`navigation__item ${
              searchDrawer === true ? 'active' : ''
            }`}
            onClick={this.handleShowSearchDrawer}
          >
            <i className="icon-magnifier" />
            <span> Search</span>
          </span>
          <span
            className={`navigation__item ${cartDrawer === true ? 'active' : ''}`}
            onClick={this.handleShowCartDrawer}
          >
            <i className="icon-bag2" />
            <span> Cart</span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});
export default connect(mapStateToProps)(NavigationList);
