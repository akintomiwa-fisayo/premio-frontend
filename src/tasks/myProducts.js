// import { alert } from '../lib/js';
import { setInfo } from '../store/myProducts/action';

let fetching = false;
export default ({
  store, dispatchEvent, fetchRequest,
}) => {
  if (!fetching) {
    const { user } = store.auth;
    if (user && user.isVendor) {
      fetching = true;
      // Only fecthes data ones

      console.log('INSIDE THE PROFILE SHIII', store.auth.user.id);
      fetchRequest({
        url: `${process.env.REACT_APP_API}/vendors/${user.id}/products`,
      }).then((products) => {
        dispatchEvent(setInfo({
          products,
          loading: false,
        }));
      }).catch(() => {
        console.log('~~~~~~~PROFILE TASK GOT ERROR WHEN STORE', store);
      });
    } // else alert('user not set yet');
  }
};
