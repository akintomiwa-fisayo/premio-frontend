// import { alert } from '../lib/js';
import { setInfo } from '../store/teamMates/action';

let fetching = false;
export default ({
  store, dispatchEvent, fetchRequest,
}) => {
  if (!fetching) {
    const { user } = store.auth;
    if (user) {
      fetching = true;

      fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${user.id}/team_mates`,
      }).then((users) => {
        dispatchEvent(setInfo({
          users,
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
