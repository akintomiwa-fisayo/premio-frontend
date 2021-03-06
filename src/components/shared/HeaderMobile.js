import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeHeader } from '../../store/setting/action';
import SearchBar from './SearchBar';
import user3 from '../../public/static/img/users/3.jpg';

class HeaderMobile extends Component {
  constructor(props) {
    super(props);

    this.onLoadCall = false;
    this.header = null;
  }

  componentDidUpdate() {
    const { props } = this;
    if (!this.onLoadCall && this.header && props.documentLoaded) {
      const navHeight = this.header.offsetHeight;
      props.dispatch(changeHeader({ height: navHeight }));
      this.onLoadCall = true;
    }
  }

  render() {
    const { props } = this;
    const { state } = this;
    const {
      type, noUser, onGoBack, label, show, icon,
    } = props.header;

    const { cartProducts } = props;

    if (!show) return '';
    console.log('HEADER', props);

    let leftComp = <span className="icon-home3 icon" />;
    let centerComp = (
      <SearchBar
        {...props}
        onEnter={(searchQuery) => {
          props.history.push(`/search/${searchQuery}`);
        }}
      />
    );
    const rightComp = noUser ? '' : icon || (
      <Link to="/cart" id="cartIcon">
        <span className="icon icon-cart" />
        <div className="counter">
          <span>{cartProducts.length || 0}</span>
        </div>
      </Link>
    );

    if (type === 'goBack') {
      leftComp = (
        <span className="icon-chevron-left icon" onClick={onGoBack} />
      );

      centerComp = <span className="nav-label">{label}</span>;
    }

    return (
      <header id="header" ref={(e) => { this.header = e; }}>
        <div className="left">
          {leftComp}
        </div>
        <div className="center">
          {centerComp}
        </div>
        <div className="right">
          {rightComp}
        </div>
      </header>
    );
  }
}

HeaderMobile.propTypes = {
  type: PropTypes.string,
  onGoBack: PropTypes.func,
  noUser: PropTypes.object,
  show: PropTypes.bool,
};

HeaderMobile.defaultProps = {
  type: 'home',
  onGoBack: () => {},
  noUser: false,
  show: true,
};

const mapStateToProps = (state) => (
  {
    ...state.cart,
    ...state.setting,
  }
);

export default connect(mapStateToProps)(HeaderMobile);
