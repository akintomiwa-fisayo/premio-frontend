export const actionTypes = {
  My_CLIENTS_SET_INFO: 'My_CLIENTS_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.My_CLIENTS_SET_INFO, props };
}
