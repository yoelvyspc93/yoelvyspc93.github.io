const isEnabled = (value?: string) => value !== '0';

const showHeader = isEnabled(process.env.NEXT_PUBLIC_FEATURE_HEADER);
const showAbout = isEnabled(process.env.NEXT_PUBLIC_FEATURE_ABOUT);
const showProjects = isEnabled(process.env.NEXT_PUBLIC_FEATURE_PROJECTS);
const showExperience = isEnabled(process.env.NEXT_PUBLIC_FEATURE_EXPERIENCE);
const showSkills = isEnabled(process.env.NEXT_PUBLIC_FEATURE_SKILLS);
const showContact = isEnabled(process.env.NEXT_PUBLIC_FEATURE_CONTACT);
const showLanguage = isEnabled(process.env.NEXT_PUBLIC_FEATURE_LANGUAGE);

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
