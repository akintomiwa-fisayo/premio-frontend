import {
  Tabs, WhiteSpace, Badge, Accordion,
} from 'antd-mobile';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { List } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ChangePassword from '../../components/partials/account/ChangePassword';
import BecomeVendor from '../../components/partials/account/BecomeVendor';
import user3 from '../../public/static/img/users/3.jpg';
import user1 from '../../public/static/img/users/1.jpg';

class HistoryLog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'my commisions',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }


  render() {
    const { header, nav } = this.props;

    const tabs = [
      { title: <Badge>INCOME</Badge> },
      { title: <Badge>WITHDRAWAL</Badge> },
    ];

    const { headers, data } = this.props;
    return (
      <table className="tab-content">
        <tr>
          {headers.map((label) => <th>{label}</th>)}
        </tr>
        <tbody>
          {data.map((row) => {
            const rowJsx = row.map((rowTD) => <td>{rowTD}</td>);
            return <tr> {rowJsx} </tr>;
          })}
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(HistoryLog);
