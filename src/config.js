export const MAX_COUNT_OFFER_SHOW = 3;
export const TRIP_INFO_COUNT_DESTINATION_NAME = 3;
export const STATS_BAR_HEIGHT = 36;

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

export const TripEventOperation = {
  SAVE: `Save`,
  DELETE: `Delete`
};

export const waitButtonsMap = new Map([[TripEventOperation.SAVE, `Saving...`], [TripEventOperation.DELETE, `Deleting...`]]);

export const getTripEventTypes = () => {
  return [...tripEventTypes.values()];
};

export const getTripEventTypesList = () => {
  return getTripEventTypes().reduce((acc, item) => {
    acc.push(...item);
    return acc;
  }, []);
};

export const getDefaultTripEventType = () => {
  return getTripEventTypes()[0][0];
};

