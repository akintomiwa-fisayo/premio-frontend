// import { alert } from '../lib/js';
import { setInfo } from '../store/sales/action';

let fetching = false;
export default ({
  store, dispatchEvent, fetchRequest,
}) => {
  if (!fetching) {
    const { user } = store.auth;
    if (user && user.isVendor) {
      fetching = true;

      fetchRequest({
        url: `${process.env.REACT_APP_API}/vendors/${user.id}/sales`,
      }).then((report) => {
        dispatchEvent(setInfo({
          report,
          loading: false,
        }));
      }).catch(() => {
        console.log('~~~~~~~PROFILE TASK GOT ERROR WHEN STORE', store);
      }).finally(() => {
        fetching = false;
      });
    } // else alert('user not set yet');
  }
};
