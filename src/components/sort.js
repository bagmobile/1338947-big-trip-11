import AbstractComponent from "./abstract-component.js";

const createSortingElement = (sort, isChecked) => {
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
              <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-${name}">
                ${name}
              </label>
            </div>`);
};
const createSortTemplate = (sort) => {
  const sortList = sort.map((item, index) => createSortingElement(item, index === 1)).join(`\n`);

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortList}
          </form>`);
};

export class Sort extends AbstractComponent {

  constructor(sort) {
    super();
    this._sort = sort;
  }

  getTemplate() {
    return createSortTemplate(this._sort);
  }

}
