import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../store/setting/action';
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
      <section id="inviteFriend" className="ps-container">
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
