export interface ProjectData {
  id: string;
  imageUrl: string;
  techStack: string[];
  isFavorite: boolean;
  websiteUrl?: string;
  effects: { start: string; end: string; opacity: number };
  title: string;
  shortDescription: string;
  detailedDescription: string[];
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
    title: 'Pioneerz',
    shortDescription:
      'Modern platform for selling NFTs with advanced animations and seamless experience.',
    detailedDescription: [
      'I developed a full-featured platform for NFT sales and management, built with Next.js and focused on user experience. The interface integrates GSAP, SwiperJS, and Lottie for dynamic animations, supporting both dark and light modes for accessibility. The entire system was thoroughly tested with Storybook, Chromatic, React Testing Library, and Cypress, ensuring consistency, performance, and visual stability across devices.',
    ],
  },
  {
    id: '02',
    techStack: ['Webflow'],
    imageUrl: '/images/projects/kubeshark.webp',
    isFavorite: true,
    //websiteUrl: 'https://kubeshark.co/',
    effects: {
      start: '#A0B5EE',
      end: '#A7BBEF',
      opacity: 0.13,
    },
    title: 'Kubeshark',
    shortDescription:
      "Landing page designed to highlight Kubeshark's main features with a clean and responsive design.",
    detailedDescription: [
      'I developed the official Kubeshark landing page using Webflow, crafting a structure optimized for SaaS presentation. The site focuses on clarity and technical storytelling, with smooth transitions and subtle animations to enhance the navigation experience. Built responsively, it adapts perfectly to all screen sizes while maintaining excellent performance.',
    ],
  },
  {
    id: '03',
    techStack: ['Webflow'],
    imageUrl: '/images/projects/flowsev.webp',
    isFavorite: true,
    //websiteUrl: 'https://flowsev.ai/',
    effects: {
      start: '#634DB5',
      end: '#544375',
      opacity: 0.3,
    },
    title: 'FlowSev',
    shortDescription:
      "Modern and responsive landing page created to showcase FlowSev.ai's features.",
    detailedDescription: [
      'I built the FlowSev.ai landing page with Webflow, focusing on a clean, modern aesthetic and smooth scrolling animations. The structure emphasizes clarity and performance, using motion subtly to guide user attention and highlight key product benefits. The design is fully responsive, ensuring consistency across all screen sizes.',
    ],
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
    title: 'Henig Diamond',
    shortDescription:
      'Informational landing page with 3D animations, an interactive map, and an intelligent chatbot.',
    detailedDescription: [
      'I designed and developed the Henig Diamond landing page using Webflow, integrating GSAP for smooth animations and Spline for 3D visual elements. The website includes an interactive office map and a custom AI chatbot that responds to questions about services and products. Every detail was crafted to reflect the elegance and exclusivity of the brand.',
    ],
  },
  {
    id: '05',
    techStack: [
      'Next.js',
      'GSAP',
      'Lottie',
      'Spline',
      'Storybook',
      'Chromatic',
      'React Testing Library',
      'Cypress',
    ],
    imageUrl: '/images/projects/dspot-website.webp',
    isFavorite: false,
    effects: {
      start: '#161A4D',
      end: '#1D2361',
      opacity: 0.4,
    },
    title: 'Dspot Website',
    shortDescription:
      'Corporate website for DSpot, a digital studio offering design and software solutions.',
    detailedDescription: [
      'Corporate website for DSpot, a digital studio offering design and software solutions. The site was built with Next.js and React, using TypeScript and GSAP animations to create a smooth, responsive experience. The content highlights the company’s principles—speed to build and one‑team mindset—alongside their blend of design, strategy and technology.',
    ],
  },
];
