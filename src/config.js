export const MAX_COUNT_OFFER_SHOW = 3;

export const tripEventTypes = new Map([
  [`to`, [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]],
  [`in`, [`check-in`, `sightseeing`, `restaurant`]],
]);

export const MenuTab = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const SortType = {
  DAY: `day`,
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  OFFERS: `offers`,
};

export const DayListType = {
  ORDERED: `ordered`,
  GROUPED: `grouped`,
};

export const getTripEventTypes = () => {
  return [...tripEventTypes.values()];
};

export const getDefaultTripEventType = () => {
  return getTripEventTypes()[0][0];
};

