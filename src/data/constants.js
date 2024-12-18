export const QUIZ_LEVELS = {
  Beginner: { icon: 'seedling', color: 'green', description: "Let's start learning!" },
  Intermediate: { icon: 'tree', color: 'blue', description: 'Growing your knowledge!' },
  Advanced: { icon: 'crown', color: 'orange', description: 'You are getting better!' },
  Expert: { icon: 'star', color: 'purple', description: 'Almost a master!' },
  Master: { icon: 'trophy', color: 'pink', description: 'The ultimate challenge!' },
};

export const THEMES = ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple'];

export const ROUTE_THEMES = {
  // Child
  Home: 'red',
  Quizzes: 'blue',
  Chores: 'green',
  Store: 'purple',
  Profile: 'pink',

  // Parent
  ParentHome: 'red',
  ParentQuizzes: 'blue',
  ParentChores: 'green',
  ParentStore: 'purple',
  ParentProfile: 'pink',
  ParentChildren: 'orange',
};

export const INITIAL_BALANCE = 80;

export const getThemeForRoute = (routeName) => {
  return ROUTE_THEMES[routeName] || ROUTE_THEMES.Home;
};

export const CHILD_TITLES = [
  'Money Master In Training',
  'Future Financial Wizard',
  'Savings Superhero',
  'Piggy Bank Pro',
  'Budget Buddy',
  'Coin Collector Champion',
  'Financial Freedom Fighter',
];

export const getRandomChildTitle = () => {
  return CHILD_TITLES[Math.floor(Math.random() * CHILD_TITLES.length)];
};
