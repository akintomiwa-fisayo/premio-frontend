import React, { Component } from 'react';
import { getRelativeTime } from '../../lib/js';


class ChatText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: getRelativeTime(props.text.sentOn, true, 'number'),
    };

    this.datTimeInterval = null;
    this.updateDateTime = this.updateDateTime.bind(this);
  }

  componentDidMount() {
    setInterval(this.updateDateTime, 60000);
  }

  updateDateTime() {
    const { text } = this.props;
    this.setState({
      dateTime: getRelativeTime(text.sentOn, true, 'number'),
    });
  }

  render() {
    const { state, props } = this;
    const { text, sessionUser } = props;


    return (
      <div className={`message ${sessionUser.id === text.sender.id ? 'sender' : 'reciever'}`}>
        <div className="content"> {text.content} </div>
        <div className="details">
          {text.sent !== false
            ? <span className="date-time">{state.dateTime}</span>
            : ''}
          {(() => {
            if (sessionUser.id !== text.sender.id) return '';

            if (text.seen) {
              return (
                <>
                  <span className="icon-check status seen" />
                  <span className="icon-check status seen" />
                </>
              );
            }

            if (text.delivered) {
              return (
                <>
                  <span className="icon-check status" />
                  <span className="icon-check status" />
                </>
              );
            }

            if (text.sent) {
              return <span className="icon-check status" />;
            }

            return <span className="icon-clock3 status" />;
          })()}
        </div>
      </div>
    );
  }
}

export default (ChatText);
