export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min));
};

export const getRandomDate = (isDouble = false, minute = 0) => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 8);
  const diff = targetDate.getDate() + diffValue;
  targetDate.setDate(diff);
  const extDate = new Date(targetDate);
  extDate.setMinutes(targetDate.getMinutes() + minute);
  if (isDouble) {
    return [
      targetDate, extDate,
    ];
  }
  return targetDate;
};

export const getDiffDate = (timeStart, timeEnd) => {
  const mscDiff = timeEnd.getTime() - timeStart.getTime();
  const dayDiff = mscDiff / 24 / 60 / 60 / 1000;
  const minDiff = mscDiff / 60 / 1000;
  const hDiff = mscDiff / 3600 / 1000;
  const days = Math.trunc(dayDiff);
  const hours = Math.floor(hDiff) - 24 * days;
  const minutes = minDiff - 24 * 60 * days - 60 * hours;
  return [days, hours, minutes];
};

export const getShortFormatDate = (dateTime) => {
  let result = dateTime.toISOString();
  return result.slice(0, result.lastIndexOf(`:`))
    .replace(`T`, ` `)
    .split(`-`)
    .join(`/`)
    .slice(2);
};

export const getShortFormatTime = (dateTime) => {
  let result = dateTime.toISOString();
  return result.slice(result.indexOf(`T`) + 1, result.lastIndexOf(`:`));
};

export const getDayDateFormat = (dateTime) => {
  return dateTime.toString().slice(dateTime.toString().indexOf(` `) + 1, 10);
};
