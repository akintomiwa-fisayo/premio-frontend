import React from 'react';

import { connect } from 'react-redux';
import ProductWidgets from './ProductWidgets';
import { changeHeader, resetHeader } from '../../store/setting/action';
import ProductInformations from './ProductInformations';
import ProductComments from './ProductComments';

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.match.params.productId,
    };
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'details',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentDidUpdate() {
    // this.props.onComponentMount();
    const { productId } = this.props.match.params;

    if (this.state.productId !== productId) {
      this.setState({ productId });
      this.props.onComponentMount();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  render() {
    const { productId } = this.state;

    return (
      <div id="viewProduct" className="">
        <div className="ps-page__left">
          <ProductInformations
            {...this.props}
            productId={productId}
          />
        </div>
        <div className="ps-page__right">
          <ProductComments
            {...this.props}
            productId={productId}
          />
          <ProductWidgets
            {...this.props}
            productId={productId}
          />
        </div>
      </div>
    );
  }
}

export default ViewProduct;
