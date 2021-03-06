import { actionTypes } from './action';

export const initState = {
  details: false, // {fistName: value, lastName: value}
  following: false, // [User, User, User]
  followers: false, // [User, User, User]
  statesOptions: false,
  citiesOptions: false,
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.PROFILE_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
