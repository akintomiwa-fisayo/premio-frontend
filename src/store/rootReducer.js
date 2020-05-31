import { combineReducers } from 'redux';
import product from './product/reducer';
import countries from './countries/reducer';
import myProduct from './myProduct/reducer';
import setting from './setting/reducer';
import cart from './cart/reducer';
import auth from './auth/reducer';

export default combineReducers({
  countries,
  auth,
  product,
  myProduct,
  setting,
  cart,
});
