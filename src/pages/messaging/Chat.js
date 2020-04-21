import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../../components/partials/account/ChangePassword';
import BecomeVendor from '../../components/partials/account/BecomeVendor';
import SearchBar from '../../components/shared/SearchBar';
import { getRelativeTime } from '../../lib/js';
import Composer from './Composer';
import user1 from '../../public/static/img/users/1.jpg';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composer: {
        height: 0,
      },
    };

    this.composer = null;
    this.onLoadCall = false;
    this.regComposerHeight = this.regComposerHeight.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'Client Name',
      icon: (
        <Link to="/account/client">
          <img src={user1} alt="" />
        </Link>),
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }


  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  regComposerHeight() {
    const { props } = this;
    if (this.composer && !this.onLoadCall && props.documentLoaded) {
      this.onLoadCall = true;
      const height = this.composer.offsetHeight;
      this.setState((prevState) => ({
        composer: {
          ...prevState,
          height,
        },
      }));
    }
  }

  render() {
    const { state } = this;
    const { header, nav, user } = this.props;

    const conversation = [
      {
        sender: 12,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: '08/11/2019',
        status: 'seen',
      },
      {
        sender: 11,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: '08/11/2019',
        status: 'seen',
      },
      {
        sender: 12,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: '08/11/2019',
        status: 'seen',
      },
      {
        sender: 11,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: '08/11/2019',
        status: 'seen',
      },
      {
        sender: 12,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: '08/11/2019',
        status: 'seen',
      },
      {
        sender: 11,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: '08/11/2019',
        status: 'seen',
      },
      {
        sender: 12,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: 'today',
        status: 'sent',
      },
      {
        sender: 11,
        content: 'the content of the message last sent to you comes down here but it will be truncated if it spans more than two lines',
        sentOn: 'today',
        status: 'sent',
      },
    ];

    return (
      <section
        id="messageChat"
        style={{
          height: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div
          id="conversation"
          style={{
            height: `calc(100vh - ${header.height + nav.height + state.composer.height}px)`,
          }}
        >
          {
            conversation.map((message) => (
              <div className={`message ${user.id === message.sender ? 'sender' : 'reciever'}`}>
                <div className="content"> {message.content} </div>
                <div className="details">
                  <span>{getRelativeTime(message.sentOn)}</span>
                  <span className={`icon-check status _${message.status}`} />
                </div>
              </div>
            ))
          }
        </div>
        <Composer
          onComponentDidUpdate={this.regComposerHeight}
          reference={(e) => {
            console.log('the e is ', e);
            this.composer = e;
          }}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default connect(mapStateToProps)(Chat);
