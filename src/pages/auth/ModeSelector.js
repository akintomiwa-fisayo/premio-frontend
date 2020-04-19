import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../components/elements/InputField';
import logo from '../../public/static/img/logo.png';
import {
  changeHeader, resetHeader, resetNav, changeNav,
} from '../../store/setting/action';
import { changeUser } from '../../store/auth/action';

class ModeSelector extends React.Component {
  componentDidMount() {
    this.props.dispatch(changeHeader({
      show: false,
    }));
    this.props.dispatch(changeNav({
      show: false,
    }));

    this.selectMode = this.selectMode.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
    this.props.dispatch(resetNav());
  }

  selectMode(type = 'customer') {
    this.props.dispatch(changeUser({ type }));
  }

  render() {
    return (
      <div id="signinComp" style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to="/"
          style={{ width: '100%' }}
          onClick={() => { this.selectMode('customer'); }}
        >
          <button type="button" className="btn btn-default">Customer mode</button>
        </Link>
        <Link
          to="/"
          style={{ marginLeft: '1em', width: '100%' }}
          onClick={() => { this.selectMode('vendor'); }}
        >
          <button type="button" className="btn btn-default">Vendor mode</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ModeSelector);