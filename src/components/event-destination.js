import AbstractComponent from "./abstract-component.js";

const createPhotoItemTemplate = (photo) => {
  const {src, description} = photo;

  return (`<img class="event__photo" src="${src}" alt="${description}">`);
};

const createEventDestinationTemplate = (destination) => {
  const {description, photos} = destination;

  const photoList = photos.map((photo) => createPhotoItemTemplate(photo)).join(`\n`);

  return (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
        ${description}
    </p>
    <div class="event__photos-container">
        <div class="event__photos-tape">
            ${photoList}
        </div>
    </div>
</section>
`);
};

export class EventDestination extends AbstractComponent {

  constructor(tripDestinationsModel, destination, currentTown = null) {
    super();
    this._destination = !currentTown ? destination : tripDestinationsModel.getDestination(currentTown);
  }

  getTemplate() {

    return createEventDestinationTemplate(this._destination);
  }

}

