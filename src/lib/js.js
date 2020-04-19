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
exports.getRelativeTime = (timestamp, relative = true) => {
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
};
