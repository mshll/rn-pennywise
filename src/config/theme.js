export const ROUTE_THEMES = {
  Home: 'orange',
  Chores: 'green',
  Quizzes: 'blue',
  Store: 'purple',
  Profile: 'pink',
};

export const getThemeForRoute = (routeName) => {
  return ROUTE_THEMES[routeName] || ROUTE_THEMES.Home;
};
