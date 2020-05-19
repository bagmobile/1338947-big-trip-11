import AbstractComponent from "./abstract-component";
import EventDestinationStore from "../models/event-destination-store";

const createPictureItemTemplate = (picture) => {
  const {src, description} = picture;

  return (`<img class="event__photo" src="${src}" alt="${description}">`);
};

const createEventDestinationTemplate = (destination) => {
  const {description, pictures} = destination;

  const picturesList = pictures.map((picture) => createPictureItemTemplate(picture)).join(`\n`);

  return (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
        ${description}
    </p>
    <div class="event__photos-container">
        <div class="event__photos-tape">
            ${picturesList}
        </div>
    </div>
</section>
`);
};

export class EventDestinationComponent extends AbstractComponent {

  constructor(destination, currentName = null) {
    super();
    this._eventDestinationStore = new EventDestinationStore();
    this._destination = !currentName ? destination : this._eventDestinationStore.getDestination(currentName);
  }

  getTemplate() {

    return createEventDestinationTemplate(this._destination);
  }

}

