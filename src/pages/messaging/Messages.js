import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../account/myAccount/ChangePassword';
import BecomeVendor from '../account/myAccount/BecomeVendor';
import SearchBar from '../../components/shared/SearchBar';
import user3 from '../../public/static/img/users/1.jpg';


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
    const { nav } = this.props;

    const clientMessages = [
      {
        id: 12,
        avi: user3,
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
        avi: user3,
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
        avi: user3,
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
        avi: user3,
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
        avi: user3,
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
        avi: user3,
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
      <section id="messages">
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

        <div
          id="createMessage"
          style={{ bottom: `calc(1em + ${nav.height}px)` }}
        >
          <Link to="/messages/new">
            <span className="icon-pencil" />
          </Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(Messages);
