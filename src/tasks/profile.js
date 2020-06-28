// import { alert } from '../lib/js';
import { setInfo } from '../store/profile/action';

let fetching = false;
export default ({
  store, dispatchEvent, fetchRequest,
}) => {
  if (!fetching) {
    if (store.auth.user) {
      fetching = true;
      // Only fecthes data ones

      const { user } = store.auth;

      console.log('INSIDE THE PROFILE SHIII', store.auth.user.id);
      fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${user.id}`,
      }).then((res) => {
        console.log('full user details is', res);
        const {
          followers, following, subscription, ...details
        } = res;
        dispatchEvent(setInfo({
          details,
          following,
          followers,
          subscription,
          loading: false,
        }));
      }).catch(() => {
        console.log('~~~~~~~PROFILE TASK GOT ERROR WHEN STORE', store);
      });
    } // else alert('user not set yet');
  }
};
