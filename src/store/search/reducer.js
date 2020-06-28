import { actionTypes } from './action';

export const initialState = {
  products: false, // [Product, Product,...]
  loading: false,
  listView: true,
  showFilter: false,
  sort: 'sortByDateDesc',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
