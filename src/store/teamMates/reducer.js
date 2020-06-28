import { actionTypes } from './action';

export const initState = {
  users: [],
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.TEAM_MATES_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
