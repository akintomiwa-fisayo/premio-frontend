import {
  Tabs, WhiteSpace, Badge, Accordion,
} from 'antd-mobile';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { List } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import HistoryLog from './HistoryLog';

class SalesReport extends Component {
  componentDidMount() {
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'sales report',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });
  }

  componentWillUnmount() {
    this.props.resetHeader();
  }

  render() {
    const { props } = this;
    const { sales } = props;
    if (sales.loading) {
      return (
        <section id="myCommissions">
          <p className="page-loader" />
        </section>
      );
    }

    const tabs = [
      { title: <Badge>INCOME</Badge> },
      { title: <Badge>WITHDRAWAL</Badge> },
    ];

    let Total = 0;

    const salesReport = sales.report.map((sale) => {
      Total += sale.amount;
      return [
        <Link to="/account/client">{sale.productId}</Link>,
        <><span>#</span>{sale.amount.toLocaleString('en-GB')} <span className="icon-arrow-down income-icon" /></>,
        '22/04/2020',
      ];
    });

    console.log({ salesReport });

    return (
      <section id="myCommissions">
        <div id="balance">
          <h1><span>#</span>{Total.toLocaleString('en-GB')}</h1>
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
              headers={['Product', 'Price', 'Date']}
              data={salesReport}
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
  sales: state.sales,
});

export default connect(mapStateToProps)(SalesReport);
