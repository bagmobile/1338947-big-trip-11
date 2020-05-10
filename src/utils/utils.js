import moment from "moment";
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
  const diffValue = sign * getRandomNumber(0, 7);
  const diff = targetDate.getDate() + diffValue;
  targetDate.setDate(diff);
  const extDate = new Date(targetDate);
  extDate.setMinutes(targetDate.getMinutes() + minute);
  if (isDouble) {
    return [
      moment(targetDate).toISOString(true), moment(extDate).toISOString(true),
    ];
  }
  return targetDate;
};

export const upperFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
