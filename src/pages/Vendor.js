import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'antd-mobile';
import { List } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../store/setting/action';
import ChangePassword from '../components/partials/account/ChangePassword';
import BecomeVendor from '../components/partials/account/BecomeVendor';
import user3 from '../public/static/img/users/3.jpg';
import user1 from '../public/static/img/users/1.jpg';
import InputField from '../components/elements/InputField';
import { onSale } from '../public/static/data/product';
import Product from '../components/elements/products/Product';


class Vendor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'Vendor',
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
    return (
      <section id="viewVendor" className="ps-container">
        <div id="sec1">
          <div className="avi">
            <img src={user1} alt="" />
          </div>

          <div className="names">
            <p className="name">vendor name</p>
            <p className="handle">(@vendor-handle)</p>
          </div>
        </div>

        <div id="description">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum ed alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum
        </div>

        <p id="productsHeader">products <span>(123)</span></p>
        <div className="products-preview">
          {onSale.map((product) => (
            <Product
              product={product}
              key={product.title}
            />
          ))}
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
});

export default connect(mapStateToProps)(Vendor);
