import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Composer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composer: {
        height: 0,
      },
    };

    this.composer = null;
    this.onLoadCall = false;
  }

  componentDidUpdate() {
    this.props.onComponentDidUpdate();
  }

  render() {
    const { state } = this;
    const {
      header, nav, user, reference,
    } = this.props;

    return (
      <div id="composer" ref={reference}>
        <div className="message-input-field">
          <input placeholder="Type message..." />
          <span className="icon-paper-plane icon" />
        </div>
      </div>
    );
  }
}

Composer.propTypes = {
  reference: PropTypes.func,
  onComponentDidUpdate: PropTypes.func,
};

Composer.defaultProps = {
  reference: () => {},
  onComponentDidUpdate: () => {},
};
const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default Composer;
