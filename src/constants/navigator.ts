import { featureFlags } from './featureFlags';
import { COMMON } from './content';

export interface NavigationItem {
  name: string;
  path: string;
}

interface NavigationItemWithFlag extends NavigationItem {
  flag: boolean;
}

const baseItems: NavigationItemWithFlag[] = [
  { name: COMMON.nav.home, path: '/#header', flag: true },
  { name: COMMON.nav.about, path: '/#about', flag: featureFlags.showAbout },
  {
    name: COMMON.nav.projects,
    path: '/#projects',
    flag: featureFlags.showProjects,
  },
  {
    name: COMMON.nav.experience,
    path: '/#experience',
    flag: featureFlags.showExperience,
  },
  { name: COMMON.nav.skills, path: '/#skills', flag: featureFlags.showSkills },
  {
    name: COMMON.nav.contact,
    path: '/#contact',
    flag: featureFlags.showContact,
  },
];

export const navigationItems: NavigationItem[] = baseItems
  .filter((item) => item.flag)
  .map(({ flag: _flag, ...rest }) => rest);

export const getNavigationItems = (): NavigationItem[] => navigationItems;
