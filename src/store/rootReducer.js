import { combineReducers } from 'redux';
import post from './post/reducer';
import product from './product/reducer';
import myProduct from './myProduct/reducer';
import setting from './setting/reducer';
import cart from './cart/reducer';
import compare from './compare/reducer';
import auth from './auth/reducer';
import wishlist from './wishlist/reducer';

export default combineReducers({
  auth,
  post,
  product,
  myProduct,
  setting,
  cart,
  compare,
  wishlist,
});
