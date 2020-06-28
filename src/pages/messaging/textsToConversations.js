export default (texts, senderId) => {
  const conversations = {};
  texts.forEach((text) => {
    let pal = 'reciever';
    if (text.reciever.id === senderId) {
      pal = 'sender';
    }

    if (Object.keys(conversations).indexOf(text[pal].id) !== -1) {
      conversations[text[pal].id].chat.push(text);
      if (!text.seen && pal === 'sender') {
        conversations[text[pal].id].newMessages += 1;
      }
    } else {
      conversations[text[pal].id] = {
        palInfo: text[pal],
        chat: [text],
        newMessages: pal === 'sender' && !text.seen ? 1 : 0,
      };
    }
  });

  return conversations;
};
