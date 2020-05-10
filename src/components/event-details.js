import AbstractComponent from "./abstract-component.js";

const createEventDetailsTemplate = () => {

  return (`<section class="event__details">
                    </section>`);
};

export class EventDetails extends AbstractComponent {

  getTemplate() {
    return createEventDetailsTemplate();
  }
}
