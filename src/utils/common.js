import moment from "moment";
import flatpickr from "flatpickr";

export const formatToShortTime = (dateTime) => {
  return moment(dateTime).format(`HH:mm`);
};

export const formatShortDate = (dateTime) => {
  return moment(dateTime).format(`MMM D`);
};

export const durationDateTime = (startDateTime, endDateTime) => {
  const diff = moment.duration(moment(endDateTime).diff(moment(startDateTime)));

  return [`${diff.days()}D`, `${diff.hours()}H`, `${diff.minutes()}M`]
    .filter((item) => !item.match(/^0\D/))
    .join(` `);
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

