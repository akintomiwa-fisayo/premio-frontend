import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'antd-mobile';
import { List } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../store/setting/action';
import ChangePassword from '../components/partials/account/ChangePassword';
import BecomeVendor from '../components/partials/account/BecomeVendor';
import user3 from '../public/static/img/users/3.jpg';
import user1 from '../public/static/img/users/1.jpg';
import InputField from '../components/elements/InputField';

class InviteFriend extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'invite friend',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }


  render() {
    const { header, nav } = this.props;
    return (
      <section
        id="inviteFriend"
        className="ps-container"
        style={{
          minHeight: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <span>Your friend will recieve a text message tell him/her that you are iniviting him/her to join premio</span>
        <InputField
          label="Phone no"
        />
        <button
          type="button"
          className="btn btn-glass"
          onClick={this.changePassword}
        >Send invitation
        </button>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(InviteFriend);
