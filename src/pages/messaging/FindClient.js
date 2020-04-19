import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../../components/partials/account/ChangePassword';
import BecomeVendor from '../../components/partials/account/BecomeVendor';
import SearchBar from '../../components/shared/SearchBar';
import { getRelativeTime } from '../../lib/js';
import Composer from './Composer';
import user3 from '../../public/static/img/users/3.jpg';


class FindClient extends Component {
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

  render() {
    const { finder } = this.state;
    const { header, nav, user } = this.props;

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
    ];

    return (
      <section id="messageFindClient">
        <div id="findClient">
          <div className="message-input-field">
            <span
              className="icon-user all-contacts"
              onClick={() => {
                this.changeFinder({
                  focus: true,
                  showClientList: true,
                });
              }}
            />
            <input
              placeholder="Search for client"
              onFocus={() => {
                this.changeFinder({
                  focus: true,
                });
              }}
              onChange={() => {
                this.changeFinder({
                  showClientList: true,
                });
              }}
              onBlur={() => {
                this.changeFinder({
                  focus: false,
                  showClientList: false,
                });
              }}
              ref={(e) => {
                if (e && finder.focus) {
                  console.log('we going to focus the nigga');
                  e.focus();
                }
              }}
            />
            <span className="icon-magnifier search" />
          </div>
        </div>

        <div className={`client-list${finder.showClientList ? '' : ' hide'}`}>
          {
            clients.map((client) => (
              <Link to={`/messages/${client.id}`} className="client">
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
  ...state.auth,
});

export default connect(mapStateToProps)(FindClient);
