import React from 'react';

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
    return (
      <div id={props.id} className={`input-field${state.isFocused ? '  focused' : ''}`}>
        <span className="label">{props.label}</span>
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
      </div>
    );
  }
}
export default InputField;
