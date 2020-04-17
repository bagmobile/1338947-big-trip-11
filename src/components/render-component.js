export const render = (container, template, place = `afterend`) => {
  container.insertAdjacentHTML(place, template);
};
