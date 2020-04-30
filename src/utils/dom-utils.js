const KeyButton = {
  ESC_KEY: `Escape`,
  ENTER_KEY: `Enter`,
  SPACE_KEY: ``
};

export const isEscEvent = function (evt, onKeyDown) {
  if (evt.key === KeyButton.ESC_KEY) {
    onKeyDown(evt);
  }
};
