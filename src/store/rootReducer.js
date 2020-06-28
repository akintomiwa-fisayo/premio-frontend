import { combineReducers } from 'redux';
import search from './search/reducer';
import payment from './payment/reducer';
import account from './account/reducer';
import countries from './countries/reducer';
import home from './home/reducer';
import purchases from './purchases/reducer';
import commissions from './commissions/reducer';
import myClients from './myClients/reducer';
import sales from './sales/reducer';
import teamMates from './teamMates/reducer';
import profile from './profile/reducer';
import messages from './messages/reducer';
import myProducts from './myProducts/reducer';
import setting from './setting/reducer';
import cart from './cart/reducer';
import auth from './auth/reducer';

export default combineReducers({
  account,
  auth,
  countries,
  home,
  purchases,
  teamMates,
  messages,
  commissions,
  myClients,
  sales,
  profile,
  search,
  payment,
  myProducts,
  setting,
  cart,
});
