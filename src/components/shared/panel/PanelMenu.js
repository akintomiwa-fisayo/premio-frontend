import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { menuPrimary } from '../../../public/static/data/menu';

const { SubMenu } = Menu;

class PanelMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, header } = this.props;
    let AccountLinks = (
      <NavLink to="/search" onClick={this.props.close}>
        <span className="icon icon-tag" />
        <h5>Products </h5>
      </NavLink>
    );

    if (user.type === 'vendor') {
      AccountLinks = (
        <NavLink to="/sales-report" onClick={this.props.close}>
          <span className="icon icon-clipboard-text" />
          <h5>Sales report </h5>
        </NavLink>
      );
    }

    return (
      <div id="menuDrawalContent" className="ps-panel__wrapper">
        <div className="ps-panel__header" style={{ height: `${header.height}px` }}>
          <h3>Menu</h3>
        </div>
        <div className="ps-panel__content">
          <div id="navMenu">
            <NavLink to="/" exact onClick={this.props.close}>
              <span className="icon icon-home3" />
              <h5>Home </h5>
            </NavLink>
            {
              AccountLinks
            }
            <NavLink to="/my-commisions" onClick={this.props.close}>
              <span className="icon icon-coin-dollar" />
              <h5>My commisions </h5>
            </NavLink>
            <NavLink to="/team-mates" onClick={this.props.close}>
              <span className="icon icon-group-work" />
              <h5>Team mates </h5>
            </NavLink>
            <NavLink to="/invite-friend" onClick={this.props.close}>
              <span className="icon icon-group-work" />
              <h5>Invite friend</h5>
            </NavLink>
            <NavLink to="/logout" onClick={this.props.close}>
              <span className="icon icon-exit-left" />
              <h5>Log out </h5>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default connect(mapStateToProps)(PanelMenu);
