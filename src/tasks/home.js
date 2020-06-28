import { alert } from '../lib/js';
import { setInfo } from '../store/home/action';

let fetching = false;
export default ({
  store, dispatchEvent, fetchRequest,
}) => {
  if (!fetching) {
    fetching = true;

    fetchRequest({
      url: `${process.env.REACT_APP_API}/users`,
    }).then((vendors) => {
      dispatchEvent(setInfo({ vendors, loading: false, firstLoad: false }));
    }).catch(() => {
      alert(
        '',
        'Error connecting to server, please try again',
        [{
          text: 'ok',
        }],
      );
    }).finally(() => {
      fetching = false;
    });
  } // else alert('i cant guy is loading');
};
