const createSortingElement = (sort, isChecked) => {
  const {name, isHeader} = sort;

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
              ${isChecked ? `checked` : ``}
              >
              <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-${name}">
                ${name}
              </label>
            </div>`);
};
export const createSortTemplate = (sort) => {
  const sortElements = sort.map((sorting, index) => createSortingElement(sorting, index === 1)).join(`\n`);

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortElements}
          </form>`);
};
