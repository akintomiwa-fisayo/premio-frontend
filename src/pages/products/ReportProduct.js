import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, alert } from '../../lib/js';

class ReportProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reporting: false,
      flag: 'inappropriate',
      flagError: false,
      reason: '',
      reasonError: false,
    };

    this.flags = [
      'inappropriate',
      'abusive',
      'bullying',
      'scam',
      'misleading',
    ];

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
    if (this.flags.indexOf(state.flag) === -1) {
      this.setState(() => ({
        flagError: 'invalid flag',
      }));
      isValid = false;
    } else {
      this.setState(() => ({
        flagError: false,
      }));
    }

    if (isEmpty(state.reason)) {
      this.setState(() => ({
        reasonError: "can't be empty",
      }));
      isValid = false;
    } else {
      this.setState(() => ({
        reasonError: false,
      }));
    }

    if (isValid && !this.state.reporting) {
      this.setState(() => ({
        reporting: true,
      }));

      const { productId } = this.props;
      this.props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products/${productId}/reports`,
        method: 'post',
        body: `{
          "flag": "${state.flag}",
          "reason": "${state.reason}"
        }`,
        headers: {
          'content-Type': 'application/json',
        },
      }).then(() => {
        alert('Report submitted successfully', '', [{ text: 'ok' }]);
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
      <div id="productReportDialog" onClick={props.onClose}>
        <div className="content" onClick={(e) => { e.stopPropagation(); }}>
          <div className="cancel icon-cross" onClick={props.onClose} />
          <h1 className="header">report product</h1>
          <div className="body">
            <div className="row">
              <p className="label">flag as {state.flagError
                ? <> : <span className="error">{state.flagError}</span></>
                : '' }
              </p>
              <select
                type="select"
                value={state.flag}
                onChange={(e) => {
                  const flag = e.target.value;
                  this.regInputsState({ flag });
                }}
              >
                {this.flags.map((flag) => (
                  <option value={flag}>{flag}</option>
                ))}
              </select>
            </div>

            <div className="row">
              <p className="label">reason {state.reasonError
                ? <> : <span className="error">{state.reasonError}</span></>
                : '' }
              </p>
              <textarea
                value={state.reason}
                onChange={(e) => {
                  const reason = e.target.value;
                  this.regInputsState({ reason });
                }}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-default${state.reporting ? ' disabled' : ''}`}
              onClick={this.submitReport}
            >
              <span className="icon icon-flag" />
              Submit report
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReportProduct.propTypes = {
  onClose: PropTypes.func,
  fetchRequest: PropTypes.func.isRequired,
};

ReportProduct.defaultProps = {
  onClose: () => {},
};
export default ReportProduct;
