import AbstractComponent from "./abstract-component";

const createEventDetailsTemplate = () => {
  return (`<section class="event__details"></section>`);
};

export class EventDetailsComponent extends AbstractComponent {

  getTemplate() {
    return createEventDetailsTemplate();
  }
}
