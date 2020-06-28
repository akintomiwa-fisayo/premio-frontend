import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

class PanelMenu extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    localStorage.removeItem('sessionUserToken');
    localStorage.removeItem('sessionUserId');
    this.props.setSessionUser(false);
    this.props.history.push('sign-in');
  }

  render() {
    const {
      hide, nav, onClose, sessionUser,
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
              to="/profile"
              className={`avi${sessionUser.isVendor ? ' vendor' : ''}`}
              onClick={onClose}
            >
              <img src={sessionUser.displayImage} alt="" />
            </Link>
            <Link
              to="/profile"
              className="name"
              onClick={onClose}
            >{
              sessionUser.isVendor
                ? sessionUser.companyName
                : `${sessionUser.firstName} ${sessionUser.lastName}`
            }
            </Link>
            {/* <Link to={`/profile`}
             className="handle" onClick={onClose}>{}</Link> */}
          </div>

          <NavLink className="nav-link" to="/home" exact onClick={onClose}>
            <span className="icon icon-home3" />
            <h5>Home </h5>
          </NavLink>

          <NavLink className="nav-link" to="/profile" exact onClick={onClose}>
            <span className="icon icon-user" />
            <h5>Profile </h5>
          </NavLink>

          {sessionUser.isVendor ? (
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
          <div className="nav-link" onClick={this.signOut}>
            <span className="icon icon-exit-left" />
            <h5>Log out </h5>
          </div>
        </div>
      </div>
    );
  }
}

PanelMenu.propTypes = {
  sessionUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  hide: PropTypes.object.isRequired,
  setSessionUser: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default connect(mapStateToProps)(PanelMenu);
