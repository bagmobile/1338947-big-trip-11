import {FilterType} from "../config";
import AbstractComponent from "./abstract-component";

const createFilterElement = (filter, isChecked, isHidden) => {
  const checked = isChecked ? `checked` : ``;
  const hidden = isHidden ? `` : `visually-hidden`;

  return (`<div class="trip-filters__filter">
    <input
            id="filter-${filter}"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter}"
            ${checked}
    >
    <label class="trip-filters__filter-label ${hidden}" for="filter-${filter}">${filter}</label>
    </div>`);
};

const createFilterTemplate = (filters, filterType, options) => {
  const filtersList = filters.map((filter) => createFilterElement(filter, filter === filterType, options[filter])).join(`\n`);

  return (`<form class="trip-filters" action="#" method="get">
    ${filtersList}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
};

export class FilterComponent extends AbstractComponent {

  constructor(tripEventStore, filterType = FilterType.EVERYTHING) {
    super();
    this._tripEventStore = tripEventStore;
    this._currenFilterType = filterType;
  }

  getTemplate() {
    return createFilterTemplate(Object.values(FilterType), this.getCurrentFilterType(), this._tripEventStore.getAvailableFilterTypes());
  }

  getCurrentFilterType() {
    return this._currenFilterType;
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      this._currenFilterType = evt.target.id.replace(/^.+-/, ``);
      handler(this._currenFilterType);
    });
  }

}
