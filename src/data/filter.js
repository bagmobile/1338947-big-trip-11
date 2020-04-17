const filters = [`everything`, `future`, `past`];

export const getFilter = () => {
  return filters.map((filter) => ({name: filter}));
};
