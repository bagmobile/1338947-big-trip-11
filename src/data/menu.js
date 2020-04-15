const tabs = [`Table`, `Stats`];

export const getMenu = () => {
  return tabs.map((tab) => ({name: tab, url: `#`}));
};
