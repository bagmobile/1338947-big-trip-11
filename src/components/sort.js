import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DAY: `day`,
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  OFFERS: `offers`,
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

  constructor() {
    super();
    this._currenSortType = SortType.EVENT;
  }

  getTemplate() {
    return createSortTemplate(this.getSort(), this._currenSortType);
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
    this.getElement().addEventListener(`click`, (evt) => {

      if (!evt.target.className.match(`trip-sort__btn`)) {
        return;
      }

      const sortType = evt.target.previousElementSibling.id.replace(`sort-`, ``);

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }

  getSortedEvents(tripEvents, sortType) {

    switch (sortType) {
      case SortType.TIME:
        return tripEvents.sort(function (a, b) {
          return (b.endDateTime.getTime() - b.startDateTime.getTime()) - (a.endDateTime.getTime() - a.startDateTime.getTime());
        });
      case SortType.PRICE:
        return tripEvents.sort(function (a, b) {
          return (b.price - a.price);
        });
      default :
        return tripEvents.sort(function (a, b) {
          return a.startDateTime.getTime() - b.startDateTime.getTime();
        });
    }
  }

}
