import AbstractComponent from "./abstract-component.js";
import {SortType} from "../config.js";

const SORT_ID_PREFIX = `sort-`;

const getSortTypeByElement = (inputId) => {
  return inputId.substring(SORT_ID_PREFIX.length);
};

const createSortElement = (sort, isChecked) => {
  const {name, isHeader} = sort;
  const checked = isChecked ? `checked` : ``;

  if (isHeader) {
    return (`<span class="trip-sort__item  trip-sort__item--${name}">${name}</span>`);
  }

  return (` <div class="trip-sort__item  trip-sort__item--${name}">
              <input
              id="sort-${name}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${name}"
              ${checked}
              >
              <label class="trip-sort__btn" for="sort-${name}">
                ${name}
              </label>
            </div>`);
};

const createSortTemplate = (sort, sortType) => {
  const sortList = sort.map((item) => createSortElement(item, item.name === sortType)).join(`\n`);

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortList}
          </form>`);
};

export class Sort extends AbstractComponent {

  constructor(sortType = SortType.EVENT) {
    super();
    this._currenSortType = sortType;
  }

  getTemplate() {
    return createSortTemplate(this.getSort(), this.getCurrentSortType());
  }

  getCurrentSortType() {
    return this._currenSortType;
  }

  getSort() {
    return Object.values(SortType).map((sortType) => ({name: sortType, isHeader: this.isHeader(sortType)}));
  }

  getHeaders() {
    return [SortType.DAY, SortType.OFFERS];
  }

  isHeader(sortType) {
    return this.getHeaders().includes(sortType);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      this._currenSortType = getSortTypeByElement(evt.target.id);
      handler(this._currenSortType);
    });
  }

}
