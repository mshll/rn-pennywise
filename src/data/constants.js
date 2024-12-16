export const QUIZ_LEVELS = {
  Beginner: { icon: 'seedling', color: 'green', description: "Let's start learning!" },
  Intermediate: { icon: 'tree', color: 'blue', description: 'Growing your knowledge!' },
  Advanced: { icon: 'crown', color: 'orange', description: 'You are getting better!' },
  Expert: { icon: 'star', color: 'purple', description: 'Almost a master!' },
  Master: { icon: 'trophy', color: 'pink', description: 'The ultimate challenge!' },
};

export const THEMES = ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple'];

export const ROUTE_THEMES = {
  Home: 'orange',
  Chores: 'green',
  Quizzes: 'blue',
  Store: 'purple',
  Profile: 'pink',
};

export const INITIAL_BALANCE = 80;

export const getThemeForRoute = (routeName) => {
  return ROUTE_THEMES[routeName] || ROUTE_THEMES.Home;
};
