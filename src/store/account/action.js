export const actionTypes = {
  ACCOUNT_SET_INFO: 'SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.ACCOUNT_SET_INFO, props };
}
