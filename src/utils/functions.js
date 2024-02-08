export const getTodaysDate = () => {
  const d = new Date();
  return `${d.getDate()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${d.getFullYear()}`;
};

export const handleDate = e => {
  const d = new Date(e);
  return `${d.getDate()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${d.getFullYear()}`;
};

export const getCurrentTime = () => {
  var currentDate = new Date();
  var options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  var formattedTime = currentDate.toLocaleTimeString('en-IN', options);

  return formattedTime;
};

export const handleTime = e => {
  const d = new Date(e);

  var options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  var formattedTime = d.toLocaleTimeString('en-IN', options);

  return formattedTime;
};
