import {RenderPosition} from "../const";

const render = (container, element, place = RenderPosition.BEFOREEND, elementBefore) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.insertBefore(element, elementBefore.nextSibling);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {render, renderTemplate, createElement};
