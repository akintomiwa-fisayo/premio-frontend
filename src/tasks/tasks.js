import home from './home';
import profile from './profile';
import sales from './sales';
import purchases from './purchases';
import commisions from './commisions';
import teamMates from './teamMates';
import myProducts from './myProducts';
import messages from './messages';
import myClients from './myClients';

export default (props = {
  store: {},
  dispatchEvent: () => {},
  fetchRequest: () => {},
  FetchRequest: () => {},
}) => {
  home(props);
  myProducts(props);
  profile(props);
  sales(props);
  purchases(props);
  commisions(props);
  teamMates(props);
  myClients(props);
  messages(props);
  /*
 */
};
