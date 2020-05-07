import * as util from "../utils/utils.js";
import * as config from "../config.js";
import {TripEventModel} from "../data/trip-event";

const MAX_EVENT_COUNT = 5;
const MAX_DESTINATION_COUNT = 20;
const MAX_DESTINATION_SENTENCE = 5;
const MAX_DESTINATION_PHOTO = 3;
const MAX_OFFER_COUNT = 7;
const TRIP_RANGE_PRICE = [100, 500];

const towns = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Peterburg`, `Moscow`, `Tver`, `Primorsk`];

const offers = [
  {title: `Add luggage`, price: 30},
  {title: `Switch to comfort class`, price: 100},
  {title: `Add meal`, price: 15},
  {title: `Choose seats`, price: 5},
  {title: `Travel by train`, price: 40},
  {title: `Offer small`, price: 140},
  {title: `Offer big`, price: 310},
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
  `In rutrum ac purus sit amet tempus.`,
];


const getType = () => {
  return generateType();
};

const getEventTypes = () => {
  return [...config.tripEventTypes.values()];
};

const getTown = () => {
  return util.getRandomArrayItem(towns);
};

const getPrice = () => {
  return util.getRandomNumber(...TRIP_RANGE_PRICE);
};

const generateType = () => {
  const [transport, activity] = getEventTypes();
  return util.getRandomArrayItem([...transport, ...activity]);
};

const getDateTime = () => {
  return (util.getRandomDate(true, util.getRandomNumber(10, 400)));
};

const getTripEventOffers = () => {
  return offers.slice(util.getRandomNumber(0, 3), util.getRandomNumber(0, MAX_OFFER_COUNT));
};

const getDestination = () => {
  return {
    description: destinations.slice(util.getRandomNumber(0, 4), MAX_DESTINATION_SENTENCE).join(`\n`),
    name: getTown(),
    photos: (new Array(MAX_DESTINATION_PHOTO))
      .fill({})
      .map(() => ({
        src: `http://picsum.photos/248/152?r=${util.getRandomNumber(0, 500)}`,
        description: `---`,
      })),
  };
};

const getFavorite = () => {
  return Boolean(Math.floor(util.getRandomNumber(0, 2)));
};

const generateMockTripEvent = () => {
  const [startDateTime, endDateTime] = getDateTime();
  return {
    id: String(Math.random()),
    type: getType(),
    startDateTime,
    endDateTime,
    price: getPrice(),
    offers: getTripEventOffers(),
    destination: getDestination(),
    isFavorite: getFavorite(),

  };
};

export const generateEvents = () => {
  return Array(MAX_EVENT_COUNT)
    .fill({})
    .map(() => new TripEventModel(generateMockTripEvent()));
};

export const generateDestinations = () => {
  return towns.map((town) => {
    return Object.assign(getDestination(), {name: town});
  });
};

export const generateTripOffers = () => {
  const [_to, _in] = [...config.tripEventTypes.values()];
  return [..._to, ..._in].slice().map((item) => {
    return {
      type: item,
      offers: offers.slice(0, MAX_OFFER_COUNT),
    };
  });
};


