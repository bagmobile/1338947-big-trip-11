const createPhotoItemTemplate = (photo) => {
  const {src} = photo;

  return (`<img class="event__photo" src="${src}" alt="Event photo">`);
};

export const createEventDestinationTemplate = (destination) => {
  const {description, photos} = destination;
  const list = photos.map((photo) => createPhotoItemTemplate(photo)).join(`\n`);

  return (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
        ${description}
    </p>
    <div class="event__photos-container">
        <div class="event__photos-tape">
            ${list}
        </div>
    </div>
</section>
`);
};
