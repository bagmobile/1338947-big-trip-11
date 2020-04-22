import {getPeriodShortFormat} from "../utils/util.js";

const TITLE_COUNT_TOWN = 3;

const getCost = (events) => {
  let sum = 0;
  events.forEach((item) => {
    sum += item.price + item.offers.reduce((acc, offer) => {
      acc += offer.price;
      return acc;
    }, 0);
  });
  return sum;
};

const getTitle = (events) => {
  const towns = events
    .slice()
    .filter((item, index) => [0, 1, events.length - 1].includes(index))
    .map((item) => item.town);
  return (TITLE_COUNT_TOWN < events.length) ? towns.join(` - `) : [towns[0], towns[events.length - 1]].join(` - ... - `);
};

const getPeriod = (events) => {
  const [startDateTime, endDateTime] = getPeriodShortFormat(events[0].startDateTime, events[events.length - 1].endDateTime);
  return [startDateTime, endDateTime].join(` - `);
};

export const getTripInfo = (tripEvents) => {
  return (tripEvents.length === 0) ? null : {
    title: getTitle(tripEvents),
    period: getPeriod(tripEvents),
    cost: getCost(tripEvents),
  };
};
