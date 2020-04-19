import React, { Component } from 'react';

import { Tabs } from 'antd';

import PartialDescription from './PartialDescription';
import PartialSpecification from './PartialSpecification';
import PartialVendor from './PartialVendor';
import PartialReview from './PartialReview';
import PartialOffer from './PartialOffer';

const { TabPane } = Tabs;

class DefaultDescription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="ps-product__content ps-tab-root">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Reviews (1)" key="4">
              <PartialReview />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default DefaultDescription;
