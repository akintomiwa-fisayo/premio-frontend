export const actionTypes = {
  PURCHASES_SET_INFO: 'PURCHASES_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.PURCHASES_SET_INFO, props };
}
