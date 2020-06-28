export const actionTypes = {
  SALES_SET_INFO: 'SALES_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.SALES_SET_INFO, props };
}
