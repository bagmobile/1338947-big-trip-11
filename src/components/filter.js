import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../config";

const FILTER_ID_PREFIX = `filter-`;

const getFilterTypeByElement = (inputId) => {
  return inputId.substring(FILTER_ID_PREFIX.length);
};

const createFilterElement = (filter, isChecked) => {
  const checked = isChecked ? `checked` : ``;

  return (`<div class="trip-filters__filter">
    <input
            id="filter-${filter}"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter}"
            ${checked}
    >
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`);
};

const createFilterTemplate = (filters, filterType) => {
  const filtersList = filters.map((filter) => createFilterElement(filter, filter === filterType)).join(`\n`);

  return (`<form class="trip-filters" action="#" method="get">
    ${filtersList}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
};

export class Filter extends AbstractComponent {

  constructor(filterType = FilterType.EVERYTHING) {
    super();
    this._currenFilterType = filterType;
  }

  getTemplate() {
    return createFilterTemplate(Object.values(FilterType), this.getCurrentFilterType());
  }

  getCurrentFilterType() {
    return this._currenFilterType;
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      this._currenFilterType = getFilterTypeByElement(evt.target.id);
      handler(this._currenFilterType);
    });
  }

}
