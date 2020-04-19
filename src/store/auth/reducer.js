import { actionTypes } from './action';

export const initState = {
  isLoggedIn: false,
  user: {
    id: 11,
    type: 'vendor',
  },

};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: false },
      };
    case actionTypes.CHANGE_USER:
      return {
        ...state,
        user: {
          ...initState.user,
          ...action.user,
        },
      };
    default:
      return state;
  }
}

export default reducer;
