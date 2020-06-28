export const actionTypes = {
  MESSAGES_SET_INFO: 'MESSAGES_SET_INFO',
  MESSAGES_APPEND_TO_TEXTS: 'MESSAGES_APPEND_TO_TEXTS',
  MESSAGES_UPDATE_TEXTS_OF_TEXTS: 'MESSAGES_UPDATE_TEXTS_OF_TEXTS',
  MESSAGES_APPEND_TO_CONVERSATIONS: 'MESSAGES_APPEND_TO_CONVERSATIONS',
};

export function setInfo(props) {
  return { type: actionTypes.MESSAGES_SET_INFO, props };
}

export function appendToTexts(texts) {
  return { type: actionTypes.MESSAGES_APPEND_TO_TEXTS, texts };
}

export function appendToConversations(conversation) {
  return { type: actionTypes.MESSAGES_APPEND_TO_CONVERSATIONS, conversation };
}

export function updateTextsOfTexts(ids, props) {
  return { type: actionTypes.MESSAGES_UPDATE_TEXTS_OF_TEXTS, ids, props };
}
