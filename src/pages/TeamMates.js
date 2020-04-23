import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../store/setting/action';
import SearchBar from '../components/shared/SearchBar';
import user3 from '../public/static/img/users/1.jpg';


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
      label: 'team mates',
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

    const clients = [
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
    ];

    return (
      <section
        id="myClients"
        style={{
          minHeight: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div
          id="top"
          style={{
            top: `${header.height}px`,
          }}
        >
          <SearchBar
            placeholder="Search"
            onEnter={() => {
              alert('ama fdfind clients for you');
            }}
          />
        </div>
        <div id="addNewContact">
          <span className="icon-plus" />
          <Link to="/invite-friend"> Invite Friend </Link>
        </div>
        <div className="client-list">
          {
            clients.map((client) => (
              <Link to={`/my-clients/${client.id}/messages`} className="client">
                <div className="avi">
                  <div className="holder">
                    <img src={client.avi} alt="" />
                  </div>
                </div>
                <p className="name">{client.firstName} {client.lastName}</p>
              </Link>
            ))
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(Messages);
