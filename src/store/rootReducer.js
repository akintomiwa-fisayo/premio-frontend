import { combineReducers } from 'redux';
import post from './post/reducer';
import product from './product/reducer';
import countries from './countries/reducer';
import myProduct from './myProduct/reducer';
import setting from './setting/reducer';
import cart from './cart/reducer';
import compare from './compare/reducer';
import auth from './auth/reducer';
import wishlist from './wishlist/reducer';

export default combineReducers({
  countries,
  auth,
  post,
  product,
  myProduct,
  setting,
  cart,
  compare,
  wishlist,
});
