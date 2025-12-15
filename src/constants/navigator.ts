import { featureFlags } from './featureFlags';

export interface NavigationItem {
  name: string;
  path: string;
}

interface NavigationItemWithFlag extends NavigationItem {
  flag: boolean;
}

const baseItems: NavigationItemWithFlag[] = [
  { name: 'Home', path: '/#header', flag: true },
  { name: 'About', path: '/#about', flag: featureFlags.showAbout },
  { name: 'Projects', path: '/#projects', flag: featureFlags.showProjects },
  {
    name: 'Experience',
    path: '/#experience',
    flag: featureFlags.showExperience,
  },
  { name: 'Skills', path: '/#skills', flag: featureFlags.showSkills },
  { name: 'Contact', path: '/#contact', flag: featureFlags.showContact },
];

export const navigationItems: NavigationItem[] = baseItems
  .filter((item) => item.flag)
  .map(({ flag: _flag, ...rest }) => rest);

export const getNavigationItems = (): NavigationItem[] => navigationItems;
