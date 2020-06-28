const { Modal } = require('antd-mobile');

const { alert } = Modal;

exports.alert = (title = '', message = '', actions = []) => {
  alert(title, message, actions, 'android');
};

exports.getWeekDay = (day) => {
  const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return isNaN(day) ? false : weekdays[day];
};

exports.getMonth = (month) => {
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  return isNaN(month) ? false : months[month];
};
/* exports.getRelativeTime = (timestamp, relative = true) => {
  const d1 = new Date();
  const d2 = new Date(timestamp);
  let relativeTime = '';

  let year = d2.getFullYear();
  year = d1.getFullYear() > year ? `${year}` : '';
  const month = d2.getMonth();
  let hour = d2.getHours();
  const hourPref = hour >= 12 ? 'pm' : 'am';
  if (hour === 0) {
    hour = 12;
  } else {
    hour = hour > 12 ? hour - 12 : hour;
  }
  const date = d2.getDate() + 1;
  const minutes = d2.getMinutes();
  let minutesDbl = `${minutes}`;
  minutesDbl = minutesDbl.length === 1 ? `0${minutesDbl}` : minutesDbl;
  const day = exports.getWeekDay(d2.getDay());
  if (relative) {
    const diffInMilliseconds = d1 - d2;
    const diffInSec = Math.floor(diffInMilliseconds / 1000);
    if (diffInSec >= 60) { // 60 seconds make a minute
      const diffInMinutes = Math.floor(diffInSec / 60);
      if (diffInMinutes >= 60) { // 60 minutes make in an hour
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours >= 24) { // 24 hours make in a day
          const diffInDays = Math.floor(diffInHours / 24);
          if (diffInDays >= 6) { // 7 day make in a week
            relativeTime = ` ${date}/${month}/${year}, ${hour}:${minutesDbl}${hourPref}`;
          } else if (diffInDays === 1) {
            relativeTime = `yesterday, ${hour}:${minutesDbl}${hourPref}`;
          } else {
            relativeTime = `${day}, ${hour}:${minutesDbl}${hourPref}`;
          }
        } else relativeTime = `${diffInHours}hr${diffInHours > 1 ? 's' : ''} ago`;
      } else relativeTime = `${diffInMinutes}min${diffInMinutes > 1 ? 's' : ''} ago`;
    } else relativeTime = 'just now';
  } else {
    relativeTime = `${date}/${month}/${year}, ${hour}:${minutesDbl}${hourPref}`;
  }

  return relativeTime;
}; */
exports.getRelativeTime = (timestamp, relative = true, format = 'fullText') => {
  const d1 = new Date();
  const d2 = new Date(timestamp);
  let relativeTime = '';

  const Year = d2.getFullYear();
  const year = d1.getFullYear() === Year ? '' : `${Year}`;
  const month = exports.getMonth(d2.getMonth());
  let hour = d2.getHours();
  const hourPref = hour >= 12 ? 'pm' : 'am';
  if (hour === 0) {
    hour = 12;
  } else {
    hour = hour > 12 ? hour - 12 : hour;
  }
  const date = d2.getDate() + 1;
  const minutes = d2.getMinutes();
  let minutesDbl = `${minutes}`;
  minutesDbl = minutesDbl.length === 1 ? `0${minutesDbl}` : minutesDbl;
  const day = exports.getWeekDay(d2.getDay());
  if (relative) {
    const diffInMilliseconds = d1 - d2;
    const diffInSec = Math.floor(diffInMilliseconds / 1000);
    if (diffInSec >= 60) { // 60 seconds make a minute
      const diffInMinutes = Math.floor(diffInSec / 60);
      if (diffInMinutes >= 60) { // 60 minutes make in an hour
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours >= 24) { // 24 hours make in a day
          const diffInDays = Math.floor(diffInHours / 24);
          if (diffInDays >= 7) { // 7 day make in a week
            if (format === 'fullText') {
              relativeTime = `${day}, ${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
            } else if (format === 'text') {
              relativeTime = `${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
            } else if (format === 'number-without-time') {
              relativeTime = `${date}/${d2.getMonth()}/${year}`;
            } else {
              // its number
              relativeTime = `${date}/${d2.getMonth()}/${year} at ${hour}:${minutesDbl} ${hourPref}`;
            }
          } else if (diffInDays === 1) {
            if (format === 'number-without-time') {
              relativeTime = 'yesterday';
            } else {
              relativeTime = `yesterday at ${hour}:${minutesDbl} ${hourPref}`;
            }
          } else if (format === 'number-without-time') {
            relativeTime = `last ${day}`;
          } else {
            relativeTime = `last ${day} at ${hour}:${minutesDbl} ${hourPref}`;
          }
        } else relativeTime = `${diffInHours}hr${diffInHours > 1 ? 's' : ''} ago`;
      } else relativeTime = `${diffInMinutes}min${diffInMinutes > 1 ? 's' : ''} ago`;
    } else relativeTime = 'just now';
  } else if (format === 'fullText') {
    relativeTime = `${day}, ${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
  } else if (format === 'text') {
    relativeTime = `${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
  } else if (format === 'number-without-time') {
    relativeTime = `${date}/${d2.getMonth()}/${year}`;
  } else {
    // its number
    relativeTime = `${date}/${d2.getMonth()}/${Year} at ${hour}:${minutesDbl} ${hourPref}`;
  }

  return relativeTime;
};

exports.formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

exports.parseQueryString = (query) => {
  const obj = {};
  let values = query.split('?');
  if (values[1]) {
    values = values[1].split('&');
    values.forEach((value) => {
      const foo = value.split('=');
      obj[foo[0]] = foo[1];
    });
  }
  return obj;
};

exports.isEmpty = (str) => (str ? !`${str}`.trim() : true);
exports.isEmail = (str) => (!((/[a-z0-9]+@+[a-z0-9]+\.+[a-z]{3,}/i.test(str) === false || /[^a-z0-9._@]/i.test(str) === true)));
exports.devalueString = (string) => {
  let returnee = '';
  for (let i = 0; i < string.length; i += 1) {
    if (exports.isUpperCase(string[i])) {
      // popMessage(string[i] + " is isUpperCase")
      returnee += ` ${string[i].toLowerCase()}`;
    } else if (string[i] === '_' || string[i] === '-') {
      returnee += ' ';
    } else {
      returnee += string[i];
    }
  }

  return returnee;
};
exports.isUpperCase = (v) => (!!(v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()));

exports.isLowerCase = (v) => (!!(v.toUpperCase() !== v.toLowerCase() && v === v.toLowerCase()));
exports.ucFirst = (value) => {
  if (isNaN(value)) {
    const newValue = value.split('');
    newValue[0] = newValue[0].toUpperCase();
    return newValue.join('');
  }
  return '1233';
};
exports.lcFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i += 1) {
      if (i === 0) {
        newValue = value[0].toLowerCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};

exports.stringSimilarity = (s1, s2) => {
  const editDistance = () => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i += 1) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j += 1) {
        if (i === 0) { costs[j] = j; } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) { costs[s2.length] = lastValue; }
    }
    return costs[s2.length];
  };
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};
