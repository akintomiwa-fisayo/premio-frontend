import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../store/setting/action';
import InputField from '../components/elements/InputField';
import { isEmail, alert } from '../lib/js';

class InviteFriend extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      submitting: false,
      email: '',
      emailError: false,
    };

    this.sendInvitation = this.sendInvitation.bind(this);
  }

  componentDidMount() {
    this.props.onComponentMount();
    this._isMounted = true;
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'invite friend',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.dispatch(resetHeader());
  }

  sendInvitation() {
    const { props, state } = this;
    const { submitting } = state;
    const { sessionUser } = props;
    // const query = this.parseQueryString(this.props.location.search);

    if (!submitting) {
      const isValidEmail = isEmail(state.email);
      this.setState({ emailError: isValidEmail ? false : 'invalid email' });

      if (isValidEmail) {
        this.setState({ submitting: true });
        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/send_invitation`,
          method: 'post',
          body: `{
          "email": "${state.email}"
        }`,
          headers: {
            'content-Type': 'application/json',
          },
        }).then(() => {
          alert('Invitation sent successfully', '', [{ text: 'ok' }]);
        }).finally(() => {
          if (this._isMounted) {
            this.setState({ email: '', submitting: false });
          }
        });
      }
    }
  }

  render() {
    const { state } = this;
    return (
      <section id="inviteFriend" className="ps-container">
        <span>Your friend will recieve an invitation email from Premio</span>
        <InputField
          value={state.email}
          label={(
            <>
              Email
              {state.emailError !== false
                ? (
                  <span className="error"> : {state.emailError} </span>
                ) : ''}
            </>
          )}
          onChange={(email) => {
            this.setState({ email });
          }}
        />
        <button
          type="button"
          className={`btn btn-default${state.submitting ? ' disabled' : ''}`}
          onClick={this.sendInvitation}
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
