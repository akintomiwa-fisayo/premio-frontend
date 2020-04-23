import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Input } from 'antd';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { changeHeader, resetHeader } from '../../store/setting/action';
import InputField from '../../components/elements/InputField';

const defaultState = {
  file: '',
  title: '',
  description: '',
  price: '',
  commision: '',
};

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.createProduct ? { ...defaultState } : { ...props.product },
    };

    this.filePicker = null;
    this.pickFile = this.pickFile.bind(this);
  }

  componentDidMount() {
    const { props } = this;
    // this.props.dispatch(getCart());
    // set Cart items
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: props.createProduct ? 'new product' : props.product.title,
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }


  pickFile() {
    if (this.filePicker) {
      this.filePicker.click();
    }
  }

  render() {
    const {
      amount, cartItems, nav, header, createProduct,
    } = this.props;

    const { product } = this.state;
    console.log(this.props);
    return (
      <div
        id="createProduct"
        style={{
          height: `calc(100vh - ${header.height + nav.height}px)`,
        }}
      >
        <div className="form-item" id="avi" onClick={this.pickFile}>
          <span className="icon-file-empty icon" />
          <img src={product.file} alt="" />
          <input type="file" ref={(e) => { this.filePicker = e; }} />
        </div>

        <div className="form-item">
          <p className="label">Title</p>
          <input defaultValue={product.title} />
        </div>
        <div className="form-item">
          <p className="label">Description</p>
          <textarea defaultValue={product.description} />
        </div>
        <div className="form-item">
          <p className="label">Price</p>
          <input type="number" defaultValue={product.price} />
        </div>
        <div className="form-item">
          <p className="label">Commission rate <span>(in percentage)</span></p>
          <input type="number" max="100" defaultValue={product.commision} />
        </div>

        <div className="ps-container actions">
          {!createProduct ? (
            <button
              type="button"
              className="btn btn-glass"
            >Delete Product
            </button>
          ) : ''}
          <button
            type="button"
            className="btn btn-default"
          >
            {createProduct ? 'Submit' : 'Update'} Product
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.cart,
  ...state.setting,
});

ViewProduct.propTypes = {
  product: PropTypes.object,
  createProduct: PropTypes.bool,
};

ViewProduct.defaultProps = {
  product: {},
  createProduct: true,
};
export default connect(mapStateToProps)(ViewProduct);
