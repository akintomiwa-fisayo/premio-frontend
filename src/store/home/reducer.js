import { actionTypes } from './action';

export const initState = {
  vendors: [],
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.HOME_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    case actionTypes.HOME_SET_VENDORS:
      return {
        ...state,
        vendors: action.vendors,
      };
    case actionTypes.HOME_UPDATE_VENDORS:
      return {
        ...state,
        vendors: [
          ...action.vendors,
        ],
      };
    case actionTypes.HOME_UPDATE_A_VENDOR: {
      const vendors = state.vendors.map((vendor) => {
        if (vendor.id === action.id) {
          return {
            ...vendor,
            ...action.props,
          };
        }
        return vendor;
      });

      return {
        ...state,
        vendors,
      };
    }
    default:
      return state;
  }
}

export default reducer;
