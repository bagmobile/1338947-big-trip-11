import * as util from "../utils/util.js";

const MAX_EVENT_COUNT = 15;
const MAX_DESTINATION_SENTENCE = 5;
const MAX_DESTINATION_PHOTO = 7;
const TRIP_RANGE_PRICE = [100, 500];

const eventTypes = [[`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`], [`Check-in`, `Sightseeing`, `Restaurant`]];

const towns = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Peterburg`];

const offers = [
  [`luggage`, `Add luggage`, 30],
  [`comfort`, `Switch to comfort class`, 100],
  [`meal`, `Add meal`, 15],
  [`seats`, `Choose seats`, 5],
  [`train`, `Travel by train`, 40],
];

const destinations = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];


const getType = () => {
  return generateType();
};

const getTown = () => {
  return util.getRandomArrayItem(towns);
};

const getPrice = () => {
  return util.getRandomNumber(...TRIP_RANGE_PRICE);
};

const generateType = () => {
  const [transport, activity] = eventTypes;
  return util.getRandomArrayItem([...transport, ...activity]);
};

const setDateTime = (tripEvent) => {
  const [startDateTime, endDateTime] = (util.getRandomDate(true, util.getRandomNumber(10, 400)));
  tripEvent.startDateTime = startDateTime;
  tripEvent.endDateTime = endDateTime;
};

const getOffers = () => {
  return offers.map((offer) => {
    const [type, name, price] = offer;
    return {type, name, price, isChecked: 0};
  });
};

const getDestination = () => {
  return {
    description: destinations.slice(util.getRandomNumber(0, 4), MAX_DESTINATION_SENTENCE).join(`\n`),
    photos: (new Array(MAX_DESTINATION_PHOTO))
      .fill({})
      .map(() => ({src: `http://picsum.photos/248/152?r=${util.getRandomNumber(0, 500)}`})),
  };
};

const getRandomOffers = () => {
  return getOffers().slice(0, util.getRandomNumber(0, offers.length));
};

const getFavorite = () => {
  return Boolean(Math.floor(util.getRandomNumber(0, 2)));
};

const generateMockTripEvent = (tripEvent) => {
  tripEvent.type = getType();
  tripEvent.town = getTown();
  tripEvent.price = getPrice();
  setDateTime(tripEvent);
  tripEvent.offers = getRandomOffers();
  tripEvent.destination = getDestination();
  tripEvent.isFavorite = getFavorite();
  return tripEvent;
};

export const getEventTypes = () => {
  return eventTypes;
};

export const getEventTowns = () => {
  return towns;
};

export const getEventOffers = () => {
  return getOffers();
};

export const generateEvents = (tripEvent) => {

  return Array(MAX_EVENT_COUNT)
    .fill({})
    .map(() => Object.assign({}, tripEvent))
    .map((evt) => generateMockTripEvent(evt));
};


