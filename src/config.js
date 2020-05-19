import {getDefaultTripEventType} from "./utils/common";

export const MAX_COUNT_OFFER_SHOW = 3;
export const TRIP_INFO_COUNT_DESTINATION_NAME = 3;
export const STATS_BAR_HEIGHT = 36;
export const URL = `https://11.ecmascript.pages.academy/big-trip`;
export const AUTHORIZATION = `Basic kTy9gIdsz2317rA`;

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

export const TripEventErrorType = {
  DESTINATION: `Error! Editing points of destination is not available now!`,
  OFFER: `Error! View offer list is not available now!`,
  EVENT: `Error! Events data is not available now! Come back later.`,
};

export const TripEventOperation = {
  SAVE: `Save`,
  DELETE: `Delete`,
};

export const waitButtonsMap = new Map([[TripEventOperation.SAVE, `Saving...`], [TripEventOperation.DELETE, `Deleting...`]]);

export const DEFAULT_TRIP_EVENT_TYPE = getDefaultTripEventType();

export const OfferListType = {
  SHORT_TEXT_LIST: `shortTextList`,
  CHECKED_OPTION_LIST: `checkedOptionList`,
  AVAILABLE_OPTION_LIST: `availableOptionList`,
};
