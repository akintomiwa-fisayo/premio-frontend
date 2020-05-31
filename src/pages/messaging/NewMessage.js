import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../account/myAccount/ChangePassword';
import BecomeVendor from '../account/myAccount/BecomeVendor';
import SearchBar from '../../components/shared/SearchBar';
import { getRelativeTime } from '../../lib/js';
import Composer from './Composer';
import FindClient from './FindClient';

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
      label: 'New Message',
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

    return (
      <section id="newMessage">
        <div
          id="holder"
          style={{
            height: `calc(100vh - ${header.height + nav.height + state.composer.height}px)`,
          }}
        >
          <FindClient />
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
