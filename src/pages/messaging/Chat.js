import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { compose } from 'redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import { getRelativeTime } from '../../lib/js';
import Composer from './Composer';
import user1 from '../../public/static/img/users/1.jpg';
import ChatText from './ChatText';
import { updateTextsOfTexts } from '../../store/messages/action';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composer: {
        height: 0,
      },
      palId: props.match.params.reciever,
    };

    this.composer = null;
    this.onLoadCall = false;
    this.regComposerHeight = this.regComposerHeight.bind(this);
    this.markAsSeen = this.markAsSeen.bind(this);
  }

  componentDidMount() {
    const { props, state } = this;
    const { chatReciever } = props.messages;
    props.onComponentMount();
    props.dispatch(changeHeader({
      type: 'goBack',
      label: chatReciever.isVendor
        ? chatReciever.companyName
        : `${chatReciever.firstName} ${chatReciever.lastName}`,
      icon: (
        <Link to={`/account/${chatReciever.id}`}>
          <img src={chatReciever.displayImage} alt="" />
        </Link>),
      onGoBack: () => {
        props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  regComposerHeight(composer) {
    const { props } = this;
    if (composer && props.setting.documentLoaded) {
      const height = composer.offsetHeight;
      console.log('INSIDE COMPOSE HEIGHT REG ', height);
      this.setState((prevState) => ({
        composer: {
          ...prevState.composer,
          height,
        },
      }));
    }
  }

  markAsSeen(messageIds) {
    if (messageIds.length > 0) {
      const { props } = this;
      const { fetchRequest, sessionUser, updateTextsOfTexts } = props;
      fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/messages/mark_as_seen`,
        method: 'PATCH',
        body: JSON.stringify({
          messageIds,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Update the seen texts in store
      updateTextsOfTexts(messageIds, messageIds.map(() => ({ seen: true })));
    }
  }

  render() {
    const { state, props } = this;
    const { setting, messages, sessionUser } = props;
    let chat = [];

    const { header, nav } = setting;

    const { conversations, chatReciever } = messages;
    console.log({ conversations, chatReciever });
    if (!chatReciever) return '';

    //  check if user has chat with rciever before
    if (conversations[chatReciever.id]) {
      chat = conversations[chatReciever.id].chat;
      const justSeenMessageIds = [];
      chat.forEach((text) => {
        if (text.reciever.id === sessionUser.id && !text.seen) {
          justSeenMessageIds.push(text.id);
        }
      });

      if (justSeenMessageIds.length > 0) {
        this.markAsSeen(justSeenMessageIds);
      }
    } else {
      chat = [];
    }


    return (
      <section id="messageChat">
        <div
          id="conversation"
          style={{
            height: `calc(100vh - ${header.height + nav.height + state.composer.height}px)`,
          }}
          ref={(el) => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          {chat.length > 0
            ? chat.map((text) => (
              <ChatText
                {...props}
                text={text}
              />
            ))
            : (
              <p className="page-empty-msg">Start a conversation with <strong>{chatReciever.isVendor ? chatReciever.companyName : `${chatReciever.firstName} ${chatReciever.lastName}`}</strong></p>
            )}
        </div>
        <Composer
          {...props}
          style={{
            top: 'auto',
            bottom: `${nav.height}px`,
          }}
          onUpdate={this.regComposerHeight}
          reciever={chatReciever}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProp = (dispatch) => ({
  updateTextsOfTexts: (ids, props) => dispatch(updateTextsOfTexts(ids, props)),
});

export default connect(mapStateToProps, mapDispatchToProp)(Chat);
