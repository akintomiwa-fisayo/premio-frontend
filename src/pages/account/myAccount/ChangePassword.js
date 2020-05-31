import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../../store/setting/action';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { header, nav, onClose } = this.props;

    return (
      <div
        id="changePassword"
        style={{
          height: `calc(100vh - ${header.height + nav.height}px)`,
          top: `${header.height}px`,
        }}
        onClick={onClose}
      >
        <div className="content" onClick={(e) => { e.stopPropagation(); }}>
          <div className="header">Change Password</div>

          <div className="user-detail">
            <p className="label">new password</p>
            <input type="password" className="detail" />
          </div>

          <div className="user-detail">
            <p className="label">confirm password</p>
            <input type="password" className="detail" />
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn btn-glass"
              onClick={onClose}
            >Cancel
            </button>

            <button
              type="button"
              className="ps-btn ps-btn--black btn"
            >Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ChangePassword);
