import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { appendToTexts, updateTextsOfTexts } from '../../store/messages/action';
import { isEmpty } from '../../lib/js';

class Composer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.composer = null;
    this.onLoadCall = false;
    this.onUpdate = this.onUpdate.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    // this.props.onComponentDidUpdate();
  }

  onUpdate(el) {
    if (el) this.composer = el;
    this.props.onUpdate(this.composer);
  }

  sendMessage() {
    const { message } = this.state;
    if (!isEmpty(message)) {
      const {
        sessionUser, reciever, appendToTexts, updateTextsOfTexts, fetchRequest,
      } = this.props;

      // create the sample message
      const text = {
        id: `new-message-${Date.now()}`,
        sender: {
          id: sessionUser.id,
          isVendor: sessionUser.isVendor,
          displayImage: sessionUser.displayImage,
          firstName: sessionUser.firstName,
          lastName: sessionUser.lastName,
          companyName: sessionUser.companyName,
        },
        reciever: {
          id: reciever.id,
          isVendor: reciever.isVendor,
          displayImage: reciever.displayImage,
          firstName: reciever.firstName,
          lastName: reciever.lastName,
        },
        sent: false,
        delivered: false,
        seen: false,
        content: message,
        sentOn: Date.now(),
      };

      this.setState({ message: '' });
      appendToTexts([text]);

      fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/messages`,
        method: 'POST',
        body: JSON.stringify({
          reciever: reciever.id,
          content: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        updateTextsOfTexts([text.id], [{
          id: res.id,
          sent: true,
        }]);
      });
    }
  }

  render() {
    const { state } = this;
    const { onChange, style } = this.props;

    return (
      <div
        id="composer"
        style={style}
        ref={this.onUpdate}
      >
        <div className="message-input-field">
          {/* <input placeholder="Type message..." /> */}
          <TextareaItem
            autoHeight
            placeholder="Type message..."
            value={state.message}
            onChange={(value) => {
              this.onUpdate();
              onChange(value);
              this.setState({ message: value });
            }}
            // ref={(el) => this.customFocusInst = el}
          />
          <span className="icon-paper-plane icon" onClick={this.sendMessage} />
        </div>
      </div>
    );
  }
}

Composer.propTypes = {
  onUpdate: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

Composer.defaultProps = {
  onUpdate: () => {},
  onChange: () => {},
  style: {},
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  appendToTexts: (texts) => dispatch(appendToTexts(texts)),
  updateTextsOfTexts: (ids, props) => dispatch(updateTextsOfTexts(ids, props)),
});

export default connect(null, mapDispatchToProps)(Composer);
