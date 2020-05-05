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
import HistoryLog from './HistoryLog';

class SalesReport extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'sales report',
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

    return (
      <section id="myCommissions">
        <div id="balance">
          <h1>$5,000.00</h1>
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
              data={[
                [
                  <Link to="/account/client">#12345</Link>,
                  <>$400 <span className="icon-arrow-down income-icon" /></>,
                  '22/04/2020',
                ],
                [
                  <Link to="/account/client">#12345</Link>,
                  <>$400 <span className="icon-arrow-down income-icon" /></>,
                  '22/04/2020',
                ],
                [
                  <Link to="/account/client">#12345</Link>,
                  <>$400 <span className="icon-arrow-down income-icon" /></>,
                  '22/04/2020',
                ],
                [
                  <Link to="/account/client">#12345</Link>,
                  <>$400 <span className="icon-arrow-down income-icon" /></>,
                  '22/04/2020',
                ],
              ]}
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
  ...state.setting,
});

export default connect(mapStateToProps)(SalesReport);
