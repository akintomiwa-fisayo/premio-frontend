// import { alert } from '../lib/js';
import { setInfo, appendToTexts } from '../store/messages/action';
import textsToConversations from '../pages/messaging/textsToConversations';

let fetching = false;
let firstCall = true;
export default ({
  store, dispatchEvent, fetchRequest,
}) => {
  if (!fetching) {
    const { user } = store.auth;
    const markAsDelivered = (textIds) => {
      fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${user.id}/messages/mark_as_delivered`,
        method: 'PATCH',
        body: JSON.stringify({
          messageIds: textIds,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    if (user) {
      fetching = true;
      const senderNotSeenMessageIds = [];
      if (!firstCall) {
        // get all sent messages that aint seen yet
        store.messages.texts.forEach((text) => {
          if (text.sender.id === user.id && !text.seen) {
            senderNotSeenMessageIds.push(text.id);
          }
        });
      }

      fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${user.id}/messages${!firstCall ? '?updates=true' : ''}`,
        method: 'PATCH',
        body: JSON.stringify({ messageIds: senderNotSeenMessageIds }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((Texts) => {
        const notDeliveredTextIds = [];
        const texts = [];
        Texts.forEach((text) => {
          if (!text.delivered && text.reciever.id === user.id) {
            texts.push({
              ...text,
              delivered: true,
            });

            notDeliveredTextIds.push(text.id);
          } else { texts.push({ ...text, sent: true }); }
        });

        if (firstCall) {
          firstCall = false;

          dispatchEvent(setInfo({
            texts,
            conversations: textsToConversations(texts, user.id),
            loading: false,
            senderId: user.id,
          }));
        } else {
          dispatchEvent(appendToTexts(Texts));
        }

        if (notDeliveredTextIds.length > 0) {
          // mark texts as delivered
          alert(`themake, ${notDeliveredTextIds.join(' ')}`);
          markAsDelivered(notDeliveredTextIds);
        }
      }).catch((err) => {
        console.log('~~~~~~~PROFILE TASK GOT ERROR WHEN STORE', err);
      }).finally(() => {
        fetching = false;
      });
    } // else alert('user not set yet');
  }
};
