export const actionTypes = {
  PAYMENT_SET_INFO: 'PAYMENT_SET_INFO',
};

export function setPaymentInfo(props) {
  return { type: actionTypes.PAYMENT_SET_INFO, props };
}
