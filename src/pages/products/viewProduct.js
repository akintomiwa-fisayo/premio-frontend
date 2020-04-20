import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import Newletters from '../../components/partials/commons/Newletters';
import CustomerBought from '../../components/partials/product/CustomerBought';
import ProductDetailFullwidth from '../../components/elements/detail/ProductDetailFullwidth';
import ProductWidgets from '../../components/partials/product/ProductWidgets';
import NavigationList from '../../components/shared/navigation/NavigationList';
import BreadCrumb from '../../components/elements/BreadCrumb';
import RelatedProductFullwidth from '../../components/partials/product/RelatedProductFullwidth';
import { changeHeader, resetHeader } from '../../store/setting/action';

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.match.params.productId,
    };
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'details',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentDidUpdate() {
    const { productId } = this.props.match.params;
    console.log('prev id', this.state.productId, 'new id', productId);
    if (productId !== this.state.productId) {
      this.setState(() => ({ productId }));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  /* useEffect(() => {
    if (isNaN(pid)) {
      Router.push('/page/page-404');
    }
  }); */
  render() {
    return (
      <div id="viewProduct" className="site-content">
        <div className="ps-page--product">
          <div className="ps-container">
            <div className="ps-page__container">
              <div className="ps-page__left">
                <ProductDetailFullwidth productId={this.state.productId} />
              </div>
              <div className="ps-page__right">
                <ProductWidgets />
              </div>
            </div>
            {/* <RelatedProductFullwidth /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ViewProduct);
