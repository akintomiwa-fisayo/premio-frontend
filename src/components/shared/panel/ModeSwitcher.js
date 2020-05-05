import React from 'react';
import { Switch } from 'antd-mobile';
import { connect } from 'react-redux';
import { changeAppMode } from '../../../store/setting/action';

class ModeSwitcher extends React.Component {
  constructor(props) {
    super(props);

    this.switchAppMode = this.switchAppMode.bind(this);
  }

  switchAppMode() {
    this.props.dispatch(changeAppMode());
  }

  render() {
    const { appMode } = this.props;
    return (
      <div id="appModeSwitcher">
        <p>Switch app mode</p>
        <div>
          <span>Customer Mode </span>
          <Switch
            checked={appMode === 'customer'}
            valuePropName="checked"
            platform="android"
            color="#fcb800"
            onChange={this.switchAppMode}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(ModeSwitcher);
