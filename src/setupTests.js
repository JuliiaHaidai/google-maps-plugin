import "@testing-library/jest-dom";

window.google = {
  maps: {
    places: {
      Autocomplete: class {},
    },
  },
};
