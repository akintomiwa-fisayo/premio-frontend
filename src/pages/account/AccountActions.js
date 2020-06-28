import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { appendToConversations, setInfo } from '../../store/messages/action';
import { alert } from '../../lib/js';

class AccountActions extends Component {
  constructor(props) {
    super(props);

    this.followAction = this.followAction.bind(this);
    this.messageUser = this.messageUser.bind(this);
  }


  followAction() {
    const { props } = this;
    const { sessionUser, accountDetails } = this.props;

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/followers`,
      method: accountDetails.isFollowing ? 'DELETE' : 'POST',
      body: JSON.stringify({
        followee: accountDetails.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    props.setInfo({
      details: {
        ...accountDetails,
        isFollowing: !accountDetails.isFollowing,
      },
    });
  }

  messageUser() {
    const { props } = this;
    const { accountDetails } = this.props;

    props.setMessageInfo({ chatReciever: accountDetails });
    props.history.push('/messages/chat');
  }

  render() {
    const { props } = this;
    const {
      sessionUser,
      accountDetails,
    } = props;

    console.log('Account props', props);

    return (
      <div className="actions">
        {accountDetails.isVendor
          ? (
            <button
              type="button"
              className="btn btn-glass"
              onClick={this.followAction}
            >{accountDetails.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )
          : '' }

        <button
          type="button"
          className="btn btn-glass"
          onClick={this.messageUser}
        >Message
        </button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMessageInfo: (props) => dispatch(setInfo(props)),
});

export default connect(null, mapDispatchToProps)(AccountActions);
