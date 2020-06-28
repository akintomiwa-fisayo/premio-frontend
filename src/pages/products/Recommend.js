import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, alert } from '../../lib/js';

class RecommendProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      submitting: false,
    };

    this._isMounted = false;
    this.hideReportDialog = this.hideReportDialog.bind(this);
    this.preventHide = this.preventHide.bind(this);
    this.regInputsState = this.regInputsState.bind(this);
    this.submitReport = this.submitReport.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // eslint-disable-next-line class-methods-use-this
  preventHide(event) {
    event.stopPropagation();
  }

  hideReportDialog(event) {
    if (event) event.stopPropagation();
    this.props.onClose();
  }

  regInputsState(value) {
    this.setState(() => value);
  }

  submitReport() {
    const { state } = this;
    let isValid = true;

    if (isEmpty(state.email)) {
      this.setState(() => ({
        emailError: "can't be empty",
      }));
      isValid = false;
    } else {
      this.setState(() => ({
        emailError: false,
      }));
    }

    if (isValid && !this.state.submitting) {
      this.setState(() => ({
        submitting: true,
      }));

      const { productId } = this.props;
      this.props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products/${productId}/recommend`,
        method: 'post',
        body: `{
          "email": "${state.email}"
        }`,
        headers: {
          'content-Type': 'application/json',
        },
      }).then(() => {
        alert('Recommendation sent successfully', '', [{ text: 'ok' }]);
        if (this._isMounted) {
          this.hideReportDialog();
        }
      });
    }
  }

  render() {
    const { props } = this;
    const { state } = this;

    return (
      <div id="productRecommend" onClick={props.onClose}>
        <div className="content" onClick={(e) => { e.stopPropagation(); }}>
          <div className="cancel icon-cross" onClick={props.onClose} />
          <h1 className="header">recommend product</h1>
          <div className="body">
            <i>Input the email of whom you wish to recommend this product to</i>
            <div className="row">
              <p className="label">email {state.emailError
                ? <> : <span className="error">{state.emailError}</span></>
                : '' }
              </p>
              <input
                value={state.email}
                onChange={(e) => {
                  const email = e.target.value;
                  this.regInputsState({ email });
                }}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-default${state.submitting ? ' disabled' : ''}`}
              onClick={this.submitReport}
            > Send Recommendation
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RecommendProduct.propTypes = {
  onClose: PropTypes.func,
  fetchRequest: PropTypes.func.isRequired,
};

RecommendProduct.defaultProps = {
  onClose: () => {},
};
export default RecommendProduct;
