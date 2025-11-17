export interface ProjectData {
  id: string;
  imageUrl: string;
  techStack: string[];
  isFavorite: boolean;
  websiteUrl?: string;
  effects: { start: string; end: string; opacity: number };
}

export const projectsData: ProjectData[] = [
  {
    id: '01',
    techStack: [
      'Next.js',
      'GSAP',
      'SwiperJS',
      'Lottie',
      'Storybook',
      'Chromatic',
      'React Testing Library',
      'Cypress',
    ],
    imageUrl: '/images/projects/pioneerz.webp',
    isFavorite: true,
    effects: {
      start: '#B0E3CD',
      end: '#D5D1EC',
      opacity: 0.2,
    },
  },
  {
    id: '02',
    techStack: ['Webflow'],
    imageUrl: '/images/projects/kubeshark.webp',
    isFavorite: true,
    websiteUrl: 'https://kubeshark.co/',
    effects: {
      start: '#A0B5EE',
      end: '#A7BBEF',
      opacity: 0.13,
    },
  },
  {
    id: '03',
    techStack: ['Webflow'],
    imageUrl: '/images/projects/flowsev.webp',
    isFavorite: true,
    websiteUrl: 'https://flowsev.ai/',
    effects: {
      start: '#634DB5',
      end: '#544375',
      opacity: 0.3,
    },
  },
  {
    id: '04',
    techStack: ['Webflow', 'GSAP', 'Spline'],
    imageUrl: '/images/projects/henig-diamond.webp',
    isFavorite: true,
    effects: {
      start: '#CCCAB2',
      end: '#82A29C',
      opacity: 0.1,
    },
  },
  {
    id: '05',
    techStack: ['React', 'Websockets'],
    imageUrl: '/images/projects/dspot-website.webp',
    isFavorite: false,
    effects: {
      start: '#161A4D',
      end: '#1D2361',
      opacity: 0.4,
    },
  },
];
