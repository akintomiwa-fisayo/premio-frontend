import { actionTypes } from './action';

export const initialState = {
  documentLoaded: false,
  header: {
    show: true, // <== show or hide the header
    height: 0,
    type: 'home',
    label: '',
    onGoBack: () => {},
    noUser: false, // <== show or hide the icon at top right corner
    icon: false, // <== what to display at the top right corner
  },
  nav: {
    height: 0,
    show: true,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_APP_MODE:
      return {
        ...state,
        appMode: state.appMode === 'customer' ? 'vendor' : 'customer',
      };
    case actionTypes.DOCUMENT_LOADED:
      return {
        ...state,
        documentLoaded: true,
      };
    case actionTypes.CHANGE_CURRENCY_SUCCESS:
      return {
        ...state,
        ...{ currency: action.currency },
      };
    case actionTypes.CHANGE_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          ...action.header,
        },
      };
    case actionTypes.CHANGE_NAV:
      return {
        ...state,
        nav: {
          ...state.nav,
          ...action.nav,
        },
      };
    case actionTypes.RESET_HEADER:
      return {
        ...state,
        header: {
          ...initialState.header,
          height: state.header.height,
        },
      };
    case actionTypes.RESET_NAV:
      return {
        ...state,
        nav: {
          ...initialState.nav,
          height: state.nav.height,
        },
      };
    default:
      return state;
  }
}

export default reducer;
