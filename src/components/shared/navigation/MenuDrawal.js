import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavLink, Link } from 'react-router-dom';
import user3 from '../../../public/static/img/users/3.jpg';

class PanelMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      hide, nav, onClose, user,
    } = this.props;

    return (
      <div
        id="menuDrawal"
        className={`ps-panel__wrapper${hide ? ' hide' : ''}`}
        style={{ height: `calc(100vh - ${nav.height}px)` }}
      >
        <div className="bk-block" onClick={onClose} />

        <div className="content">
          <div className="user">
            <Link
              to="/account/owner"
              className={`avi${user.accountType === 'vendor' ? ' vendor' : ''}`}
              onClick={onClose}
            >
              <img src={user3} alt="" />
            </Link>
            <Link to="/account/owner" className="name" onClick={onClose}>akintomiwa fisayo</Link>
            <Link to="/account/owner" className="handle" onClick={onClose}>@akintomiwaF</Link>
          </div>

          <NavLink className="nav-link" to="/home" exact onClick={onClose}>
            <span className="icon icon-home3" />
            <h5>Home </h5>
          </NavLink>

          <NavLink className="nav-link" to="/account/owner" exact onClick={onClose}>
            <span className="icon icon-user" />
            <h5>Profile </h5>
          </NavLink>

          {user.accountType === 'vendor' ? (
            <>
              <NavLink className="nav-link" to="/search" exact onClick={onClose}>
                <span className="icon icon-magnifier" />
                <h5>Search </h5>
              </NavLink>

              <NavLink className="nav-link" to="/sales-report" onClick={onClose}>
                <span className="icon icon-clipboard-text" />
                <h5>Sales</h5>
              </NavLink>

              <NavLink className="nav-link" to="/purchases" onClick={onClose}>
                <span className="icon icon-bag2" />
                <h5>Purchases</h5>
              </NavLink>
            </>
          ) : ''}

          <NavLink className="nav-link" to="/my-commisions" onClick={onClose}>
            <span className="icon icon-coin-dollar" />
            <h5>Commisions </h5>
          </NavLink>
          <NavLink className="nav-link" to="/team-mates" onClick={onClose}>
            <span className="icon icon-group-work" />
            <h5>Team mates </h5>
          </NavLink>
          <NavLink className="nav-link" to="/invite-friend" onClick={onClose}>
            <span className="icon icon-user-plus" />
            <h5>Invite friend</h5>
          </NavLink>
          <NavLink className="nav-link" to="/logout" onClick={onClose}>
            <span className="icon icon-exit-left" />
            <h5>Log out </h5>
          </NavLink>
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
