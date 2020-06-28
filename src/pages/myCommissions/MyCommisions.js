import {
  Tabs, WhiteSpace, Badge, Accordion,
} from 'antd-mobile';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import HistoryLog from './HistoryLog';
import { getRelativeTime } from '../../lib/js';

class MyCommisions extends Component {
  componentDidMount() {
    this.props.onComponentMount();
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'My commissions',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  render() {
    const { commissions } = this.props;

    const tabs = [
      { title: <Badge>INCOME</Badge> },
      { title: <Badge>WITHDRAWAL</Badge> },
    ];

    if (commissions.loading) {
      return (
        <div id="myCommissions">
          <p className="page-loader" />;
        </div>
      );
    }

    let totalCommision = 0;

    const reports = commissions.report.map((comm) => {
      const user = comm.purpose === 'sales' ? comm.productVendor : comm.user;
      totalCommision += comm.commission;
      return (
        [
          <Link to={`/account/${user.id}`}>{user.firstName} {user.lastName} ({comm.purpose})</Link>,
          <>#{comm.commission} <span className="icon-arrow-down income-icon" /></>,
          getRelativeTime(comm.date, true, 'number'),
        ]

      );
    });

    return (
      <section id="myCommissions">
        <div id="balance">
          <h1>#{totalCommision}</h1>
          <span>Total balance</span>
          {/* <button type="button" className="btn btn-glass">Make Withdrawal</button> */}
        </div>

        <div>
          <Tabs
            tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <HistoryLog
              headers={['Team Mate', 'Commission', 'Date']}
              data={reports}
            />
            <HistoryLog
              headers={['Withdrawal', 'Date']}
              data={[
                [
                  <>$400 <span className="icon-arrow-up withdrawal-icon" /></>,
                  '22/04/2020',
                ],
                [
                  <>$400 <span className="icon-arrow-up withdrawal-icon" /></>,
                  '22/04/2020',
                ],
              ]}
            />
          </Tabs>
        </div>


      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  commissions: state.commissions,
});

export default connect(mapStateToProps)(MyCommisions);
