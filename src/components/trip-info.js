import AbstractComponent from "./abstract-component.js";

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

  constructor(tripEventsModel) {
    super();
    this._tripEventsModel = tripEventsModel;
  }

  getTemplate() {
    return !this._tripEventsModel.isEmpty() ? createTripInfoTemplate(this._tripEventsModel.getTripInfo()) : ``;
  }

}
