import React from 'react';
import PropTypes from 'prop-types';
// import { SearchBar } from "antd-mobile";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };

    this.focus = this.focus.bind(this);
  }

  focus(value = true) {
    this.setState(() => ({
      focused: value,
    }));
  }

  render() {
    const { focused } = this.state;
    const { props } = this;
    return (
      <div className={`search-bar${focused ? ' focused' : ''}`}>
        <input
          type="text"
          placeholder={props.placeholder}
          onFocus={this.focus}
          onBlur={() => this.focus(false)}
        />
        <button type="button" onClick={props.onEnter}>
          <i className="icon-magnifier" />
        </button>
      </div>

    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
};

SearchBar.defaultProps = {
  placeholder: 'search',
  onEnter: () => {},
};

export default SearchBar;
