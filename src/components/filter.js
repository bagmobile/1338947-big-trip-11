const createFilterElement = (filter, isChecked) => {
  const {name} = filter;
  const checked = isChecked ? `checked` : ``;

  return (`<div class="trip-filters__filter">
    <input
            id="filter-${name}"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${name}"
            ${checked}
    >
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div>`);
};

export const createFilterTemplate = (filters) => {
  const filterElements = filters.map((filter, index) => createFilterElement(filter, index === 0)).join(`\n`);

  return (`<form class="trip-filters" action="#" method="get">
    ${filterElements}
    <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
};
