export const actionTypes = {
  PROFILE_SET_INFO: 'PROFILE_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.PROFILE_SET_INFO, props };
}
