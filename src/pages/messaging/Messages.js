import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../../components/partials/account/ChangePassword';
import BecomeVendor from '../../components/partials/account/BecomeVendor';
import SearchBar from '../../components/shared/SearchBar';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateDetails: false,
      changePassword: false,
    };

    this.updateDetails = this.updateDetails.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.becomeVendor = this.becomeVendor.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'Messages',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  updateDetails(updateDetails = true) {
    this.setState(() => ({
      updateDetails,
    }
    ));
  }

  changePassword(changePassword = true) {
    this.setState(() => ({
      changePassword,
    }));
  }

  becomeVendor(becomeVendor = true) {
    this.setState(() => ({
      becomeVendor,
    }));
  }

  render() {
    const { state } = this;
    const { header, nav, user } = this.props;
    console.log({ header, nav });

    const clientMessages = [
      {
        id: 12,
        avi: '/static/img/users/3.jpg',
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        lastMessage: {
          sender: 12,
          content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
          sentOn: 'today',
        },

      },
      {
        id: 11,
        avi: '/static/img/users/3.jpg',
        firstName: 'Mr',
        lastName: 'shola',
        lastMessage: {
          sender: 13,
          content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
          sentOn: 'today',
        },

      },
      {
        id: 12,
        avi: '/static/img/users/3.jpg',
        firstName: 'Fine-boy',
        lastName: 'samuel',
        lastMessage: {
          sender: 12,
          content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
          sentOn: 'today',
        },

      },
      {
        id: 12,
        avi: '/static/img/users/3.jpg',
        firstName: 'Akintomiwa',
        lastName: 'fisayo',
        lastMessage: {
          sender: 12,
          content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
          sentOn: 'today',
        },

      },
      {
        id: 12,
        avi: '/static/img/users/3.jpg',
        firstName: 'Mr',
        lastName: 'shola',
        lastMessage: {
          sender: 12,
          content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
          sentOn: 'today',
        },

      },
      {
        id: 12,
        avi: '/static/img/users/3.jpg',
        firstName: 'Fine-boy',
        lastName: 'samuel',
        lastMessage: {
          sender: 12,
          content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
          sentOn: 'today',
        },

      },
    ];

    return (
      <section
        id="messages"
        style={{
          minHeight: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div id="top">
          <SearchBar
            placeholder="Search"
            onEnter={() => {
              alert('ama fdfind clients for you');
            }}
          />
        </div>
        <div id="clientMessages">
          {clientMessages.map((clientMessage) => (
            <Link to={`/my-clients/${clientMessage.id}/messages`} className="client-message">
              <div className="avi">
                <div className="holder">
                  <img src={clientMessage.avi} alt="" />
                </div>
              </div>
              <div className="details">
                <div className="name-time">
                  <p className="name">{clientMessage.firstName} {clientMessage.lastName}</p>
                  <span className="time">{clientMessage.lastMessage.sentOn}</span>
                </div>
                <p className="last-message">
                  {clientMessage.lastMessage.sender !== clientMessage.id ? 'you : ' : ''}
                  {clientMessage.lastMessage.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/messages/new"
          id="newMessage"
          style={{ bottom: `calc(1em + ${nav.height}px)` }}
        >
          <span className="icon-pencil" />
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(Messages);
