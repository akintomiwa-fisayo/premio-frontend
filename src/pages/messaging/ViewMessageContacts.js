import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeHeader, resetHeader } from '../../store/setting/action';
import { getRelativeTime } from '../../lib/js';
import Composer from './Composer';
import user3 from '../../public/static/img/users/3.jpg';


class ViewMessageContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composer: {
        height: 0,
      },
      finder: {
        focus: false,
        showClientList: false,
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
          ...prevState.composer,
          height,
        },
      }));
    }
  }

  changeFinder(finder, callback) {
    this.setState((prevState) => ({
      finder: {
        ...prevState.finder,
        ...finder,
      },
    }));
  }

  messageUser(user) {
    const { props } = this;

    props.setMessageInfo({ chatReciever: user });
    props.history.push('/messages/chat');
  }

  render() {
    const { state, props } = this;
    const { finder } = this.state;
    const { header, nav, users } = this.props;

    const show = users.length > 0;

    return (
      <section id="messageFindClient" style={{ ...props.style }} className={`${show ? 'show' : ''}`}>
        <div className="client-list">
          {
            users.map((user) => (
              <div
                className="client vendor"
                onClick={() => {
                  this.messageUser(user);
                }}
              >
                <div className={`avi${user.isVendor ? ' vendor' : ''}`}>
                  <div className="holder">
                    <img src={user.displayImage} alt="" />
                  </div>
                </div>
                <p className="name">{!user.isVendor ? `${user.firstName} ${user.lastName}` : user.companyName}</p>
              </div>
            ))
          }
        </div>
      </section>
    );
  }
}

ViewMessageContacts.propTypes = {
  style: PropTypes.object,
};

ViewMessageContacts.defaultProps = {
  style: {},
};

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default connect(mapStateToProps)(ViewMessageContacts);
