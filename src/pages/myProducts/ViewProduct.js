import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { changeHeader, resetHeader } from '../../store/setting/action';
import InputField from '../../components/elements/InputField';
import { alert, isEmpty, formatBytes } from '../../lib/js';
import {
  setViewProduct, updateProduct, addProduct, removeProduct,
} from '../../store/myProducts/action';

const defaultState = {
  file: false,
  fileSrc: '',
  fileError: false,
  title: '',
  titleError: false,
  description: '',
  descriptionError: false,
  price: '',
  priceError: false,
  commissionRate: '',
  commissionRateError: false,
  invalidForm: true,
  submitting: false,
  deleting: false,
  updating: false,
  showProductMetas: false,
};

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    const { viewProduct } = props.myProducts;
    this.state = viewProduct ? {
      ...defaultState,
      ...viewProduct,
      file: {
        type: viewProduct.mime,
      },
      fileSrc: viewProduct.url,
    } : {
      ...defaultState,
    };

    this._isMounted = false;
    this.filePicker = null;
    this.pickFile = this.pickFile.bind(this);
    this.submit = this.submit.bind(this);
    this.validateProduct = this.validateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.onFilePick = this.onFilePick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { viewProduct } = props.myProducts;
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: viewProduct ? viewProduct.title : 'new product',
      onGoBack: () => {
        this.props.history.goBack();
      },
      icon: viewProduct ? (
        <span
          className="icon-exclamation icon"
          onClick={() => {
            this.setState({
              showProductMetas: true,
            });
          }}
          style={{ fontWeight: '500', transform: 'rotateZ(180deg)' }}
        />
      ) : false,
    }));
  }

  componentWillUnmount() {
    this._isMounted = false;
    const { props } = this;

    props.setViewProduct(false);
    props.dispatch(resetHeader());
  }

  onFilePick(event) {
    const [value] = event.target.files;
    console.log('big file', value);
    this.changeProductState('file', value, {
      fileSrc: URL.createObjectURL(value),
    });
  }

  changeProductState(field = undefined, value = undefined, props) {
    let state = {
      ...this.state,
      ...props,
      [field]: value,
    };

    state = this.validateProduct(state, field);

    this.setState(() => (state));
  }

  validateProduct(state_ = false, field_ = false) {
    const state = state_ || this.state;
    const newState = {
      ...state,
    };

    let invalidForm = false;
    for (const field in state) {
      const value = state[field];
      let error = false;
      if (field === 'file') {
        if (value) {

        } else {
          error = 'no file selected';
          invalidForm = true;
        }

        if (!field_ || field_ === 'file') {
          newState.fileError = error;
        }
      } else if (field === 'price') {
        if (isNaN(value)) {
          error = 'must be a number';
          invalidForm = true;
        } else if (value < 1) {
          error = "can't be less 1";
          invalidForm = true;
        } else if (isEmpty(value)) {
          error = "can't be empty";
          invalidForm = true;
        }

        if (!field_ || field_ === 'price') {
          newState.priceError = error;
        }
      } else if (field === 'commissionRate') {
        if (isNaN(value)) {
          error = 'must be a number';
          invalidForm = true;
        } else if (value < 0 || value > 100) {
          error = 'can only be from 0 to 100';
          invalidForm = true;
        } else if (isEmpty(value)) {
          error = "can't be empty";
          invalidForm = true;
        }

        if (!field_ || field_ === 'commissionRate') {
          newState.commissionRateError = error;
        }
      } else if (field === 'title') {
        if (isEmpty(value)) {
          error = "can't be empty";
          invalidForm = true;
        }

        if (!field_ || field_ === 'title') {
          newState.titleError = error;
        }
      } else if (field === 'description') {
        if (isEmpty(value)) {
          error = "can't be empty";
          invalidForm = true;
        }

        if (!field_ || field_ === 'description') {
          newState.descriptionError = error;
        }
      }
    }

    return {
      ...newState,
      invalidForm,
    };
  }

  pickFile() {
    if (this.filePicker) {
      this.filePicker.click();
    }
  }

  deleteProduct() {
    const { props } = this;
    const { deleting, updating, id } = this.state;

    if (!deleting && !updating) {
      alert('', 'Are you sure you want to delete this product', [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            if (this._isMounted) {
              this.setState({ deleting: true });

              props.fetchRequest({
                url: `${process.env.REACT_APP_API}/products/${id}`,
                method: 'delete',
              }).then(() => {
                props.removeProduct(id);
                if (this._isMounted) {
                  props.history.push('/my-products');
                }
              });
            }
          },
        },
      ]);
    }
  }

  updateProduct() {
    const { props } = this;
    const { state } = this;
    const { updating, deleting, id } = this.state;

    if (!updating && !deleting) {
      const testState = this.validateProduct(state);

      if (testState.invalidForm) {
        this.setState(() => (testState));
      } else {
        this.setState(() => ({ updating: true }));
        const {
          file, fileSrc, title, description, price, commissionRate,
        } = this.state;

        const formDetails = {
          title,
          description,
          price,
          commissionRate,
        };

        let body = new FormData();
        const headers = {};
        if (file.arrayBuffer) {
          formDetails.thumbnail = fileSrc;
          body.append('product', file);
          body.append('title', title);
          body.append('description', description);
          body.append('price', price);
          body.append('commissionRate', commissionRate);
        } else {
          body = JSON.stringify(formDetails);
          headers['Content-Type'] = 'application/json';
        }
        console.log({ formDetails, id });

        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/products/${id}`,
          method: 'post',
          body,
          headers,
        }).then(() => {
          if (this._isMounted) {
            alert(
              'Update Successful',
              'Your product was updated successfully',
              [{
                text: 'ok',
              }],
            );

            this.setState(() => ({ updating: false }));
            props.updateProduct(id, formDetails);
          }
        }).catch(() => {
          if (this._isMounted) {
            alert(
              'Update Failed',
              'Please try again',
              [{
                text: 'ok',
              }],
            );
            this.setState(() => ({ updating: false }));
          }
        });
      }
    }
  }

  submit() {
    const { props } = this;
    const { state } = this;
    const { submitting } = this.state;

    /* props.addProduct({
      commissionRate: 10,
      createdOn: '2020-06-08T08:57:22.193Z',
      description: 'the product',
      id: '5eddfd81c6af62554c70a51e',
      metas: {
        width: 1321, height: 743, format: 'jpg', type: 'image', size: 250569,
      },
      mime: 'image/jpeg',
      price: 100,
      status: 'available',
      thumbnail: 'https://res.cloudinary.com/premio-dev/image/upload/w_400,f_auto,c_limit/v1592001816/b3utkwrbk2gtmkknff3t.jpg',
      title: 'kola',
      url: 'https://res.cloudinary.com/premio-dev/image/upload/v1592001816/b3utkwrbk2gtmkknff3t.jpg',
      vendorId: '5ed53380d2152f195c8c6c70',
    }); */

    // return '';

    if (!submitting) {
      const testState = this.validateProduct(state);

      if (testState.invalidForm) {
        this.setState(() => (testState));
      } else {
        this.setState(() => ({ submitting: true }));
        const {
          file, title, description, price, commissionRate,
        } = this.state;

        const formData = new FormData();
        formData.append('product', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('commissionRate', commissionRate);

        console.log('kkkkkkkkkkkkkkkkkkkkkkk', { formData });
        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/products`,
          method: 'POST',
          body: formData,
        }).then((res) => {
          if (this._isMounted) {
            alert(
              'Upload Successful',
              'Your product was uploaded successfully',
              [{
                text: 'ok',
              }],
            );


            props.addProduct(res.product);
            this.setState(defaultState);
          }
        }).catch((err) => {
          console.log('the error', err);
          if (this._isMounted) {
            const { error } = err.data;
            alert(
              'Upload Failed',
              error,
              [{
                text: 'ok',
              }],
            );

            this.setState({ submitting: false });
          }
        });
      }
    }
  }

  render() {
    const { props } = this;
    const { header, nav } = props.setting;
    const { viewProduct } = props.myProducts;

    console.log({ props: this.props });
    const { state } = this;
    return (
      <div id="createProduct">
        <div id="preview">
          <div className="form-item" id="avi">
            <span className="icon-file-empty icon" />
            {(() => {
              switch (state.file.type) {
                case ('image/gif'):
                case ('image/jpg'):
                case ('image/jpeg'):
                case ('image/png'):
                  return <img src={state.fileSrc} alt="" ref={() => { }} />;

                case ('video/mp4'):
                  return <video src={state.fileSrc} controls />;

                case ('audio/mp3'):
                case ('audio/mpeg'):
                  return <audio src={state.fileSrc} controls />;

                case ('application/pdf'):
                  return <iframe typeof="application/pdf" title="." src={state.fileSrc} />;

                default:
                  if (state.file.type) {
                    return <>{state.file.type} not supported</>;
                  }
                  if (state.fileError) {
                    return <span className="error"> {state.fileError} </span>;
                  }

                  return <></>;
              }
            })()}
          </div>

          <button type="button" id="filePicker" className="btn btn-glass" onClick={this.pickFile}>
            <input
              type="file"
              ref={(e) => {
                this.filePicker = e;
              }}
              accept=".gif,.jpg,.jpeg,.png,.mp4,.mp3,.mpeg,application/pdf"
              onChange={this.onFilePick}
            />
            <span className="icon-file-empty icon" />
            Pick File
          </button>
        </div>
        <div className="form-item">
          <p className="label">
            Title
            {state.titleError ? <> : <span className="error">{state.titleError}</span></> : ''}
          </p>
          <input
            type="text"
            value={state.title}
            className={`${state.titleError ? ' error' : ''}`}
            onChange={(e) => {
              this.changeProductState('title', e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <p className="label">
            Description
            {state.descriptionError ? <> : <span className="error">{state.descriptionError}</span></> : ''}
          </p>
          <textarea
            className={`${state.descriptionError ? ' error' : ''}`}
            value={state.description}
            onChange={(e) => {
              this.changeProductState('description', e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <p className="label">
            Price
            {state.priceError ? <> : <span className="error">{state.priceError}</span></> : ''}
          </p>
          <input
            type="number"
            className={`${state.priceError ? ' error' : ''}`}
            value={state.price}
            onChange={(e) => {
              this.changeProductState('price', e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <p className="label">
            Commission rate <span>(in percentage)</span>
            {state.commissionRateError ? <> : <span className="error">{state.commissionRateError}</span></> : ''}
          </p>
          <input
            type="number"
            className={`${state.commissionRateError ? ' error' : ''}`}
            max="100"
            value={state.commissionRate}
            onChange={(e) => {
              this.changeProductState('commissionRate', e.target.value);
            }}
          />
        </div>

        <div className="ps-container actions">
          {viewProduct ? (
            <button
              type="button"
              className="btn btn-glass"
              onClick={this.deleteProduct}
            >Delete Product
            </button>
          ) : ''}
          <button
            type="button"
            className={`btn btn-default${
              state.updating
              || state.submitting
                ? ' disabled'
                : ''
            }`}
            onClick={viewProduct ? this.updateProduct : this.submit}
          >
            {viewProduct ? 'Update' : 'Submit' } Product
          </button>

        </div>
        {state.showProductMetas ? (
          <div
            id="productMetas"
            style={{
              height: `calc(100vh - ${header.height + nav.height}px)`,
              top: `${header.height}px`,
            }}
            onClick={() => {
              this.setState({ showProductMetas: false });
            }}
          >
            <div className="content" onClick={(e) => { e.stopPropagation(); }}>
              <div className="header">Details</div>
              <div className="info">
                <p className="label"> Sold </p>
                <p className="detail">{state.sold}</p>
              </div>

              <div className="info">
                <p className="label"> Width </p>
                <p className="detail">{state.metas.width}px</p>
              </div>

              <div className="info">
                <p className="label"> Height </p>
                <p className="detail">{state.metas.height}px</p>
              </div>

              <div className="info">
                <p className="label"> size </p>
                <p className="detail"> {formatBytes(state.metas.height)} </p>
              </div>

              <button
                type="button"
                className="btn btn-glass"
                onClick={() => {
                  this.setState({ showProductMetas: false });
                }}
              > close
              </button>
            </div>
          </div>
        ) : ''}

      </div>
    );
  }
}


ViewProduct.propTypes = {
};

ViewProduct.defaultProps = {
};

const mapStateToProps = (state) => ({
  myProducts: state.myProducts,
});

const mapDispatchToProps = (dispatch) => ({
  setViewProduct: (props) => dispatch(setViewProduct(props)),
  updateProduct: (id, props) => dispatch(updateProduct(id, props)),
  addProduct: (product) => dispatch(addProduct(product)),
  removeProduct: (product) => dispatch(removeProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
