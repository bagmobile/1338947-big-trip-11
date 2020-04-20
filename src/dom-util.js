const KeyButton = {
  ESC_KEY: `Escape`,
  ENTER_KEY: `Enter`,
  SPACE_KEY: ``
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    default:
      container.appendChild(element);
  }
};

export const renderHtml = (container, template, place = `afterend`) => {
  container.insertAdjacentHTML(place, template);
};

export const isEscEvent = function (evt, onKeyDown) {
  if (evt.key === KeyButton.ESC_KEY) {
    onKeyDown(evt);
  }
};
