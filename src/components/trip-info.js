import AbstractComponent from "./abstract-component.js";
import {formatDatePeriod} from "../utils/common.js";

const createTripInfoTemplate = (tripInfo) => {
  const {title, period, cost} = tripInfo;

  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>

              <p class="trip-info__dates">${period}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
          </section>`);
};

export class TripInfo extends AbstractComponent {

  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return (this._tripEvents.length !== 0) ? createTripInfoTemplate(this.getTripInfo()) : ``;
  }

  getCost() {
    let sum = 0;
    this._tripEvents.forEach((item) => {
      sum += item.price + item.offers.reduce((acc, offer) => {
        acc += offer.price;
        return acc;
      }, 0);
    });
    return sum;
  }

  getTitle() {
    const TITLE_COUNT_TOWN = 3;
    const towns = this._tripEvents
      .slice()
      .filter((item, index) => [0, 1, this._tripEvents.length - 1].includes(index))
      .map((item) => item.town);
    return (TITLE_COUNT_TOWN < towns.length) ? towns.join(` - `) : [towns[0], towns[towns.length - 1]].join(` - ... - `);
  }

  getTripInfo() {
    return {
      title: this.getTitle(this._tripEvents),
      period: formatDatePeriod(this._tripEvents[0].startDateTime, this._tripEvents[this._tripEvents.length - 1].endDateTime),
      cost: this.getCost(this._tripEvents),
    };
  }

}
