const allTripDays = [
  {
    dateTime: new Date(),
    events: [{name: `1`}, {name: `2`}, {name: `3`}, {name: `4`}],
  },
  {
    dateTime: new Date(),
    events: [{name: `1`}],
  },
];

export const getTripData = (count) => {
  return allTripDays.slice(0, count);
};
