import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Input } from 'antd';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { changeHeader, resetHeader } from '../../store/setting/action';
import InputField from '../../components/elements/InputField';
import { alert, isEmpty } from '../../lib/js';

const defaultState = {
  file: '',
  fileSrc: '',
  fileError: false,
  title: '',
  titleError: 'cant be empty',
  description: '',
  descriptionError: false,
  price: '',
  priceError: false,
  commission: '',
  commissionError: false,
  invalidForm: true,
  submitting: false,
};

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = props.createProduct ? {
      ...defaultState,
    } : {
      ...defaultState,
      ...props.product,
    };

    this._isMounted = false;
    this.filePicker = null;
    this.pickFile = this.pickFile.bind(this);
    this.submit = this.submit.bind(this);
    this.validateProduct = this.validateProduct.bind(this);
    this.onFilePick = this.onFilePick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: props.createProduct ? 'new product' : props.product.title,
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.dispatch(resetHeader());
  }

  onFilePick(event) {
    const [value] = event.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(value);
    fileReader.onerror = () => {
      alert('', 'Oops!, we couldn\'t attach the file picked please try again or try another one', [{ text: 'ok' }]);
    };

    fileReader.onload = (frEvent) => {
      const fileSrc = frEvent.target.result;
      if (this._isMounted) {
        this.changeProductState('file', value, {
          fileSrc,
        });
      }
    };
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
      if (field === 'price') {
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
      } else if (field === 'commission') {
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

        if (!field_ || field_ === 'commission') {
          newState.commissionError = error;
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

  submit() {
    const { props } = this;
    const { state } = this;
    const { submitting } = this.state;

    if (!submitting) {
      const testState = this.validateProduct(state);

      if (testState.invalidForm) {
        this.setState(() => (testState));
      } else {
        const {
          file, title, description, price, commission,
        } = this.state;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('commission', commission);
        props.fetchRequest({
          url: `${process.env.REACT_APP_API}/products`,
          method: 'POST',
          body: formData,
        }).then(() => {
          if (this._isMounted) {
            alert(
              'Upload Successful',
              'Your product was uploaded successfully',
              [{
                text: 'ok',
              }],
            );
          }
        }).catch(() => {
          if (this._isMounted) {
            alert(
              'Upload Failed',
              'Please try again',
              [{
                text: 'ok',
              }],
            );
          }
        });
      }
    }
  }

  render() {
    const { createProduct } = this.props;

    console.log({ props: this.props });
    const { state } = this;
    return (
      <div id="createProduct">
        <div id="preview">
          <div className="form-item" id="avi">
            <span className="icon-file-empty icon" />
            {(() => {
              switch (state.file.type) {
                case ('image/jpeg' || 'image/jpg' || 'image/png'):
                  return <img src={state.fileSrc} alt="" />;

                case ('video/mp4'):
                  return <video src={state.fileSrc} controls />;

                case ('audio/mp3'):
                  return <audio src={state.fileSrc} controls />;

                case ('application/pdf'):
                  return <embed src={state.fileSrc} />;

                default:
                  return <>{state.file.type} not supported</>;
              }
            })()}

          </div>

          <button type="button" id="filePicker" className="btn btn-glass" onClick={createProduct ? this.pickFile : () => {}}>
            <input
              type="file"
              ref={(e) => {
                this.filePicker = e;
              }}
              accept="image/jpeg,video/mp4,audio/mp3,application/pdf"
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
            {state.commissionError ? <> : <span className="error">{state.commissionError}</span></> : ''}
          </p>
          <input
            type="number"
            className={`${state.commissionError ? ' error' : ''}`}
            max="100"
            value={state.commission}
            onChange={(e) => {
              this.changeProductState('commission', e.target.value);
            }}
          />
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
            className={`btn btn-default${state.invalidForm || state.submitting ? ' disabled' : ''}`}
            onClick={this.submit}
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
