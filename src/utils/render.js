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

export const createHTMLCollection = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.children;
};

export const render = (container, component, place) => {
  let renderElement = component.getElement();

  if (renderElement instanceof HTMLCollection) {
    component.setElement(renderElement[1]);
  } else {
    renderElement = [renderElement];
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(...renderElement);
      break;
    case RenderPosition.BEFOREEND:
      container.append(...renderElement);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(...renderElement);
      break;
    case RenderPosition.AFTEREND:
      container.after(...renderElement);
      break;
    default:
      container.appendChild(...renderElement);
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  if (!component) {
    return;
  }
  component.getElement().remove();
  component.removeElement();
};
