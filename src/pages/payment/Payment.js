import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ucFirst, isEmpty, alert } from '../../lib/js';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessCode: false,
      amount: 0,
      loading: false,
      form: {
        number: '',
        numberError: false,
        cvv: '',
        cvvError: false,
        mm: '',
        yy: '',
        expiryError: false,
      },
      reference: '-----------',
    };


    this.paystack = null;
    this.checkoutContent = null;
    this._isMounted = false;
    this.onInitPayment = () => {};
    this.initPayment = this.initPayment.bind(this);
    this.checkout = this.checkout.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'Payment',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });

    this.initPayment();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.resetHeader();
  }

  initPayment() {
    const { props } = this;
    console.log('th props is : ', props);
    const { sessionUser, payment } = props;
    let amount = 100;
    payment.summary.forEach((summary) => {
      amount += summary.price;
    });
    this.setState({ amount });
    // Get access code
    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/checkout`,
      method: 'POST',
      body: JSON.stringify({
        email: sessionUser.email,
        amount,
        paymentFor: payment.paymentFor,
        details: payment.summary,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ accessCode, reference }) => {
      if (this._isMounted) {
        this.setState({ accessCode, reference });

        // Initialize paystack object
        window.Paystack.init({
          form: 'paystack-card-form', // Form ID
          access_code: accessCode, // You should programmatically pass the access
          // code via Ajax or a server variable. Note that
          // the access code can only be used once.
        }).then((returnedObj) => {
          this.paystack = returnedObj;
          this.onInitPayment();
        }).catch((error) => {
          console.log('There was an error loading Paystack', error);
        });
      }
    });
  }

  updateForm(props) {
    const { state } = this;
    const form = {
      ...state.form,
      ...props,
    };

    // validate all field
    form.numberError = !isEmpty(form.number) ? false : form.numberError;
    form.cvvError = !isEmpty(form.cvv) ? false : form.cvvError;
    form.expiryError = !isEmpty(form.mm) && !isEmpty(form.yy) ? false : form.expiryError;

    this.setState({
      ...state,
      form,
    });
  }

  checkout(e) {
    if (this.paystack) {
      e.preventDefault();
      // You are to programmatically pass the pin provided by your custoemr
      // to this function
      // It gets all the card fields from the data-paystack input fields
      this.paystack.card.charge({
        // pin: readPin(), // Called a function that returns the optional pin value
      }).then((response) => {
        console.log(response);
        alert('Success', 'Payment successful', [{ text: 'ok' }]);
        this.props.history.goBack();
      }, (errorBody) => {
        const { errors, message, status } = errorBody;
        const parsedErrors = {};
        errors.forEach((err) => {
          parsedErrors[`${err.field}Error`] = err.message;
        });

        this.setState((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            ...parsedErrors,
          },
        }));
        console.log('thus the payment form error', errorBody);
      });
    } else {
      this.onInitPayment = this.checkout;
    }
  }

  render() {
    const { payment } = this.props;
    const {
      submitting,
      reference,
      form,
    } = this.state;
    let totalPrice = 0;
    const summary = payment.summary.map((summary) => {
      totalPrice += summary.price * summary.units;
      return (
        <tr>
          <td>{summary.description}</td>
          <td>{summary.units}</td>
          <td>#{summary.price.toLocaleString('en-GB')}</td>
        </tr>
      );
    });

    const isFromError = form.numberError !== false || form.cvvError !== false || form.expiryError !== false;
    return (
      <>
        <div id="payments">
          <h3 id="reference">Reference : {reference}</h3>
          <section>
            <h5>Summary
              {/* <span className="icon-chevron-down icon" /> */}
            </h5>
            <div id="summary" className="content">
              <table>
                <tbody>
                  <tr>
                    <th>Purchase</th>
                    <th>Units</th>
                    <th>Price</th>
                  </tr>

                  {summary}

                  <tr id="total">
                    <th colSpan={2}>Total</th>
                    <th>#{totalPrice.toLocaleString('en-GB')}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h5 onClick={this.toogleCheckout}>Checkout
              {/* <span className="icon-chevron-down icon" /> */}
            </h5>
            <div id="checkout" className="content" ref={(e) => { this.checkoutContent = e; }}>

              <div id="errorBanner" style={{ display: isFromError ? '' : 'none' }}>
                {form.numberError !== false ? <p>{form.numberError}</p> : ''}
                {form.cvvError !== false ? <p>{form.cvvError}</p> : ''}
                {form.expiryError !== false ? <p>{form.expiryError}</p> : ''}
              </div>

              <form id="paystack-card-form">
                <input
                  type="text"
                  data-paystack="number"
                  className={`bordered${form.numberError !== false ? ' error' : ''}`}
                  placeholder="Card Number"
                  value={form.number}
                  onChange={(e) => {
                    this.updateForm({ number: e.target.value });
                  }}

                />
                <div className="group spaced">
                  <input
                    type="number"
                    data-paystack="cvv"
                    className={`bordered centered${form.cvvError !== false ? ' error' : ''}`}
                    placeholder="CVV"
                    value={form.cvv}
                    onChange={(e) => {
                      this.updateForm({ cvv: e.target.value });
                    }}
                  />
                  <div className={`bordered group${form.expiryError !== false ? ' error' : ''}`}>
                    <input
                      type="number"
                      data-paystack="expiryMonth"
                      className="centered"
                      max="2"
                      placeholder="MM"
                      value={form.mm}
                      onChange={(e) => {
                        this.updateForm({ mm: e.target.value });
                      }}

                    />
                    /
                    <input
                      type="number"
                      data-paystack="expiryYear"
                      className="centered"
                      placeholder="YY"
                      value={form.yy}
                      onChange={(e) => {
                        this.updateForm({ yy: e.target.value });
                      }}

                    />
                  </div>
                </div>
                <button
                  type="submit"
                  data-paystack="submit"
                  className="btn ps-btn"
                  onClick={this.checkout}
                >Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  payment: state.payment,
});

const mapDispatchToProps = (dispatch) => ({
  // setViewProduct: (props) => dispatch(setViewProduct(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
