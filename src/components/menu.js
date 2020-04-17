const createMenuTab = (tab, isActive) => {
  const {name, url} = tab;
  const tabActiveClass = isActive ? `trip-tabs__btn--active` : ``;

  return (`<a class="trip-tabs__btn ${tabActiveClass}" href="${url}">${name}</a>`);
};

export const createMenuTemplate = (menu) => {
  const menuTabs = menu.map((tab, index) => createMenuTab(tab, index === 0)).join(`\n`);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
              ${menuTabs}
            </nav>`);
};
