import moment from "moment";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

export const KeyButton = {
  ESC_KEY: `Escape`,
  ENTER_KEY: `Enter`,
  SPACE_KEY: ``,
};

export const formatToShortTime = (dateTime) => {
  return moment(dateTime).format(`HH:mm`);
};

export const formatShortDate = (dateTime) => {
  return moment(dateTime).format(`MMM D`);
};

export const formatToDefault = (dateTime) => {
  return moment(dateTime, `DD/MM/YY HH:mm`).format();
};

export const getDuration = (startDateTime, endDateTime) => {
  return moment.duration(moment(endDateTime).diff(moment(startDateTime)));
};

export const formatDuration = (diff) => {
  return [`${diff.days()}D`, `${diff.hours()}H`, `${diff.minutes()}M`]
    .filter((item) => !item.match(/^0\D/))
    .join(` `);
};

export const durationDateTime = (startDateTime, endDateTime) => {
  const diff = getDuration(startDateTime, endDateTime);

  return formatDuration(diff);
};

export const formatDatePeriod = (startDateTime, endDateTime) => {
  return [
    formatShortDate(startDateTime),
    formatShortDate(endDateTime).replace(formatShortDate(startDateTime).toString().slice(0, 3), ``),
  ].join(` - `);
};

export const getFlatpickr = (dateTime, element) => {
  // noinspection JSValidateTypes
  return flatpickr(element, {
    dateFormat: `d/m/y H:i`,
    enableTime: true,
    enableSeconds: false,
    minuteIncrement: 1,
    allowInput: true,
    defaultDate: dateTime || new Date(),

  });
};

export const upperFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEscEvent = function (evt, onKeyDown) {
  if (evt.key === KeyButton.ESC_KEY) {
    onKeyDown(evt);
  }
};
