import AbstractComponent from "./abstract-component";

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

  constructor(tripDestinationsModel, destination, currentName = null) {
    super();
    this._destination = !currentName ? destination : tripDestinationsModel.getDestination(currentName);
  }

  getTemplate() {

    return createEventDestinationTemplate(this._destination);
  }

}

