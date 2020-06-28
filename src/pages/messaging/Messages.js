import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import SearchBar from '../../components/shared/SearchBar';
import user3 from '../../public/static/img/users/1.jpg';
import { setSessionUser } from '../../store/auth/action';
import { getRelativeTime, alert, stringSimilarity } from '../../lib/js';
import { setInfo } from '../../store/messages/action';
import ViewMessageContacts from './ViewMessageContacts';


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickUserForNewMessage: false,
      searchBarHeight: 0,
      users: [],
      findConversation: false,
    };
    this.messageUser = this.messageUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.startNewMessage = this.startNewMessage.bind(this);
  }


  componentDidMount() {
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'Messages',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  getAllUsers(query = false, addClients = false) {
    const { state, props } = this;
    const { messages, setting, sessionUser } = props;
    const { conversations } = messages;

    let users = Object.keys(conversations).map((key) => conversations[key].palInfo);
    if (addClients || state.pickUserForNewMessage) {
      const { myClients } = props.store;
      users.push(...myClients.users);
    }

    if (query) {
      for (let i = 0; i < users.length; i += 1) {
        users[i].score = stringSimilarity(query, users[i].isVendor ? users[i].companyName : `${users[i].firstName} ${users[i].lastName}`);
      }

      users.sort((a, b) => {
        const scoreA = a.score;
        const scoreB = b.score;

        if (scoreA < scoreB) {
          return 1;
        }
        if (scoreA > scoreB) {
          return -1;
        }
        return 0;
      });

      const tempUsers = users;
      users = [];
      tempUsers.forEach((user) => {
        if (user.score > 0) {
          users.push(user);
        }
      });
    }

    console.log('XXXXXXXXXXXXX', { users });
    this.setState({ users });
  }

  messageUser(user) {
    const { props } = this;

    props.setMessageInfo({ chatReciever: user });
    props.history.push('/messages/chat');
  }


  startNewMessage() {
    const { props } = this;
    this.props.changeHeader({
      type: 'goBack',
      label: 'new Message',
      onGoBack: () => {
        this.props.history.goBack();
        this.setState({
          users: [],
          pickUserForNewMessage: false,
        });

        this.props.changeHeader({
          type: 'goBack',
          label: 'Message',
          onGoBack: () => {
            this.props.history.goBack();
          },
        });
      },
    });

    document.querySelector('#messages').scrollTop = 0;
    props.history.push('/messages/new');
    this.setState({ pickUserForNewMessage: true });
    this.getAllUsers(false, true);
  }

  render() {
    const { state, props } = this;
    const { messages, setting, sessionUser } = props;
    const { nav, header } = setting;
    const { conversations } = messages;
    const conversationsKeys = Object.keys(conversations);

    console.log({
      conversations,
    });
    return (
      <>
        <section
          id="messages"
          style={{
            height: `calc(100vh - ${nav.height + header.height}px)`,
            overflow: state.pickUserForNewMessage ? 'hidden' : '',
          }}
        >
          <div id="top">
            <div
              id="searchBar"
              ref={(e) => {
                if (e && state.searchBarHeight === 0) {
                  this.setState({ searchBarHeight: e.offsetHeight });
                }
              }}
            >
              <SearchBar
                placeholder="Search for clients and followers"
                onChange={(query) => {
                  this.getAllUsers(query);
                }}
                onFocus={() => {
                  this.setState({ findConversation: true });
                  if (!state.pickUserForNewMessage) {
                    this.getAllUsers();
                  }
                }}
                onBlur={() => {
                  if (!state.pickUserForNewMessage) {
                    this.setState({ users: [], findConversation: false });
                  }
                }}
              />
              {/* <span className="canceller">cancel</span> */}
            </div>

          </div>
          <div
            id="clientMessages"
          >
            {(() => {
              if (messages.loading) {
                return <p className="page-loader" />;
              }

              return conversationsKeys.length > 0 ? conversationsKeys.map((palId) => {
                const conversation = conversations[palId];
                const { palInfo, newMessages, chat } = conversation;
                console.log('MESSAGES MESSAGES');
                const lastMessage = chat[chat.length - 1];
                return lastMessage ? (
                  <div
                    className={`client-message${palInfo.isVendor ? ' vendor' : ''}`}
                    onClick={() => { this.messageUser(palInfo); }}
                  >
                    <div className="avi">
                      <div className="holder">
                        <img
                          src={palInfo.displayImage}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="details">
                      <div className="name-time">
                        <p className="name">{!palInfo.isVendor ? `${palInfo.firstName} ${palInfo.lastName}` : palInfo.companyName}</p>
                        <span className="time">{getRelativeTime(lastMessage.sentOn, true, 'number-without-time')}</span>
                      </div>
                      <div className="messages">
                        <p className="last-message">
                          {`${lastMessage.sender.id}` === `${sessionUser.id}` ? 'you : ' : ''}
                          {lastMessage.content}
                        </p>
                        { newMessages > 0
                          ? (
                            <div className="counter">
                              <span>
                                {newMessages}
                              </span>
                            </div>
                          ) : ''}
                      </div>
                    </div>
                  </div>
                ) : '';
              }) : <p className="page-empty-msg x2">Start a conversation with someone</p>;
            })()}
          </div>

          <div
            id="createMessage"
            style={{ bottom: `calc(1em + ${nav.height}px)` }}
          >
            <div
              onClick={this.startNewMessage}
            >
              <span className="icon-pencil" />
            </div>
          </div>
          <ViewMessageContacts
            {...props}
            style={{
              height: `calc(100vh - ${nav.height + state.searchBarHeight + header.height}px)`,
              top: state.findConversation ? header.height + state.searchBarHeight : '',
            }}
            users={state.users}
          />
        </section>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  setMessageInfo: (props) => dispatch(setInfo(props)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Messages);
