import React from 'react';
import PropTypes from 'prop-types';
import { devalueString } from '../../lib/js';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };

    this.focusInput = this.focusInput.bind(this);
  }

  focusInput(value = true) {
    this.setState(() => ({
      isFocused: value,
    }));
  }

  render() {
    const { props } = this;
    const { state } = this;

    let input = '';
    if (props.type === 'select') {
      let defaultValue = null;
      let value = null;
      const options = [];

      props.options.forEach((option, index) => {
        if (option.defaultValue) defaultValue = option.value;
        if (props.value === option.value) value = props.value;

        options.push(
          <option
            value={option.value}
            key={`${option.value}${index}`}
            disabled={option.disabled}
          >{option.label || devalueString(option.value)}
          </option>,
        );
      });

      if (value === null && defaultValue) {
        value = defaultValue;
      }

      const isPlaceholder = value === '-placeholder-';


      input = (
        <select
          value={value}
          className={`${isPlaceholder ? ' placeholder' : ''}`}
          onFocus={() => {
            this.focusInput();
          }}
          onBlur={() => {
            this.focusInput(false);
          }}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        >{options}
        </select>
      );
    } else {
      input = (
        <input
          type={props.type}
          onFocus={() => {
            this.focusInput();
          }}
          onBlur={() => {
            this.focusInput(false);
          }}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      );
    }

    return (
      <div id={props.id} className={`input-field${state.isFocused ? '  focused' : ''}`}>
        <span className="label">{props.label}</span>
        {input}
      </div>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

InputField.defaultProps = {
  className: '',
  value: undefined,
  options: [],
  mandatory: false,
  style: {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
};

export default InputField;
