export const actionTypes = {
  COMMISSIONS_SET_INFO: 'COMMISSIONS_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.COMMISSIONS_SET_INFO, props };
}
