import { actionTypes } from './action';
import textsToConversations from '../../pages/messaging/textsToConversations';

export const initState = {
  texts: [],
  conversations: {}, // {palInfo: {}, chat:[]}
  senderId: '000000000000000000000000',
  newMessages: 0,
  chatReciever: {}, // <== User
  loading: true,
};

function reducer(state = initState, action) {
  const getNewMessages = (texts, senderId = state.senderId) => {
    let counter = 0;
    texts.forEach((text) => {
      if (text.reciever.id === senderId && !text.seen) {
        counter += 1;
      }
    });

    return counter;
  };

  switch (action.type) {
    case actionTypes.MESSAGES_SET_INFO: {
      const newState = {
        ...state,
        ...action.props,
      };

      return {
        ...newState,
        newMessages: getNewMessages(newState.texts, newState.senderId),
      };
    }
    case actionTypes.MESSAGES_APPEND_TO_TEXTS: {
      const newTextIds = action.texts.map((text) => text.id);
      const getNewText = (id) => {
        for (const text of action.texts) {
          console.log('YEYEYEYEYEY TETS', text);
          if (text.id === id) {
            return text;
          }
        }

        return {};
      };

      const texts = [];

      state.texts.forEach((text) => {
        const indexInNewTexts = newTextIds.indexOf(text.id);
        if (indexInNewTexts > -1) {
          texts.push({
            ...text,
            ...getNewText(text.id),
          });


          action.texts.splice(indexInNewTexts, 1);
          newTextIds.splice(indexInNewTexts, 1);
        } else {
          texts.push(text);
        }
      });


      action.texts.forEach((newText) => {
        texts.push(newText);
      });

      return {
        ...state,
        texts,
        conversations: textsToConversations(texts, state.senderId),
        newMessages: getNewMessages(texts),
      };
    }
    case actionTypes.MESSAGES_APPEND_TO_CONVERSATIONS: {
      console.log('WE WE WE WE WE WE WE WE WE WE WE WE WE WE WE MADE IT', { action });
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversation.palInfo.id]: action.conversation,
        },
      };
    }
    case actionTypes.MESSAGES_UPDATE_TEXTS_OF_TEXTS: {
      const texts = state.texts.map((text) => {
        const indexInIds = action.ids.indexOf(text.id);
        if (indexInIds > -1) {
          return {
            ...text,
            ...action.props[indexInIds],
          };
        }
        return text;
      });

      return {
        ...state,
        texts,
        conversations: textsToConversations(texts, state.senderId),
        newMessages: getNewMessages(texts),
      };
    }
    default:
      return state;
  }
}

export default reducer;
