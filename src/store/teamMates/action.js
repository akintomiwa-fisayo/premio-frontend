export const actionTypes = {
  TEAM_MATES_SET_INFO: 'TEAM_MATES_SET_INFO',
};

export function setInfo(props) {
  return { type: actionTypes.TEAM_MATES_SET_INFO, props };
}
