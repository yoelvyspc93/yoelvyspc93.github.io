const showHeader = process.env.NEXT_PUBLIC_FEATURE_HEADER === '1';
const showAbout = process.env.NEXT_PUBLIC_FEATURE_ABOUT === '1';
const showProjects = process.env.NEXT_PUBLIC_FEATURE_PROJECTS === '1';
const showExperience = process.env.NEXT_PUBLIC_FEATURE_EXPERIENCE === '1';
const showSkills = process.env.NEXT_PUBLIC_FEATURE_SKILLS === '1';
const showContact = process.env.NEXT_PUBLIC_FEATURE_CONTACT === '1';
const showLanguage = process.env.NEXT_PUBLIC_FEATURE_LANGUAGE === '1';

export const featureFlags = {
  showHeader: showHeader,
  showAbout: showAbout,
  showProjects: showProjects,
  showExperience: showExperience,
  showSkills: showSkills,
  showContact: showContact,
  showLanguage: showLanguage,
};
export type FeatureFlags = typeof featureFlags;
