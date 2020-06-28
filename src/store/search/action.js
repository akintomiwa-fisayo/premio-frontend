export const actionTypes = {
  SEARCH_SET_INFO: 'SEARCH_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.SEARCH_SET_INFO, props };
}
