import React from 'react';
import PropTypes from 'prop-types';
import { devalueString } from '../../lib/js';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      value: '',
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
      const options = [];
      let Value = null;
      const isPropValue = ([undefined, null].indexOf(props.value) === -1);

      props.options.forEach((option, index) => {
        if (option.defaultValue) defaultValue = option.value;
        if (isPropValue && props.value === option.value) Value = props.value;

        options.push(
          <option
            value={option.value}
            key={`${option.value}${index}`}
            disabled={option.disabled}
          >{option.label || devalueString(option.value)}
          </option>,
        );
      });

      if (Value === null) {
        if (defaultValue) {
          Value = defaultValue;
        } else {
          Value = state.value;
        }
      }

      const isPlaceholder = Value === '-placeholder-';

      input = (
        <select
          value={Value}
          className={`${isPlaceholder ? ' placeholder' : ''}`}
          onFocus={() => {
            this.focusInput();
          }}
          onBlur={() => {
            this.focusInput(false);
          }}
          onChange={(e) => {
            const { value } = e.target;
            this.setState(() => ({ value }));
            props.onChange(value);
          }}
        >{options}
        </select>
      );
    } else {
      const Value = [undefined, null].indexOf(props.value) === -1 ? props.value : state.value;
      input = (
        <input
          value={Value}
          disabled={props.disabled}
          type={props.type}
          onFocus={() => {
            this.focusInput();
          }}
          onBlur={() => {
            this.focusInput(false);
          }}
          onChange={(e) => {
            const { value } = e.target;
            this.setState(() => ({ value }));
            props.onChange(value);
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
  disabled: PropTypes.bool,
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
  disabled: false,
  style: {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
};

export default InputField;
