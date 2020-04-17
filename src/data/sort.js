const sortTypes = [`day`, `event`, `time`, `price`, `offers`];

const getHeaders = () => {
  return [`day`, `offers`];
};

const isHeader = (sortingType) => {
  return getHeaders().includes(sortingType);
};

export const getSort = () => {
  return sortTypes.map((sortingType) => ({name: sortingType, isHeader: isHeader(sortingType)}));
};


